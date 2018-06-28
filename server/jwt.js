const { readFileSync } = require('fs');

const jwt = require('jsonwebtoken');

const logger = require('./logger');

const jwtExpireTime = parseInt(process.env.JWT_EXPIRE_TIME) || 3600;
logger.info(`JWT expire time set to ${jwtExpireTime} seconds`);

const jwtKeyPath = process.env.JWT_PRIVATE_KEY;
if (!jwtKeyPath) {
  logger.error('No JWT private key specified. Authentication will not work without JWT keys.');
}
logger.info(`Loading JWT private key from ${jwtKeyPath}`);
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
  jwtExpireTime,
  sign
};
