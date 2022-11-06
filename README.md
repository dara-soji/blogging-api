# Pizza App
This is an api for a Blogging app. It is an exam given to us by AltSchool Africa.

---

## Requirements
1. Users should have a first_name, last_name, email, password, (you can add other attributes you want to store about the user)
2. A user should be able to sign up and sign in into the blog app
3. Use JWT as authentication strategy and expire the token after 1 hour
4. A blog can be in two states; draft and published
5. Logged in and not logged in users should be able to get a list of published blogs created
6. Logged in and not logged in users should be able to to get a published blog
7. Logged in users should be able to create a blog.
8. When a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published state
12. The owner of the blog should be able to get a list of their blogs. 
    a. The endpoint should be paginated
    b. It should be filterable by state
13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
14. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated, 
    a. default it to 20 blogs per page. 
    b. It should also be searchable by author, title and tags.
    c. It should also be orderable by read_count, reading_time and timestamp
15. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1
16. Come up with any algorithm for calculating the reading_time of the blog.
17. Write tests for all endpoints

---
## Setup
- Install NodeJS, mongodb, express, bcryptjs, jsonwebtoken
- pull this repo
- update env with example.env
- run `npm run start:dev`

---
## Base URL
- https://altschool-blogging-app.herokuapp.com/


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  username |  string |  optional |
|  first_name | string  |  required|
|  last_name  |  string |  required  |
|  email     | string  |  required |
|  password |   string |  required  |


