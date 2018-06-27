const { readFileSync } = require('fs');

const jwt = require('jsonwebtoken');

const logger = require('./logger');

const jwtKeyPath = process.env.JWT_PRIVATE_KEY;
if (!jwtKeyPath) {
  logger.error('No JWT key specified. Authentication will not work without a JWT key.');
}
logger.info(`Loading JWT key from ${jwtKeyPath}`);
const jwtKey = readFileSync(jwtKeyPath);

function sign(subject, expiresIn) {
  logger.info(`Creating JWT for user ${subject}`);
  return jwt.sign({}, jwtKey, {
    algorithm: 'RS256',
    expiresIn,
    subject
  });
}

module.exports = {
  sign
};
