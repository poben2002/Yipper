# Yipper API Documentation
The Yipper API provides information about the yips posted on the yipper page and have users interact with yips and yipper users.

## Get All Yip Data or Yip Data Matching a Given Search Term
**Request Format:** /yipper/yips

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns the id, name, yip, hashtag, likes and date from the yips database in order of date posted

**Example Request:** /yipper/yips

**Example Response:**
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
  ]
}
...
```

**Error Handling:**
- N/A

## Get All Yip Data or Yip Data Matching a Given Search Term
**Request Format:** /yipper/yips?search=

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Given a valid search request, the service responds with all; ids of the yips that match the term
passed in the search query parameter. Match refers to if the yip includes the search term in any position of the yip.

**Example Request:** /yipper/yips?search=if

**Example Response:**
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

**Error Handling:**
- N/A

## Get Yip Data for a Designated User
**Request Format:** /yipper/user/:user

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Given a valid user request, the service responds with the name, yip, hashtag, and date for all the yips for
a designated user ordered by the date in descending order.

**Example Request:** /yipper/user/Chewbarka

**Example Response:**
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

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
  - If user is not an existing name of the Yipper site: `Yikes. User does not exist.`
- Possible 500 (internal server) errors (all plain text):
  - If any error occurs not due to an invalid user request: `An error occurred on the server. Try again later.`

## Update the Likes for a Designated Yip
**Request Format:** /yipper/likes endpoint with POST parameters of `id`

**Request Type**: POST

**Returned Data Format**: Plain Text

**Description:** Given a valid `id` the service updates the likes for a yip determined by the id passed through the
body, and increments the like count by one. Responds with the new value.

**Example Request:** /yipper/likes with POST parameters of `id=1`

**Example Response:**
```
3
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
  - If request is made with an invalid id: `Yikes. ID does not exist.`
- Possible 500 (internal server) errors (all plain text):
  - If any error occurs not due to an invalid user request: `An error occurred on the server. Try again later.`

## Add a New Yip
**Request Format:** /yipper/new endpoint with POST parameters of `name` and `full`

**Request Type**: POST

**Returned Data Format**: JSON

**Description:** Given valid parameters, service adds the new Yip information to the database and responds with the JSON with
the id, name, yip, hashtag, likes, and date of the new yip. The Id will be autoincremented based on its positon in the database
and the likes will be set to 0.

**Example Request:** /yipper/new with POST parameters of `name=Chewbarka` and `full= love to yip allllll day long #coolkids`

**Example Response:**
``` json
{
  "id": 528,
  "name": "Chewbarka",
  "yip": "love to yip allllll day long",
  "hashtag": "coolkids",
  "likes": 0,
  "date": "2020-09-09 18:16:18"
}

```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
  - If missing one or more of the required parameters: `Missing one or more of the required params.`
  - If a request is made and the name is not an existing name on the Yipper site: `Yikes. User does not exist.`
- Possible 500 (internal server) errors (all plain text):
  - If any error occurs not due to an invalid user request: `An error occurred on the server. Try again later.`

