const { logEvents } = require('./logger'); //importing logevents from same directory

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'errLog.log'
  );
  console.log(err.stack); //large message in console, providing error details and where it is

  const status = res.statusCode ? res.statusCode : 500; //define status, if the response has a status code, return it, if not 500 server error.

  res.status(status); //set the status to the ternary above

  res.json({ message: err.message, isError: true }); //response in json w/ error
  //rtkQuery isError
};

module.exports = errorHandler;
//2nd verse same as the first, export the module to be used somewhere else
