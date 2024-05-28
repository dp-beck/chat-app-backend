# Chat! (Back-End)

## Description
Chat! is a no-frills realtime chat application that supports two-person conversations between registered users. A REST API written using Express (a popular Node.js framework) supports basic CRUD operations to handle typical features of a chat application: creation of users, maintenance of a user profile, and sending/receiving messages. The data for the application is stored in a MongoDB database. The Mongoose ODM is used to for schema validation and translate between objects in the source code and the representation of those objets in the database. Authentication and security is handled using Passport.js and JSON web tokens.

You can access the site at [Chat!](https://chat-app-frontend-0wt0.onrender.com/),  where you can sign in, create a new user, or explore the application using the provided "test" username.

## Technologies Used:

* **Express** - A popular Node.js framework
* **Express Async Handler** - Middleware used to simplify handling of errors in asynchronous controller funcation.
* **Express Validator** - Middleware used to validate and sanitize http requests sent to the server.
* **MongoDB** - A popular NoSQL database
* **Mongoose** - The Object Data Modeling library used to manage relationship between objects in the source code and the representation of those objets in the database.
* **Passport.js** - Middleware used for handling user authentication.
* **JSON Web Tokens** - Encrypted tokens passed in with API requests that identify the logged in user making the requests.
* **Socekt.io** - Event-driven library for handling realtime communication between client and server; enables chat messages to be sent and received in real time.
* **Render** - Cloud service used to host the api.

## Front-End Information

A Single Page Application (SPA) written using React and React Router that retrieves and updates data through fetch calls. For more information, please refer to the separate repository for this application's front-end [Chat! Front-end](https://github.com/dp-beck/chat-app-frontend).
