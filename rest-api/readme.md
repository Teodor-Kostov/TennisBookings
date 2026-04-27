# REST-api for Angular course in SoftUni refactored by Teodor Kostov for Angular Course

## Prerequisites

Before running this server, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Docker Desktop/ Rancher or simmilar Desctop Containerisation tool** - [Download](https://www.docker.com/products/docker-desktop/)
- **Git** (optional) - [Download](https://git-scm.com/)

## Installation & Setup

### Step 1: Clone the repository (or download the project)

```bash
git clone https://github.com/Teodor-Kostov/angular-workshop
cd REST-api
```

### Step 2: Install Node.js dependencies

```bash
npm install
```

### Step 3: Start the MongoDB database with Docker

The project uses Docker Compose to run MongoDB and Mongo Express (a web-based MongoDB admin interface).

```bash
docker-compose up -d
```

This command starts:
- **MongoDB** on port `27017` - The database server
- **Mongo Express** on port `8081` - Web UI to view/manage database

To check if containers are running:
```bash
docker ps
```

You should see two containers: `rest-api-mongodb` and `rest-api-mongo-express`

### Step 4: Start the Node.js server

```bash
npm start
```

The server will start on `http://localhost:3000`

## Available URLs

| Service | URL | Description |
|---------|-----|-------------|
| REST API | http://localhost:3000/api | Main API endpoint |
| Swagger Docs | http://localhost:3000/api-docs | Interactive API documentation |
| Mongo Express | http://localhost:8081 | Database admin UI |

## Docker Commands Reference

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start MongoDB & Mongo Express in background |
| `docker-compose down` | Stop and remove containers |
| `docker-compose down -v` | Stop containers and delete database data |
| `docker-compose logs -f` | View container logs |
| `docker ps` | List running containers |

## Environment Variables

The `.env` file contains the following configuration:

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | Environment mode |
| `PORT` | 3000 | Server port |
| `SECRET` | (configured) | JWT token secret |
| `COOKIESECRET` | (configured) | Cookie signing secret |
| `SALTROUNDS` | 10 | Bcrypt salt rounds for password hashing |

## Quick Start Summary

```bash
# 1. Install dependencies
npm install

# 2. Start database (Docker must be running)
docker-compose up -d

# 3. Start server
npm start

# 4. Open in browser
# API: http://localhost:3000/api
# Docs: http://localhost:3000/api-docs
```

## Troubleshooting

### Docker containers not starting
- Make sure Docker Desktop is running
- Check if ports 27017 and 8081 are not in use by other applications

### Cannot connect to MongoDB
- Verify MongoDB container is running: `docker ps`
- Check container logs: `docker-compose logs mongodb`

### Server won't start
- Make sure you ran `npm install` first
- Verify MongoDB is running before starting the server

---

## Getting started
Let's make our first API request to the REST-api!

In the example below, we're trying to get information about the REST-api:

```https://localhost:3000/api/test```

Here is the response we get:

```
{
    "name": "rest-api",
    "version": "1.0.0",
    "description": "REST-api for back-end of Angular course workshop in SoftUni",
    "main": "index.js",
}
```

If your response looks slightly different don't panic. This is probably because more data has been added to the API since I made this documentation.

## Base URL
The Base URL is the root URL for all of the API, if you ever make a request to the API and you get back a 404 NOT FOUND response then check the Base URL first.

The Base URL for the API is:

```https://localhost:3000/api```

The documentation below assumes you are prepending the Base URL to the endpoints in order to make requests.

## Authentication
This API isn't open API. Authentication is required to store and get data. You can use the connected REACT-app to make registration and sign in. This also means that I've limited what you can do. If you find a mistake, then just write an issue.

# Endpoints: Users

* ```/users/register``` -- signing up;
* ```/users/login``` -- signing in;
* ```/users/logout``` -- logging out;
* ```/users/profile``` -- get current user info (includes role);

## Check if User is Admin

To check if the current logged-in user is an admin, call `GET /users/profile` and check the `role` field in the response:

```javascript
// Example: Check admin status in your frontend
const response = await fetch('http://localhost:3000/api/users/profile', {
  credentials: 'include' // Important: include cookies for auth
});
const user = await response.json();

if (user.role === 'admin') {
  // User is admin - show admin features
} else {
  // User is regular user
}
```

The `role` field can be:
- `"admin"` - Administrator with full access
- `"user"` - Regular user (default)

## Register User
Signs up user and returns the registered data as json.

### URL --> ```/users/register```

### Method --> ```POST```

### Body -->

```
{
    "name":"John Doe",
    "email":"john@email.com",
    "username":"Johny",
    "password":"12345",
    "rePassword":"12345"
}
```

Required:

```email``` : [string] -- The email of the person is required and must be unique;

```username``` : [string] -- The username of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

```password``` : [string] -- The password of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

Not Required

```tel``` : [string] -- Optional;

### Success Response:

Code: 200

Content: 
``` 
{
    "themes": [],
    "posts": [],
    "_id": "5f1875690916010017964978",
    "name": "John Doe",
    "email": "john@email.com",
    "username": "Johny",
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

### Error Response:

Code: 409 CONFLICT

Content: 
```
{
    "message": "This email/username is already registered!"
}
```

## Login User
Signs in user and returns the registered data as json.

### URL --> ```/users/login```

### Method --> ```POST```

### Body -->

```
{
    "username":"Johny",
    "password":"12345"
}
```

Required:

```username``` : [string] -- The username of the person 

```password``` : [string] -- The password of the person 

### Success Response:

Code: 200

Content: 
``` 
{
    "themes": ["5f85c51996b5601b2406e5b7"],
    "posts": ["5f86bdcde012743fe4f5b324"],
    "_id": "5f1875690916010017964978",
    "name": "John Doe",
    "email": "john@email.com",
    "username": "Johny",
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{ 
    "message": "Wrong username or password"
}
```

## Logout User
Logout user.

### URL --> ```/users/logout```

### Method --> ```POST```

### Success Response:

Code: 401 Unauthorized

Content: 
``` 
{ 
    "message": "Logged out!"
}
```

# Endpoints: Themes

* ```/themes```
* ```/themes/:themeId```

## Get Themes
Returns all themes as json.

### URL --> ```/themes```

### Method --> ```GET```

### Success Response:

Code: 200

Content: 
``` 
[
    {
        "subscribers": ["5f8580d25d1da62568dd38fd"],
        "posts": ["5f858dd2d895ad23602db9d5"],
        "_id": "5f858dd2d895ad23602db9d4",
        "themeName": "Some Theme",
        "userId": "5f8580d25d1da62568dd38fd",
        "created_at": "2020-10-13T11:21:54.863Z",
        "updatedAt": "2020-10-13T11:21:54.898Z",
        "__v": 0
    }
]
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Post Theme
Creates new Theme with the first post of the author and returns the theme as json.

### URL --> ```/themes```

### Method --> ```POST```

### Body -->

```
{
    "themeName": "Some Theme Title",
    "postText": "Some Post text"
}
```

Required:

```themeName``` : [string] -- The Title of your new Theme, which you want to create
```postText``` : [string] -- The text of your post. This post will be append as first comment on your Theme.

### Success Response:

Code: 200

Content: 
``` 
{
    "subscribers": ["5f86c1f0a112c130e89964af"],
    "posts": ["5f86c38abfa44331a0ff0094"],
    "_id": "5f86c38abfa44331a0ff0093",
    "themeName": "Some Theme Title",
    "userId": "5f86c1f0a112c130e89964af",
    "created_at": "2020-10-14T09:23:22.102Z",
    "updatedAt": "2020-10-14T09:23:22.114Z",
    "__v": 0
}
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Create Post
Creates new Post of the author and returns the theme as json.

### URL --> ```/themes/:themeId```

### Method --> ```POST```

### Body -->

```
{
    "postText": "Some Post text"
}
```

### Success Response:

Code: 200

Content: 
``` 
{
"subscribers": ["5f8580d25d1da62568dd38fd"],
"posts": [
    "5f85ad8f1141b13a04a9139c",
    "5f85b2501141b13a04a9139d"
],
"_id": "5f858dd2d895ad23602db9d4",
"themeName": "Some Theme",
"userId": "5f8580d25d1da62568dd38fd",
"created_at": "2020-10-13T11:21:54.863Z",
"updatedAt": "2020-10-13T13:57:36.466Z",
"__v": 0
}
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

# Endpoints: Posts

* ```/themes/:themeId/posts/:postId```

## Edit Post
Edit Post if the user is the author of the post and returns the changed post.

### URL --> ```/themes/:themeId/posts/:postId```

### Method --> ```PUT```

### Body -->

```
{
    "postText": "Changed text"
}
```

### Success Response:

Code: 200

Content: 
``` 
{
    "likes": [],
    "_id": "5f86c3fcbfa44331a0ff0095",
    "text": "Changed text",
    "userId": "5f86c1f0a112c130e89964af",
    "themeId": "5f85c51996b5601b2406e5b7",
    "created_at": "2020-10-14T09:25:16.203Z",
    "updatedAt": "2020-10-14T09:31:45.021Z",
    "__v": 0
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{
    message: "Not allowed!"
}
```

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Delete Post
Deletes Post if the user is the author of the post and returns the deleted post.

### URL --> ```/themes/:themeId/posts/:postId```

### Method --> ```DELETE```

### Success Response:

Code: 200

Content: 
``` 
{
    "likes": [],
    "_id": "5f86c3fcbfa44331a0ff0095",
    "text": "Changed text",
    "userId": "5f86c1f0a112c130e89964af",
    "themeId": "5f85c51996b5601b2406e5b7",
    "created_at": "2020-10-14T09:25:16.203Z",
    "updatedAt": "2020-10-14T09:33:56.595Z",
    "__v": 0
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{
    message: "Not allowed!"
}
```

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```
## Like Post
Adds like to the post.

### URL --> ```/likes/:postId```

### Method --> ```PUT```

### Success Response:

Code: 200

Content:
```
{
    message: "Liked successful!"
}
```

### Error Response:

Code: 500 Internal Server Error

Content:
```
{
    message: "Something went wrong!"
}
```

# Swagger API Documentation

Swagger UI is available at: ```http://localhost:3000/api-docs```

## Auto-generated Schemas

Swagger schemas are auto-generated from Mongoose models using `mongoose-to-swagger`.

### Adding a new model to Swagger:

1. **Create the Mongoose model** in `models/` folder:

```javascript
// models/example.js
const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Example', exampleSchema);
```

2. **Export the model** in `models/index.js`:

```javascript
const exampleModel = require('./example');

module.exports = {
    // ... existing models
    exampleModel,
}
```

3. **Add to Swagger config** in `config/swagger.js`:

```javascript
const { ..., exampleModel } = require('../models');

const generatedSchemas = {
    // ... existing schemas
    Example: m2s(exampleModel),
};
```

4. **Add API paths** in `config/swagger.js` under the `paths` section.

# Endpoints: Courts

* ```/courts``` -- get all courts, create court
* ```/courts/:courtId``` -- get, update, delete court

## Get Courts
Returns all courts as json.

### URL --> ```/courts```

### Method --> ```GET```

### Success Response:

Code: 200

Content:
```
[
    {
        "_id": "5f858dd2d895ad23602db9d4",
        "number": 1,
        "type": "Clay",
        "isActive": true,
        "created_at": "2020-10-13T11:21:54.863Z"
    }
]
```

## Create Court
Creates new court (auth required).

### URL --> ```/courts```

### Method --> ```POST```

### Body -->

```
{
    "number": 1,
    "type": "Clay",
    "isActive": true
}
```

Required:

```number``` : [number] -- The court number

```type``` : [string] -- Court surface type: "Clay", "Hard", or "Grass"

```isActive``` : [boolean] -- Whether the court is active

### Success Response:

Code: 201

### Error Response:

Code: 401 Unauthorized

# Endpoints: Bookings

* ```/bookings``` -- get all bookings, create booking
* ```/bookings/busy``` -- get busy slots (public, no personal data)
* ```/bookings/my``` -- get current user's bookings
* ```/bookings/:bookingId``` -- get, update, soft delete booking

## Get Busy Slots
Returns busy time slots for a specific date without personal data. This endpoint is public and can be used to display court availability.

### URL --> ```/bookings/busy?date=2024-03-15```

### Method --> ```GET```

### Query Parameters:

```date``` : [string] -- Required. Date in YYYY-MM-DD format

### Success Response:

Code: 200

Content:
```
[
    {
        "court": {
            "number": 1,
            "type": "Clay"
        },
        "date": "2024-03-15",
        "startTime": "09:00",
        "endTime": "10:00"
    }
]
```

### Error Response:

Code: 400 Bad Request

Content:
```
{
    "message": "Date query parameter is required"
}
```

## Get User Bookings
Returns all bookings for the authenticated user.

### URL --> ```/bookings/my```

### Method --> ```GET```

### Success Response:

Code: 200

### Error Response:

Code: 401 Unauthorized

## Create Booking
Creates new booking (auth required). Validates that the time slot is not already booked.

### URL --> ```/bookings```

### Method --> ```POST```

### Body -->

```
{
    "court": "5f858dd2d895ad23602db9d4",
    "date": "2024-03-15",
    "startTime": "09:00",
    "endTime": "10:00"
}
```

Required:

```court``` : [string] -- The court ID

```date``` : [string] -- Booking date (YYYY-MM-DD)

```startTime``` : [string] -- Start time (HH:MM)

```endTime``` : [string] -- End time (HH:MM)

### Success Response:

Code: 201

### Error Response:

Code: 401 Unauthorized

Code: 409 Conflict

Content:
```
{
    "message": "This court is already booked for the selected time slot"
}
```

## Delete Booking (Soft Delete)
Soft deletes a booking by setting `deleted: true`.

### URL --> ```/bookings/:bookingId```

### Method --> ```DELETE```

### Success Response:

Code: 200

### Error Response:

Code: 401 Unauthorized




<!-- users
.post /register - register new user
.post /login - login user
.post /logout - logout user

.get /profile - get user info
.post /profile - post user info
.put /profile - edit user info

themes
.get /themes - lists all themes
.post /themes - create new theme only for registered users

posts:
.get themes/id - get all posts for theme
.post themes/id - create post in theme by id only for registered users
.put themes/id/posts/id - edit post only possible for author
.delete themes/id/posts/id - delete post only possible for author -->


<!-- http://localhost:3000/api/users/register --  {"name":"SomeName","email":"some@email.com","username":"someUsername","password":"12345","rePassword":"12345"} -->
<!--http://localhost:3000/api/themes -- {"themeName":"Some Theme", "userId":"5f85bf709a517d36f4abe656", "post": "Some Post" } -->
<!-- http://localhost:3000/api/themes/5f858dd2d895ad23602db9d4  -- {"userId":"5f8580d25d1da62568dd38fd", "postText": "Some Post textsdfasdf" } -->
