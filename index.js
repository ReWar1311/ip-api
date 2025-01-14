import express from 'express';
import { reverse } from 'dns';
import dns from 'dns';
import whois from 'whois-json';

const app = express();
const port = 3000;

app.get('/', async(req, res) => {
let userIP5 = {
    "host": "iptest-eight.vercel.app",
    "x-forwarded-for": "103.27.10.68",
    "x-vercel-proxy-signature": "Bearer 1494ab8d34b243d0906dad790e535bda4c1bbfd422a586a3215cc3ffc22fc32f",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "x-vercel-deployment-url": "iptest-8f8z6f916-rewars-projects.vercel.app",
    "cookie": "perf_dv6Tr4n=1",
    "sec-fetch-dest": "document",
    "x-vercel-ja4-digest": "t13d1612h2_1711a4c0508c_d8929e3a3a62",
    "sec-fetch-site": "cross-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 OPR/115.0.0.0",
    "x-real-ip": "103.27.10.68",
    "sec-fetch-user": "?1",
    "x-forwarded-proto": "https",
    "accept-language": "en-US,en;q=0.9",
    "forwarded": "for=103.27.10.68;host=iptest-eight.vercel.app;proto=https;sig=0QmVhcmVyIDE0OTRhYjhkMzRiMjQzZDA5MDZkYWQ3OTBlNTM1YmRhNGMxYmJmZDQyMmE1ODZhMzIxNWNjM2ZmYzIyZmMzMmY=;exp=1736808267",
    "x-vercel-ip-continent": "AS",
    "x-vercel-ip-postal-code": "110020",
    "x-vercel-ip-city": "New%20Delhi",
    "x-vercel-ip-country-region": "DL",
    "referer": "https://vercel.com/",
    "priority": "u=0, i",
    "upgrade-insecure-requests": "1",
    "sec-ch-ua-platform": "\"Windows\"",
    "x-vercel-forwarded-for": "103.27.10.68",
    "sec-fetch-mode": "navigate",
    "x-vercel-internal-ingress-bucket": "bucket017",
    "x-vercel-proxied-for": "103.27.10.68",
    "sec-ch-ua": "\"Chromium\";v=\"130\", \"Opera GX\";v=\"115\", \"Not?A_Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "accept-encoding": "gzip, deflate, br, zstd",
    "x-vercel-id": "bom1::jgtzw-1736807967733-f53b9b260cd0",
    "x-forwarded-host": "iptest-eight.vercel.app",
    "x-vercel-ip-country": "IN",
    "x-vercel-proxy-signature-ts": "1736808267",
    "x-vercel-ip-timezone": "Asia/Kolkata",
    "x-vercel-ip-as-number": "132780",
    "x-vercel-ip-latitude": "28.6327",
    "x-vercel-ip-longitude": "77.2198",
    "connection": "close"
  };
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