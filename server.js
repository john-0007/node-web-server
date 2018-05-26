const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Express app!');
});

app.listen('3000');
