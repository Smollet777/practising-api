const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/dist/practising-api')));

app.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname, '/dist/practising-api/index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log('Server started...'));
