require('dotenv').config();

const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');

const logger = require('./logger');
const router = require('./router');

const version = require('../package').version;
const db = require('../models');

const app = express();

process.on('exit', () => {
  logger.info(`Server shutting down on ${new Date().toString()}`);
});

process.on('SIGINT', () => {
  process.exit(0);
});

process.stdout.write('================================================================\n');
process.stdout.write('shout!\n');
process.stdout.write(`Version ${version}\n`);
process.stdout.write('Copyright 2018 by Joe Attardi (joe@attardi.net)\n');

process.stdout.write('================================================================\n');

logger.info(`Server starting up on ${new Date().toString()}`);

logger.info('Verifying database connection');
db.sequelize
  .authenticate()
  .then(() => {
    logger.info('Database connection successful')
  })
  .catch(error => {
    logger.error('Unable to connect to database, shutting down');
    process.exit(1);
  });

app.use(bodyParser.json());
app.use('/api', router);
app.use(express.static(path.join(__dirname, '../dist/shout')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/shout/index.html'));
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  logger.info(`Server up, listening on port ${port}`);
});
