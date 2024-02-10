const http = require('http');
const fs = require("fs");
const { url } = require('inspector');
const path = require('path');

const server = http.createServer((req, res) => {
  
  if (req.url.startsWith('/static')) {
    let filePath = "." + req.url.replace("/static", '/assets');
    let fileExtension = path.extname(filePath).slice(1);
    
    switch (fileExtension) {
      case 'css':
        res.setHeader('Content-Type', 'text/css');
        res.body = fs.readFileSync(filePath, 'utf-8');
        break;
      case 'jpg':
      case 'jpeg':
        res.setHeader('Content-Type', 'image/jpeg');
        res.body = fs.readFileSync(filePath);
        break;
    }
    res.statusCode = 200;
    return res.end(res.body);
  }
  let indexHtml = fs.readFileSync('./index.html');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.body = indexHtml;
  res.end(res.body)
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
