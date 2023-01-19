# Homework 4 - Yipper - Assignment Specification
*Special thanks to Tal Wolman for the original version of this assignment and to Robert Thompson for the original concept behind this assignment.*

## Overview
In this assignment you will gain experience creating a both the client side JavaScript as well as the webservice used for website. 'Yipper' is inspired by the website 'Twitter' but this site is exclusively for dogs (the superior household pet and companion). You will not need an understanding of how Twitter works in order to successfully complete this assignment.

## Starter Files and Final Deliverables

In this Homework 4 repository you will find the following starter files and directories:

| File/folders | Repository files to stay unchanged |
|--------------------|------------------------------|
| `public/img/`| All images required for the webpage. |
| `public/yipper.html`| The HTML file representing the Yipper website. |
| `public/yipper.css`| The CSS that will style `yipper.html`. |
| `yipper.db`| The database file containing the yips table. |

You should not change the provided directory structure. Your repository should be submitted with these (**unchanged**) starter files as well as the following files you are responsible for creating:

| File          | Repository file you will implement and turn in |
|---------------|------------------------------|
| `package.json`| The JSON file with your project dependencies (e.g. `express`) which you initialize with `npm init` |
| `app.js`| The Node.js service that will supply the Yipper data. |
| `APIDOC.md`| The documentation for your webservice. |
| `public/yipper.js`| The JavaScript that will request the information from `app.js` and populate it into `yipper.html`. |

The `app.js` file  should be saved at the root of this directory (at the same level as `public`). The forward facing static files (HTML, CSS and client side JS) should be located in the `public` directory. Your solution will be graded on all the files you have been directed to add above. Any changes you make to any of the provided files will not be eligible for full credit. In order for your assignment to be graded, beyond submitting the required files, you must ensure that your `package.json` is updated and complete. An incomplete `package.json`, or missing any of the required files, may result in a 0 on this assignment. If we are unable to run our grading tests on your submission (a subset of which we have provided you with), you will receive a 0 on this assignment.

