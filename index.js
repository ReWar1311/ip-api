import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
let userIP5 = req.headers;
  res.send(userIP5);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});