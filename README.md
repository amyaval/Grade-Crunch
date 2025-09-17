# Grade-Crunch
_A tool to calculate students’ grades with ease_

### **Getting Started**

Before getting started, make sure to have the latest version of [Node.js](https://nodejs.org/en) installed.

To start, clone the repository to your local machine by running this command:
```
git clone https://github.com/amyaval/Grade-Crunch.git
```
Next, navigate to the project folder and install the dependencies:
```
cd Grade-Crunch
npm install
```

Make sure to have a .env file at the backend folder of the project.

**Environment Variables**

This project uses the express framework as the backend, so you need to install express in the backend folder.
```
npm install express
```
This project uses mongoDB Atlas for the database. Create an account with mongoDB, and can either use mongoDB Atlas or mongoDB community edition as the database. Once done so, add the URL of your database in the .env file. 

To successfully connect your database with the server code, you need to install mongoose in the backend folder of the project.
```
npm install mongoose
```
This project uses JWT (JSON web token) for authentication and cors to bridge the API code from the server to the frontend. You need to install the JWT and cors libraries in your backend folder.
```
npm install express bcryptjs jsonwebtoken cors dotenv
```
To use JWT, you need to add a JWT key to your .env file. You can generate a key by running the command:
```
openssl rand -hex 64
```
Or by visiting this website: [randomkeygen.com](https://randomkeygen.com/)

Lastly, make sure to include the node environment variable to development, and the port number where the server will be running.
