const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Log level (e.g., info, error, debug)
  format: winston.format.combine(
    winston.format.timestamp(), // Add a timestamp to each log
    winston.format.json() // Log in JSON format
  ),
  transports: [
    // Log to the console
    new winston.transports.Console(),
    // Log to a file
    new winston.transports.File({ filename: 'middleware.log' }),
  ],
});

module.exports = logger;