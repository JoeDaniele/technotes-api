//3rd party middleware setup, using their documentation for setup
const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, //handles the header request
  optionsSuccessStatus: 200, //default is 204, some devices might have problems, 200 works -- "Request was successful"
};

module.exports = corsOptions;
/**
 * accessible from postman
 */
// if (allowedOrigins.indexOf(origin) !== -1, this would limit it to only the origins listed can access the backend rest api
// this would screen out postman and other software for testing, desktop applications,
// setting !origin or 'no origin' allows for access
