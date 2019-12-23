const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const exercisesRouter = require('./routes/exercises.routes');
const usersRouter = require('./routes/users.routes');

require('dotenv').config();

const app = express();
const port =  process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/**
 * MongoDB connection
 */
const uri = process.env.MONGO_DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

/**
 * Routers
 */
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
});