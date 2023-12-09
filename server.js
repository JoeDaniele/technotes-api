require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path'); // import path from the nodejs system
const { logger } = require('./middleware/logger'); //importing logger
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions'); //earlier Cannot find module './config/cors-options' -- just means we didnt locate it properly
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const { logEvents } = require('./middleware/logger');
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV); //log the node env value

connectDB();

app.use(logger);

app.use(cors(corsOptions)); //Needs security, otherwise our api is open to other origins. corsOptions handles that security

app.use(express.json()); // this will let our app receive and parse json data

app.use(cookieParser()); //parse cookies we receive

app.use('/', express.static(path.join(__dirname, '/public'))); // middleware -- telling express where to find static files

app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/notes', require('./routes/noteRoutes'));

app.all('*', (req, res) => {
  //handles anything that's not found
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 not found' });
  } else {
    res.type('txt').send('404 not found');
  }
});

app.use(errorHandler);
//Using string interpolation, use back ticks.
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  //listen for error then pass error into callback
  console.log(err); //log the error
  logEvents(
    //error number, code, system call and hostname, then create an error log 'mongoerrlog.log'
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log'
  );
});
