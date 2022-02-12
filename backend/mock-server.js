const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
}));

app.get('/api/v1/auth/login', (req, res) => {
  res.send({});
});

app.get('/api/v1/auth/current-account', (req, res) => {
  res.send(null);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});