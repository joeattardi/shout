const express = require('express');

const app = express();

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Shout server up, listening on port ${port}`);
});