## External Requirements
This section will describe the external output of your webpage. For full credit, your solution should adhere to *both* the visual references (provided throughout spec) and text specifications.  We have provided [screenshots](https://courses.cs.washington.edu/courses/cse154/22su/homework/hw4/screenshots/) and a [video](https://courses.cs.washington.edu/courses/cse154/22su/homework/hw4/hw4.mp4) with example of the functionality of a fully implemented Yipper site. Note that, based on your OS and browser, the page may render slightly differently than the provided screenshots/video. If you think the specification is missing a requirement, make sure to review both text-based and visual guides and also confirm that the requirement isn't covered implicitly by another requirement. If you are unsure, post to Ed with clarifying questions.

### Yipper Context
In order to understand the specification below, we will describe the structure of a "yip" for the Yipper site. A "yip" is like a "tweet" (on Twitter). The Yipper site will have some defined requirements for what format a full "yip" can take. A yip is made up of some text/characters/spaces, a single space, a pound/hashtag (`#`) followed by a the hashtag text. Examples of valid yips are shown below (not exhaustive):
```
example of a Yip #first
```
```
this. is. great. #second
```
```
???!!!!!!!????? #third
```
```
wOw aLterNating CAPS #fouRTh
```
```
letters and numbers #5th
```
```
dkh?.!!! dhjaksf   hfjahjfiuyiore #66666666666666
```
A full and detailed explanation of the allowed characters and format for a Yip is described below:
  * The text of a Yip can be made up of any combination of any word character (letter, number, underscore), any whitespace character, a period (`.`), an exclamation point (`!`) and/or a question mark (`?`). At _minimum_ the Yip text should be a single one of the characters mentioned above but there is no restriction on how long the text of a Yip can be.
  * The text of a Yip should be separated by a single whitespace character and then a pound sign (`#`).
  * Following the pound sign (`#`) is the hashtag which is is any combination of one or more of lowercase letters, capital letters and/or numbers.
  * **For this assignment, you can assume that all yips made follow the expected format. Your web service does NOT need to handle the case of an incorrectly formatted yip**. In reality, this is not a good assumption to make and you _should_ set up your web service to handle invalid yips but that is beyond the scope of this assignment.

At various points of this specification, a Yip will be broken down into two parts: the text of a Yip and the hashtag. When the text of a Yip is referred to, it refers to the text (stripped of any trailing whitespace) up to, but excluding the pound sign character (`#`). When the hashtag of a Yip is referred to, it refers to the character(s) after the pound sign (`#`) but not including the `#` itself. For example, assuming the full Yip in question was `wOw aLterNating CAPS #fouRTh`, if the spec refers to the "text of the Yip" it means the text `wOw aLterNating CAPS` (stripped of any trailing whitespace) and if the spec refers to the "hashtag", it means the text `fouRTh`.

### Yipper Database Overview
You will be required to store all the data required for this site in the database. The file representing the database is provided to you and contains one table named `yips`. The table contains 6 columns, described below:
  * `id`: the primary key, auto-increments
  * `name`: represents the name of the user
  * `yip`: represents the text of the "yip" without the hashtag _and_ stripped of any extraneous whitespace.
  * `hashtag`: represents the text of the hashtag (omitting the `#` in the entry)
  * `likes`: represents the number of likes the yip has received
  * `date`: represents the day and time at which the yip was made. Will default to the current datetime.

You are free and encouraged to experiment with your site/add entries/like Yips as a means of testing out your Yipper website functionality. The `yipper.db` file _can_ be turned in with additional entries beyond what was provided to you.

### Yipper API Overview
The `yipper.db` file you created contains the `yips` table which will contain all pertinent information needed in order to fulfill these requests.

### Yipper API Request Details
Your `app.js` web service will provide different data based upon the route. The possible endpoints are described below:

#### Endpoint 1: Get all yip data or yip data matching a given search term
**Request Format:** `/yipper/yips`\
**Query Parameters:** `search` (optional)\
**Request Type (both requests):** `GET`\
**Returned Data Format:** JSON\
**Description 1:** If the `search` parameter is not included in the request, your service should get the `id`, `name`, `yip`, `hashtag`, `likes` and `date` from the `yips` table and outputs JSON containing the information in the order of `date`s in descending order (Pass the `date` into the `DATETIME()` function in your ordering statement).\
**Example Request 1:** `/yipper/yips`\
**Example Output 1:** (abbreviated)
```json
{
  "yips":[
    {
      "id": 25,
      "name": "Mister Fluffers",
      "yip": "It is sooooo fluffy I am gonna die",
      "hashtag": "fluff",
      "likes": 6,
      "date": "2020-07-07 03:48:28"
    },
    {
      "id": 24,
      "name": "Sir Barks a Lot",
      "yip": "Imagine if my name was sir barks a lot and I was meowing all day haha",
      "hashtag": "clown",
      "likes": 6,
      "date": "2020-07-06 00:55:08"
    },
    ...
  ]
}
```
**Description 2:** If the `search` parameter is included in the request, your service should respond with all the `id`s of the `yip`s matching the term passed in the `search` query parameter (ordered by the `id`s). A "match" would be any `yip` that has the `search` term in _any_ position meaning that the term "if" should match any  `yip` containing the words "if", "iframe" or "sniff" (as an example, not exhaustive, more matches are possible). Your search should _not_ look in `hashtag`s.\
**Example Request 2:** `/yipper/yips?search=if`\
**Example Output 2:**
```json
{
  "yips" : [
    {
      "id": 8
    },
    {
      "id": 24
    }
  ]
}
```

#### Endpoint 2: Get yip data for a designated user
**Request Format:** `/yipper/user/:user`\
**Query Parameters:** none.\
**Request Type:** `GET`\
**Returned Data Format:** JSON\
**Description:** Your service should get the `name`, `yip`, `hashtag` and `date` for all the yips for a designated `user` ordered by the `date` in descending order (Pass the `date` into the `DATETIME()` function in your ordering statement). The `user` should be taken exactly as passed in the request.\
**Example Request:** `/yipper/user/Chewbarka`\
**Example Output:**
```json
[
  {
    "name": "Chewbarka",
    "yip": "chewy or soft cookies. I chew them all",
    "hashtag": "largebrain",
    "date": "2020-07-09 22:26:38",
  },
  {
    "name": "Chewbarka",
    "yip": "Every snack you make every meal you bake every bite you take... I will be watching you.",
    "hashtag": "foodie",
    "date": "2019-06-28 23:22:21"
  }
]
```

#### Endpoint 3: Update the likes for a designated yip
**Request Format:** `/yipper/likes`\
**Body Parameters:** `id`\
**Request Type:** `POST`\
**Returned Data Format:** plain text\
**Description:** Your service should update the `likes` for a yip (the yip your service is updating is determined by the `id` passed through the body) by incrementing the current value by 1 and responding with the new value.\
**Example Request:** `/yipper/likes`\
**Example Output:**
```
8
```

#### Endpoint 4: Add a new yip
**Request Format:** `/yipper/new`\
**Body Parameters:** `name` and `full`\
**Request Type:** `POST`\
**Returned Data Format:** JSON\
**Description:** Your service should add the new Yip information to the database and send back and output the JSON with the `id`, `name`, `yip`, `hashtag`, `likes` and `date`. The `id` should correspond with the auto-incremented `id` generated from inserting into the database. In your Node app, the newly generated `id` can be retrieved by using the `lastID` property on the result of the query. The `name` of the user added to the database should be grabbed from the `name` body parameter. The `likes` should be set to 0, and the `yip` and `hashtag` information can be obtained from the `full` body parameter. The `date` should be the current date (the `yips` table schema will default to the current datetime upon a new inserted row).\
**Example Request:** `/yipper/new`\
**Example Output:**
```json
{
  "id": 528,
  "name": "Chewbarka",
  "yip": "love to yip allllll day long",
  "hashtag": "coolkids",
  "likes": 0,
  "date": "2020-09-09 18:16:18"
}
```
#### Handling Invalid Requests
Your web service should be set up to handle invalid requests. There are several types of invalid requests that can occur. They are described below:

Any `POST` request missing one (or more) of the required parameters, your service should respond in plain text with the message `Missing one or more of the required params.`.

If a request to `/yipper/user/:user` is made and `user` is not an existing name of the Yipper site, your service should respond in plain text with the message `Yikes. User does not exist.`.
  * *Note*: the only valid users for the Yipper site are ones that already exist in the database. If the name (taken as is from the request) does not exist, the user is not a valid one and the appropriate error handling should follow.

If a request to `/yipper/new` is made and the `name` is not an existing name of the Yipper site your service should respond in plain text with the message `Yikes. User does not exist.`

If a request to `yipper/likes` is made with an invalid id, your service should respond in plain text with the message `Yikes. ID does not exist.`

#### Handling Server-side Errors
If any error occurs _not_ due to an invalid user request (error handling for which is described above), it must be handled appropriately with the plain text message:

  `An error occurred on the server. Try again later.`

### Yipper Client Side JavaScript Behavioral Requirements
Your `yipper.js` will use AJAX `fetch` to request data from your Node.js Yipper API and insert it into `yipper.html`. Your page should have the following functionality:

#### Page Load Behavior
When the page loads it should request all the yips (`/yipper/yips`) from the Yipper API. It should display each of these yips by constructing the container for the yip and appending it directly to the `#home` container. The yips should be displayed in the order in which they are returned from the API. The structure of a yip card is rather complex so take careful note of the example structure and description of the container.
  * Each Yip card is an `article` which should have the class `.card` added to it as well as an `id` corresponding to the `id` from the response of the request.
  * Directly within the `article.card` are three elements in the following order: an `img`, `div` and another `div` with the class `meta`.
  * The `src` of the `img` directly within the `article.card` should be the `name` (from the response) which you should modify to be a lowercase and dash separated png image. For example, if the `name` from the response was `Mister Fluffers` the image path should be `mister-fluffers.png` and if the `name` from the response was `Chewbarka`, the path would be `chewbarka.png`.
  * The _first_ `div` directly within the `article.card` should have two `p` tags nested inside of it. The first `p` tag should have the class `.individual` added to it and the text within the tags should be the `name` of the user, taken from the response of the request. This name should be added _exactly_ as returned by the request to the `/yipper/yips` endpoint. The second `p` tag should contain the `yip` from the request, followed by a single space, the `#` character and the `hashtag` from the response.
  * The second `div` inside of `article.card` (the one with class `.meta`) has a `p` tag as the first child and a `div` as the second.
    * The `p` tag should contain the `date` from the response. To achieve the expected appearance, you will need to pass in the `date` (as is) from the response into a new `Date` object and format it using the `toLocaleString()` function. (`(new Date(<date as is from response>)).toLocaleString()`).
    * The `div` also has two children, an `img` and a `p`. The `img` should always be the heart icon (`heart.png`). The `p` tag should be the `likes` from the response of the request.

The example structure (omitting the text within the tags) is shown below:
```html
<!-- <article> container with class '.card' and id (from response of request) representing a Yip card -->
<article class='card' id='528'>
  <!-- <img> for user icon -->
  <img>
  <div>
    <!-- .individual <p> for user name -->
    <p class='individual'></p>
    <!-- <p> for user yip -->
    <p></p>
  </div>
  <!-- .meta <div> for likes and date -->
  <div class='meta'>
    <!-- <p> for formatted date -->
    <p></p>
    <div>
      <!-- <img> for like icon -->
      <img>
      <!-- <p> for number of likes -->
      <p></p>
    </div>
  </div>
</article>
```

#### Search Bar Behavior
When typing into the `#search-term` bar, the `#search-btn` should only be enabled when the trimmed (of whitespace on **both** sides) value in the search bar is not empty. If it is empty, the `#search-btn` should be disabled. For example, if the characters typed into the `#search-term` were `         ` (a bunch of whitespace, which, when trimmed down is an empty string), the `#search-btn` should remain disabled. Otherwise, it should be enabled.
  * *Hint*: the `input` event will be helpful in accomplishing this behavior. [Here is the link to the MDN article](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event) for this event.

When the `#search-btn` is clicked, the `#home` view should be shown (the current view, if not `#home` should be hidden) and a request to the user endpoint (`/yipper/yips?search=<searchterm>`) from the Yipper API should be made replacing `<searchterm>` with the trimmed (on both sides) term that was typed into the `#search-term` element. Upon a successful request to the endpoint, the `#search-btn` should be `disabled`. Additionally, the `id`s from the response (you should not make any assumptions about the order of the `id`s returned in the response) will correspond to `id`s of the relevant Yip containers matching the search term. If a container (`article.card`) has an `id` contained in the response, it should remain visible (indicating it matched the `<searchterm>`). Otherwise, it should be hidden.

As soon as a user navigates away from the search results in any capacity (such as clicking the home button, new Yip button, or the user's name to see the user specific Yips), the contents of the `#search-term` should be cleared.

#### Home Button Behavior
When the `#home-btn` is clicked, the `#user` and `#new` view should be hidden and the `#home` view displayed. Additionally, any text in the `#search-term` bar should be cleared. All of the individual Yip cards (`article.card`) should be made visible.

#### Individual User Yip Behavior
When a user's name is clicked (the `p.individual` tag containing the user's name), the `#home` and `#new` view should be hidden while the `#user` view should be displayed cleared of any previous content (Do not make any assumptions about what elements exist/existed within `#user` previously). Following the view switch, a request to the user endpoint (`/yipper/user/:user`) from the Yipper API should be made. All the yips for that user should then be displayed. The container displaying the yips should be an `article` with the `.single` class added to it. Within the `article` you should append a `h2` with the words `Yips shared by <name>:` replacing `<name>` with the `name` returned by the request to the user endpoint. Then, for each yip entry returned by the request to the user endpoint, create a `p` which should contain the text `Yip <num>: <yip text> #<yip hashtag>` replacing `<num>` with the number of the yip (starting at 1), `<yip text>` with the `yip` from the response and `<yip hashtag>` with the `hashtag` from the response. The contents of the `p`s should be accessed and appended in the order returned by the request to the `/yipper/user/:user` endpoint. Finally, the `article` with class `.single` should be _directly_ appended into the `#user` container.

#### Liking a Yip Behavior
When the heart image of a yip is clicked (the `img` with `src` set to `heart.png` inside of each Yip card), a request to the likes endpoint (`/yipper/likes`) from the Yipper API should be made. The `id` body parameter for the request should be grabbed from the id of the overall Yip container for the Yip that had just been liked (Hint: you may need to travel several levels up the DOM from the event's starting point, this is expected and ok to do). Upon a successful request to the endpoint, the `textContent` of the neighboring paragraph (representing the number of likes) should updated to reflect the number of likes returned by the endpoint.

#### Add a New Yip Behavior
When the `#yip-btn` is clicked, the `#user` and `#home` views should be hidden and the `#new` view should be revealed. Upon the switch of views, a new yip can be added by filling out the form and clicking the `Submit!` button. Once the submit button is clicked the contents of `#name` and `#yip` should be cleared and a request to the "new yip" endpoint (`/yipper/new`) from the Yipper API should be made. The `name` body parameter value for the request should be grabbed from the `#name` input value and the `full` body parameter for the request should be grabbed from the `#yip` input value. Upon a successful request to the endpoint a new Yip card should be added to the **top** of the `#home` container (Hint: use the [`prepend`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend) function to achieve this). Additionally (also only upon a successful request), after a 2 second delay, the `#home` view should be shown and the `#new` view should be hidden.

#### Error Handling Behavior
All fetch calls in `yipper.js` should be set up to handle possible errors returned by the Yipper API. In the event that an error does occur as the result of a `fetch` call, `#yipper-data` should be hidden and the `#error` text should be made visible. Additionally, all buttons in the `nav` (`#search-btn`, `#home-btn` and `#yip-btn`) should be disabled. This is the only time the `#error` text should be shown. In all other cases, it should remain hidden.

## Internal Requirements
For full credit, your page must not only match the external requirements listed above, but must also demonstrate good use of client-side JS, server-side JS and overall code quality as demonstrated in class and detailed in the [CSE 154 Code Quality Guidelines](https://courses.cs.washington.edu/courses/cse154/codequalityguide). We also expect you to implement relevant feedback from previous assignments. As usual, we have included some common things relevant to this assignment below.

### Server-side JS
* Your Node.js web service must follow the guidelines and conventions demonstrated in class as well as the [Node/Express](https://courses.cs.washington.edu/courses/cse154/codequalityguide/node/#table-of-contents) section of the Code Quality Guide.
* Each response should specify the correct content type before sending a response. This should be set when necessary and should never be overridden.
* Similar to your client-side JS, decompose your Node.js/Express API by writing smaller, more generic functions that complete one task rather than a few larger "do-everything" functions. You are expected to define at least *two* original helper functions for your web service (provided function(s) are not considered original).
* Declare modules at the top of your file, using `const` and camelCasing conventions to represent values that should never change (recall this is different than a program constant such as `PORT` which should still follow `UPPER_CASE` naming conventions). Only declare modules that you use.
* Handle all db errors with a `try`/`catch` block.
* Prefer `async`/`await` to simplify your asynchronous code.
* Do not pass the `req` and/or `res` as arguments to helper functions. Prefer pulling out other functionality into helper functions as demonstrated in section and lecture. other functionality into helper functions as demonstrated in section and lecture.

### Tests
You have been provided a subset of the tests we will use for grading on this assignment. These are not exhaustive and you are expected to further test your work to ensure you've met the requirements in the spec. If we are unable to run the tests on your assignment due to (but not limited to) a syntax error, incorrect directory structure, missing/misnamed files or an incorrect `package.json`, you will receive a 0 on this assignment. Additionally, when submitting to Gradescope, you are expected to wait for the tests to finish running to ensure everything looks correct. We anticipate the results on Gitlab and Gradescope to be identical but you are ultimately responsible for waiting and ensuring the output is what you expect. Waiting for the linters, validators and/or tests to finish running is not a valid excuse for submitting this assignment late.

### Documentation
* For all files, place a comment header in both `.js` files with your name, section, a 2-3 sentence description of the file. Please do not modify the provided files _including_ not adding a header comment to the HTML and/or CSS files.
* Use JSDoc to properly document all of your JS functions with a description of the function as well as `@param` and `@return` where necessary.
* Above each endpoint should also be brief comment made up of 1-2 sentences describing it's purpose (having similar expectations of a function comment, but without `@param` or `@return`).
* Complete a thorough API documentation for all endpoints
  * Document your API in [`APIDOC.md`](APIDOC.md). A `.md` file is written in Markdown, documentation on which is [here](https://docs.gitlab.com/ce/user/markdown.html).
    * Each endpoint should be well documented and include:
      * the request format, including any parameters
      * the request type (`GET` or `POST`)
      * the format of the returned data (`Plain Text` or `JSON`)
      * a description of the endpoint
      * an example request and response
      * error handling: you should document **any and all** errors that your endpoint might respond with (**this includes both 400 and 500 errors**)

## Grading
This assignment will roughly (subject to adjustments) be distributed as:
* External Correctness (45-55%) - The external requirements listed in this specification are met.
* Internal Correctness (35-45%) - The internal requirements listed in this specification are met.
* Documentation (5-10%) - The documentation requirements in this specification are met.

## Academic Integrity
All work submitted for your CSE 154 homework assignments must be your own and should not be shared with other students. This includes but is not limited to:
  * You may not use code directly from any external sources (no copying and pasting from external sites), other than templates that are explicitly given to students for use in class.
  * We expect that the homework you submit is your own work and that you do not receive any inappropriate help from other people or provide inappropriate help to others.
  * You must not place your solution to a publicly-accessible web site, neither during nor after the school quarter is over.

Doing any of the above is considered a violation of our course academic integrity policy. As a reminder this page states:

  * The Paul G Allen School has an entire page on [Academic Misconduct](https://www.cs.washington.edu/academics/misconduct) within the context of Computer Science
  * The University of Washington has an entire page on how [Academic Misconduct](https://www.washington.edu/cssc/for-students/academic-misconduct/) is handled on their [Community Standards and Student Conduct](https://www.washington.edu/cssc/) Page

Please acquaint yourself with both of those pages, and in particular how academic misconduct will be reported to the University.
