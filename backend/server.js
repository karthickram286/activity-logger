const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port =  process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
});