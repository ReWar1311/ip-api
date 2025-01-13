import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
let userIP = req.ip;
let userIP2 = 2;
let userIP3 = 3;
let userIP4 = 4;
if(req.headers['x-forwarded-for']){

userIP2 = req.headers['x-forwarded-for'].split(',')[0];
userIP3 = req.headers['x-forwarded-for'];
userIP4 = req.headers['x-forwarded-for'].split(',');
}

let userIP5 = req.headers;
  res.send("ip1 "+userIP+" ip2 "+userIP2 +" ip3 "+userIP3+" ip4 "+userIP4+" ip5 "+JSON.stringify(userIP5));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});