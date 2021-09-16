const express = require('express');
require('dotenv').config({ path: process.env.NODE_ENV === 'dev' ? './config/dev.env' : './config/test.env' });
const cors = require('cors');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', usersRouter);
app.use('/', authRouter);

module.exports = app;
