const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;

/**
 * Inside the connectDB function, there is an attempt to connect to the database using mongoose.connect().
 * The connection string is obtained from the process.env.DATABASE_URI environment variable,
 * which should contain the URI for the database -- it does.
 */
