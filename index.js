import express from 'express';
import { reverse } from 'dns';
import dns from 'dns';
import whois from 'whois-json';

const app = express();
const port = 3000;

app.get('/', async(req, res) => {
let userIP5 = req.headers;
var isp;
let clientIp = userIP5['x-forwarded-for'].split(',')[0];
const whoisData = await whois(clientIp);

let JSON ={"ip":userIP5['x-forwarded-for'].split(',')[0],"user-agent":userIP5['user-agent'], "accept-language":userIP5['accept-language'].split(',')[0],"continent":userIP5['x-vercel-ip-continent'], "country":userIP5['x-vercel-ip-country'], "region":userIP5['x-vercel-ip-region'], "city":userIP5['x-vercel-ip-city'].replace(/(%20)/g, ' '), "latitude":userIP5['x-vercel-ip-latitude'], "longitude":userIP5['x-vercel-ip-longitude'], "timezone":userIP5['x-vercel-ip-timezone'], "asn":userIP5['x-vercel-ip-asn'], "organization":userIP5['x-vercel-ip-organization'], "security":userIP5['x-vercel-ip-security'], "isp":userIP5['x-vercel-ip-isp'],browser:userIP5['sec-ch-ua'].split('"')[5],os:userIP5['user-agent'].split('(')[1].split(')')[0]+" "+userIP5['user-agent'].split(' ')[4],device:userIP5['user-agent'].split(' ')[2],zip:userIP5['x-vercel-ip-postal-code'],isp:whoisData.netname || 'ISP not found',ispdescr:whoisData.descr || 'ISP not found'};
  res.send(JSON);
});

app.get('/ip', async(req, res) => {
    const clientIp = "103.27.10.68";

    // Perform a reverse DNS lookup to get the domain associated with the IP
    try {
        // Perform a WHOIS query to get the information about the IP address
        const whoisData = await whois(clientIp);
        console.log(whoisData);

        // Look for the ISP in the response, typically in 'org' or similar fields
        const isp = whoisData.netname || 'ISP not found';

        res.send(`The ISP for IP ${clientIp} is: ${isp}`);
    } catch (err) {
        console.error('Error fetching WHOIS data:', err);
        res.status(500).send('Error retrieving ISP information.');
    } 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});