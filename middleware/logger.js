//destructuring allows us to extract from the dependencies in this scenario
const { format } = require('date-fns'); //importing format function from the date-fns by destructuring
const { v4: uuid } = require('uuid'); //importing v4 function from uuid library by destructuring and renamed to uuid
const fs = require('fs'); //importing 'fs module' built into nodejs, without destructuring, 'fs' refers to 'fs module' throughout
const fsPromises = require('fs').promises; //importing promises object from fs module, using destructuring.
//now we can use functions like fsPromises.readFile, fsPromises.writeFile. perform file operations asynchronously using promises.
const path = require('path'); //importing path module from nodejs, again the path variable refers to the path module.

//formatting the date and time of log messages
//logitem passes in the datetime alongside the uuid

const logEvents = async (message, logFileName) => {
  // async function 'logevents' with 2 params
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`; // datetime var created with string interpolation -- uses format function from date-fns lib,
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`; // formats the current date and time per the provided format string ('yyyyMMdd\tHH:mm:ss').

  // if the directory doesn't exist
  // we'll pass the same path and create it
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

//calling the middleware here, needs a req, res, and ability to call next move onto the next middleware
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
  console.log(`${req.method}\t${req.path}\t$`);
  next(); //moves onto the next middleware or the controller where the request will be processed
};

module.exports = { logEvents, logger };
//used in nodejs to export multiple functions OR objects from a module
//here we're exporting logevents func and the logger object
//these can now be accessed by other modules that import this module, allowing for use of logevents and logger.
