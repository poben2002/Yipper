/**
 * Name: Benjamin Po
 * Date: August 10, 2022
 * Section: CSE 154 AB
 *
 * This is the app.js file that is used by all pages in the yipper project.
 * It provides the Node.js service that will supply all the Yipper data.
 */

'use strict';

const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const multer = require('multer');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

/**
 * Establishes a database connection to the database and returns the database object.
 * Any errors that occur should be caught in the function that calls this one.
 * @returns {sqlite3.Database} - The database object for the connection.
 */
async function getDBConnection() {
  const db = await sqlite.open({
    filename: 'yipper.db',
    driver: sqlite3.Database
  });
  return db;
}

app.get('/yipper/yips', async function(req, res) {
  let search = req.query.search;
  if (search) {
    let db = await getDBConnection();
    let yipInfo = await db.all("SELECT id FROM yips WHERE yip LIKE '%" + search +
    "%' ORDER BY id;");
    let listObj = {yips: yipInfo};
    res.json(listObj);
  } else {
    let db = await getDBConnection();
    let yipInfo = await
    db.all('SELECT * FROM yips ORDER BY datetime(date) DESC;');
    let listObj = {yips: yipInfo};
    res.json(listObj);
  }
});

app.get('/yipper/user/:user', async function(req, res) {
  try {
    let userName = req.params.user;
    if (userName) {
      let db = await getDBConnection();
      let allUsers = await db.all("SELECT name FROM YIPS");
      let userTrue = false;
      for (let num = 0; num < allUsers.length; num++) {
        let userArray = allUsers[num];
        let currentUser = userArray['name'];
        if (userName === currentUser) {
          userTrue = true;
        }
      }
      let userInfo = await db.all("SELECT name, yip, hashtag, date FROM yips WHERE name = '" +
      userName + "' ORDER BY datetime(date) DESC;");
      if (userTrue === true) {
        res.json(userInfo);
      }
    }
  } catch (err) {
    res.sendStatus(400).type('text')
      .send('Yikes. User does not exist.');
  }
});

app.post('/yipper/likes', async function(req, res) {
  try {
    let id = req.body.id;
    if (id) {
      let db = await getDBConnection();
      let query = "UPDATE yips SET likes = likes + 1 WHERE id = '" + id + "';";
      await db.exec(query);
      let queryNext = 'SELECT likes FROM yips WHERE id = ' + id + ';';
      let rows = await db.all(queryNext);
      let likeCount = rows[0];
      res.type('text');
      res.send((likeCount.likes).toString());
    } else {
      res.status(400).type('text')
        .sendStatus('Yikes. ID does not exist.');
    }
  } catch (err) {
    res.status(500).type('text')
      .send('An error occurred on the server. Try again later.');
  }
});

app.post('/yipper/new', async function(req, res) {
  try {
    let name = req.body.name;
    let full = req.body.full;
    if (name && full) {
      let db = await getDBConnection();
      let yipArray = full.split(" #");
      let yipContent = yipArray[0];
      let hashtagText = yipArray[1];
      let initialLikes = 0;
      let query = "INSERT INTO yips (name, yip, hashtag, likes) VALUES ('" + name +
       "', '" + yipContent + "', '" + hashtagText + "', " + initialLikes + ");";
      let result = await db.run(query);
      let newestYip = await db.all("SELECT * FROM yips WHERE id = " + result.lastID);
      let finalYip = newestYip[0];
      res.json(finalYip);
    } else {
      res.status(400).type('text')
        .send('Yikes. User does not exist.');
    }
  } catch (err) {
    res.status(500).type('text')
      .send('An error occurred on the server. Try again later.');
  }
});

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);