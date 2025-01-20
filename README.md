# IP API Fast

**IP API Fast** is a lightweight API deployed on Vercel. It retrieves detailed information about IP addresses, such as geographical data, ISP details, and device information, by processing HTTP request headers and performing WHOIS lookups.

---

## Live Endpoint

The API is live at:  
**[https://ipapifast.vercel.app/](https://ipapifast.vercel.app/)**

---

## Features

- **IP Metadata:** Extracts IP, browser, OS, device, and geographical details.
- **WHOIS Lookup:** Fetches ISP name and description using WHOIS.
- **Device Info:** Provides user-agent details like browser and OS.
- **Geo Data:** Uses headers injected by Vercel for continent, country, city, etc.

---

## API Endpoints

### 1. `/`  
Provides detailed metadata about the client making the request.

#### Example Request
```bash
curl https://ipapifast.vercel.app/
```

#### Example Response
```json
{
  "ip": "103.27.10.68",
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  "accept-language": "en-US",
  "continent": "Asia",
  "country": "IN",
  "region": "Delhi",
  "city": "New Delhi",
  "latitude": "28.6139",
  "longitude": "77.2090",
  "timezone": "Asia/Kolkata",
  "asn": "12345",
  "organization": "Example Org",
  "security": "low",
  "isp": "MyISP",
  "ispdescr": "MyISP Description",
  "browser": "Chrome",
  "os": "Windows 10",
  "device": "Desktop",
  "zip": "110001"
}
```

---


## Code Explanation

### Extracting Client Information
The API uses the `x-forwarded-for` header to get the client IP:
```javascript
let clientIp = userIP5['x-forwarded-for'] 
    ? userIP5['x-forwarded-for'].split(',')[0] 
    : req.socket.remoteAddress;
```
- **Fallback:** Uses `req.socket.remoteAddress` if the `x-forwarded-for` header is unavailable.

### WHOIS Lookup
The `whois-json` package fetches ISP details for the client IP:
```javascript
const whoisData = await whois(clientIp);
```
- Extracts the `netname` (ISP) and `descr` (ISP description).

### Response Object
The API combines metadata from HTTP headers and WHOIS lookup:
```javascript
const responseJSON = {
    ip: clientIp,
    continent: userIP5['x-vercel-ip-continent'] || 'Unknown',
    isp: whoisData.netname || 'ISP not found',
    browser: userIP5['sec-ch-ua']?.split('"')[5] || 'Unknown',
    os: `${userIP5['user-agent'].split('(')[1]?.split(')')[0]}`
};
```
- Provides fallback values like `'Unknown'` for missing data.

---

## Deployment on Vercel

The API is deployed on **Vercel**, which automatically injects headers like `x-vercel-ip-*`. These headers provide geographical and security information about the client.

- **Headers Used:**
  - `x-vercel-ip-country`
  - `x-vercel-ip-region`
  - `x-vercel-ip-city`
  - `x-vercel-ip-continent`
  - `x-vercel-ip-timezone`
  - `x-vercel-ip-asn`

---
