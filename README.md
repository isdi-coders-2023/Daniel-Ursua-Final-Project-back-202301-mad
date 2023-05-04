# PlantApp

PlantApp is a web application that allows users to manage their plant collections. The backend of PlantApp is built with Node.js and the Express framework, and uses MongoDB as the database. The backend is responsible for handling user requests, managing routes, and verifying user credentials.

PlantApp supports basic CRUD (Create, Read, Update, Delete) operations for plant records. Users can create new plant records, edit and delete the ones they created, and read all the records in the system.

In addition to plant management, PlantApp includes user authentication and authorization features. Users can register and log in to the system to create, edit, and delete their plant records.

Technologies Used
The backend is built using TypeScript and Node.js with the Express framework. The database used is MongoDB.

# Routes

## Plant Routes

POST /plant/add: Add a new plant record to the database.
PATCH /plant/edit: Update an existing plant record in the database.
GET /plant: Retrieve all plant records from the database.
GET /plant/:id: Retrieve a specific plant record by ID from the database.
DELETE /plant: Delete an existing plant record from the database.
##User Routes
POST /user/register: Register a new user account.
POST /user/login: Authenticate an existing user and log them in.


# Environment Variables
The following environment variables are required for the application to run:

DB_USER: The username for the MongoDB database.
DB_PASSWORD: The password for the MongoDB database.
DB_CLUSTER: The MongoDB cluster URL.
DB_NAME: The name of the MongoDB database.
# Getting Started
To get started with the application, follow these steps:

Clone this repository to your local machine.
Install the dependencies by running npm install.
Create a .env file in the root directory of the project with the required environment variables.
Start the server by running npm start.
# Contributing
If you would like to contribute to the project, please fork the repository and submit a pull request with your changes.
