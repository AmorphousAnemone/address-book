const express = require('express')
const cors = require('cors');
const path = require('path');

// Add this section after port listening is up and running.
const mongoose = require('mongoose');

// Can have .env file 
require('dotenv').config();

// This section creates express server
const app = express();


// Cors middleware - allows us to parse JSON
app.use(cors());
app.use(express.json());

// After middleware...
const uri = process.env.ATLAS_URI;

// Pass in "uri" (location of database) to connect
// useNewUrlParser and useCreateIndex flags used because MongoDB Node.js driver reqrote the tool it uses parse MongoDB
// and depracating index function.
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Import the files
const contactRouter = require('./routes/contacts')

// Loads everything from the /contacts router.
app.use('/contacts', contactRouter);

// Serves static assets if in production
if (process.env.NODE_ENV === "production") {
    // set a static folder
    app.use(express.static('/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;

// Listens on port 5000 for our server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});