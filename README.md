# course-recommendation-backend API

This API documentation contains every endpoint the frontend will need to access the appropriate backend/db processes/data. Some parts of the documentation are less detailed than others. Looking at the ERD and other documentation can help fill gaps in your knowledge of the API.

This API is built strictly using the REST (Representational state transfer) architectural style, which uses a subset of HTTP.

<hr />

**`Note:`** all requests made to any endpoint (except session and post student) must have the session id stored in the header in the authorization attribute. For example, **headers: { authorization: "Basic {session_id of user}" }**.

## /student (done)

### `get`

**Path parameters:**

1. student_id

**Response to successful request**

- Status code: `200`
- Body: all the student's details with the student id given (excluding their password) in JSON form.

**Response to unsuccessful request**

- Status code: `400`

**Sample request**

### `post`

**Request body:**
- student_id (string)
- password
- fName
- sName
- age
- completedSubjects (JSON) (can be empty if the student hasn't started university yet)
- degree_id (can be null if the student hasn't started university yet)

**Response to successful request**
- Status code: `200`

**Response to successful request**
- Status code: `400`

<hr />

## /staff

### `get`

**Path parameters:**

1. staff_id

**Response to successful request**

- Status code: `200`
- Body: all the staff's details with the staff id given (excluding their password) in JSON form.

**Response to unsuccessful request**

- Status code: `400`

### `post`

**Request body:**
- staff_id
- password
- fName
- sName
- role (string, just a description)

**Response to successful request**
- Status code: `200`

**Response to successful request**
- Status code: `400`

<hr />

## /session (done)

The purpose of sessions of a particular user, is to check that they have logged in. You will have to store their session id in local storage or memory. A user session will last 60 minutes. After that it will be removed from the database and the user will have to login again.

### `post`

This will be the request made to login a user.

**Request body:**
- student_id or staff_id
- password

**Response to successful request**
- Status code: `200`
  - User has a valid session and hence they can precede to use the system.
- Body: Will contain an attribute called session_id. 

**Response to unsuccessful request**
- Status code: `401`
  - 401 means that the entity/person trying to gain access to the system is not authorised.

### `delete`

This will be the request made to log out a user.

**Response to successful request**
- Status code: `200`
  - User was successfully logged out.

**Response to unsuccessful request**
- Status code: `400`
  - User wasn't successfully logged out.

<hr />

## /recommendation (done)

The purpose of sessions of a particular user, is to check that they have logged in. You will have to store their session id in local storage or memory. A user session will last 60 minutes. After that it will be removed from the database and the user will have to login again.

### `get`

This will be the request made to login a user.

**Request headers:**
- X-Session_id

**Request body:**
- Student Preference Data
- Number of subjects to recommend

**Response to successful request**
- Status code: `200`
- Recommended subjects and their data

**Response to unsuccessful request**
- Status code: `403`
  - 403 means that the entity/person trying to gain access to the system is not authorised.

<hr />

## /course-areas

<hr />

## /ug-degrees

<hr />

## /majors

<hr />

## /majors-subjects

<hr />

## /core-subjects

<hr />

## /subjects

