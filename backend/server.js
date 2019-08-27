const express = require('express')
const cors = require('cors');

// add this section after port listening is up and running.
const mongoose = require('mongoose');

// can have .env file 
require('dotenv').config();

// this section creates express server
const app = express();
const port = process.env.PORT || 5000;

// cors middleware - allows us to parse JSON
app.use(cors());
app.use(express.json());

// after middleware...
const uri = process.env.ATLAS_URI;

// pass in "uri" (location of database) to connect
// useNewUrlParser and useCreateIndex flags used because MongoDB Node.js driver reqrote the tool it uses parse MongoDB
// and depracating index function.
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// import the files
const contactRouter = require('./routes/contacts')

// loads everything from the /contacts router.
app.use('/contacts', contactRouter);

// listens on port 5000 for our server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});