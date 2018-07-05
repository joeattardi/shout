const { existsSync, readFileSync } = require('fs');

const jwt = require('jsonwebtoken');

const logger = require('./logger');

let jwtKey;

const jwtExpireTime = parseInt(process.env.JWT_EXPIRE_TIME) || 3600;
logger.info(`JWT expire time set to ${jwtExpireTime} seconds`);
exports.jwtExpireTime = jwtExpireTime;

const jwtKeyPath = process.env.JWT_PRIVATE_KEY;
if (!jwtKeyPath) {
  logger.error('No JWT private key specified');
  process.exit(1);
}

if (existsSync(jwtKeyPath)) {
  logger.info(`Loading JWT private key from ${jwtKeyPath}`);
  jwtKey = readFileSync(jwtKeyPath);
} else {
  logger.error(`JWT private key "${jwtKeyPath}" not found`);
}

const jwtPublicKeyPath = process.env.JWT_PUBLIC_KEY;
if (!jwtPublicKeyPath) {
  logger.error('No JWT public key specified');
  process.exit(1);
}

if (existsSync(jwtPublicKeyPath)) {
  logger.info(`Loading JWT public key from ${jwtPublicKeyPath}`);
  exports.jwtPublicKey = readFileSync(jwtPublicKeyPath);
} else {
  logger.error(`JWT public key "${jwtPublicKeyPath}" not found`);
  process.exit(1);
}

exports.sign = function(user, expiresIn) {
  logger.info(`Creating JWT for user ${user.username}`);
  return jwt.sign(
    {
      admin: user.admin
    },
    jwtKey,
    {
      algorithm: 'RS256',
      expiresIn,
      subject: user.username
    }
  );
};
