const express = require("express");
const app = express();
const port = 3000;
const myBudgetData = require('./data.json');


app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
  res.send('hello world');
});

app.get('/budget', (req, res) => {
  res.send(myBudgetData);
});

app.listen(port, () => {
  console.log(`example is listening on port localhost:${port}`);
});