### Blog
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  created_at |  date |  required |
|  state | number  |  required,default:'draft', enum: ['draft', 'published'|
|  title  |  string |  required, unique  |
|  user_id     | string  |  required |
|  auther|   string |    |
|  read_count |  number |  required |
|  reading_time |  number |  required |
|  tags |  array |   |
|  timestamp |  date | required  |
|  body |  string | required  |
|  description |  string | required  |



## APIs
---

### Signup User

- Route: /api/v1/auth/signup
- Method: POST
- Body: 
```
{
    "email": "dara@example.com",
    "password": "Passweeqd1",
    "first_name": "dara",
    "last_name": "xamp",
    "username": "dara_xamp"
}
```

- Responses

Success
```
{
  "status": "User successfully created",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjZmMjVlOWI0OTEwMmE4YTJmMGFlNCIsImlhdCI6MTY2NzY5MTEwMiwiZXhwIjoxNjY3Njk0NzAyfQ.aO_lNgtmXYbzOyo2AMEzehdcsHnqJKcF8wC-XcWbhFM",
    "data": {
      "created_at": "2022-11-05T23:15:25.650Z",
      "lastUpdateAt": "2022-11-05T23:15:25.650Z",
      "email": "daras@example.com",
      "first_name": "dara",
      "last_name": "xamp",
      "password": "$2a$10$BYzOFOomR9iufsxab4c9Je4AORXqhE/0hrntB8/RjD8s/Osu2lo4q",
      "username": "dara_xampler",
      "_id": "6366f25e9b49102a8a2f0ae4",
      "__v": 0
    }
  }
}
```
---
### Login User

- Route: /api/v1/auth/login
- Method: POST
- Body: 
```
{
    "email": "daras@example.com",
    "password": "Passweeqd1"
}
```

- Responses

Success
```
{
  "message": "successfully signed in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjZmMjVlOWI0OTEwMmE4YTJmMGFlNCIsImlhdCI6MTY2NzY5MTMwMSwiZXhwIjoxNjY3Njk0OTAxfQ.evJeHzvZjzMx_YRXyW80uFEWqh_H2A6OvSCTMkNqed0"
}
```

---
### Create Blog

- Route: /api/v1/blogs
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "title": "kevvin boy",
  "author": "ade",
  "tags": ["look", "God", "Dey"],
  "body": "Lociatis totam, id odit blaluptatem eos, perferendisluptatem eos, perferendisluptatem eos, perferendisluptatem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendisnditiis veritatis sunt tempore!",
  "description": "rem ipsum  sit amet consectetur adipisicing elit. Vpi"
  
}
```

- Responses

Success
```
{
  "message": "Blog successfully crested",
  "blog": {
    "created_at": "2022-11-05T23:34:51.760Z",
    "state": "draft",
    "title": "kevvffgxgin boy",
    "user_id": "6366f25e9b49102a8a2f0ae4",
    "author": "ade",
    "read_count": 0,
    "reading_time": "0 minute",
    "tags": [
      "look",
      "God",
      "Dey"
    ],
    "timestamp": "2022-11-05T23:34:51.761Z",
    "body": "Lociatis totam, id odit blaluptatem eos, perferendisluptatem eos, perferendisluptatem eos, perferendisluptatem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendisnditiis veritatis sunt tempore!",
    "description": "rem ipsum  sit amet consectetur adipisicing elit. Vpi",
    "_id": "6366f3e9faee143b9d0c3598",
    "__v": 0
  }
}
```
---
### Get Blog

- Route: /api/v1/blogs/blog/:id
- Method: GET
- Responses

Success
```
{
  "message": "Here is your blog",
  "data": {
    "_id": "6366f3e9faee143b9d0c3598",
    "created_at": "2022-11-05T23:34:51.760Z",
    "state": "draft",
    "title": "kevvffgxgin boy",
    "user_id": "6366f25e9b49102a8a2f0ae4",
    "author": "ade",
    "read_count": 1,
    "reading_time": "0 minute5 minutes",
    "tags": [
      "look",
      "God",
      "Dey"
    ],
    "timestamp": "2022-11-05T23:40:43.732Z",
    "body": "Lociatis totam, id odit blaluptatem eos, perferendisluptatem eos, perferendisluptatem eos, perferendisluptatem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendisnditiis veritatis sunt tempore!",
    "description": "rem ipsum  sit amet consectetur adipisicing elit. Vpi",
    "__v": 0
  },
  "authorInfo": {
    "email": "daras@example.com",
    "first_name": "dara",
    "last_name": "xamp",
    "username": "dara_xampler"
  }
}
```
---

### Get All Blogs

- Route: /api/v1/blogs
- Method: GET
- Query params: 
    - page (default: 1)
    - per_page (default: 20)
    - order_by (default: created_at)
    - order (options: asc | desc, default: desc)
    - state
    - created_at
- Responses

Success
```
[{
  "message": "Here is your blog",
  "data": {
    "_id": "6366f3e9faee143b9d0c3598",
    "created_at": "2022-11-05T23:34:51.760Z",
    "state": "draft",
    "title": "kevvffgxgin boy",
    "user_id": "6366f25e9b49102a8a2f0ae4",
    "author": "ade",
    "read_count": 1,
    "reading_time": "0 minute5 minutes",
    "tags": [
      "look",
      "God",
      "Dey"
    ],
    "timestamp": "2022-11-05T23:40:43.732Z",
    "body": "Lociatis totam, id odit blaluptatem eos, perferendisluptatem eos, perferendisluptatem eos, perferendisluptatem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendisnditiis veritatis sunt tempore!",
    "description": "rem ipsum  sit amet consectetur adipisicing elit. Vpi",
    "__v": 0
  },
  "authorInfo": {
    "email": "daras@example.com",
    "first_name": "dara",
    "last_name": "xamp",
    "username": "dara_xampler"
  }
}]
```
---
### Get Owner's Blogs

- Route: /api/v1/blogs/myblogs
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 20)
    - order_by (default: created_at)
    - order (options: asc | desc, default: desc)
    - state
    - created_at
- Responses

Success
```
[{
  "message": "Here is your blog",
  "data": {
    "_id": "6366f3e9faee143b9d0c3598",
    "created_at": "2022-11-05T23:34:51.760Z",
    "state": "draft",
    "title": "kevvffgxgin boy",
    "user_id": "6366f25e9b49102a8a2f0ae4",
    "author": "ade",
    "read_count": 1,
    "reading_time": "0 minute5 minutes",
    "tags": [
      "look",
      "God",
      "Dey"
    ],
    "timestamp": "2022-11-05T23:40:43.732Z",
    "body": "Lociatis totam, id odit blaluptatem eos, perferendisluptatem eos, perferendisluptatem eos, perferendisluptatem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendisnditiis veritatis sunt tempore!",
    "description": "rem ipsum  sit amet consectetur adipisicing elit. Vpi",
    "__v": 0
  },
  "authorInfo": {
    "email": "daras@example.com",
    "first_name": "dara",
    "last_name": "xamp",
    "username": "dara_xampler"
  }
}]
```
---
### Publish Blog

- Route: /api/v1/blogs/publish/:id
- Method: PATCH
- Header:
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "message": "Your Blog has been succesfully Published",
  "data": {
    "_id": "6366f3e9faee143b9d0c3598",
    "created_at": "2022-11-05T23:34:51.760Z",
    "state": "published",
    "title": "kevvffgxgin boy",
    "user_id": "6366f25e9b49102a8a2f0ae4",
    "author": "ade",
    "read_count": 1,
    "reading_time": "0 minute5 minutes",
    "tags": [
      "look",
      "God",
      "Dey"
    ],
    "timestamp": "2022-11-05T23:40:43.732Z",
    "body": "Lociatis totam, id odit blaluptatem eos, perferendisluptatem eos, perferendisluptatem eos, perferendisluptatem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendiem eos, perferendisnditiis veritatis sunt tempore!",
    "description": "rem ipsum  sit amet consectetur adipisicing elit. Vpi",
    "__v": 0
  }
}
```
---
### Update Blog

- Route: /api/v1/blogs/:id
- Method: PATCH
- Header:
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "_id": "6366f3e9faee143b9d0c3598",
  "created_at": "2022-11-05T23:34:51.760Z",
  "state": "published",
  "title": "atestjkbk for delet",
  "user_id": "6366f25e9b49102a8a2f0ae4",
  "author": "test",
  "read_count": 1,
  "tags": [
    "bus",
    "sand"
  ],
  "timestamp": "2022-11-05T23:55:51.919Z",
  "body": "Lociatis totam, id odit blaluptatem eos, perferen!",
  "description": "rem ipsum dolor sit amet consectetur adipisicing elit. Vpi",
  "__v": 0
}
```
---
### Delete Blog

- Route: /api/v1/blogs/:id
- Method: DELETE
- Header:
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "message": "Blog with id: 6366f3e9faee143b9d0c3598 has been deleted"
}
```
---

...

## Contributor
- Oluwadara Adesoji