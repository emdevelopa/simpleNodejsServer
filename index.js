const http = require('http');
const fs = require('fs');

const PORT = 3000;

// middleware function that logs the request being made on the console
const logIncomingRequests = (req, res, next) => {
  console.log(`Received ${req.method} request at http://localhost:${PORT}${req.url}`);
  next();
};

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    logIncomingRequests(req, res, () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, Node.js');
    });
  } else if (req.url === '/file') {
    logIncomingRequests(req, res, () => {
      fs.readFile('data.txt', 'utf8', (error, data) => {
        if (error) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error when trying to get content from data.txt file');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(data);
        }
      });
    });
  } else if (req.url === '/api/user') {
    logIncomingRequests(req, res, () => {
      const userObject = {
        "name": "Gyimah Emmanuel",
        "email": "olatunbossemma17@gmail.com",
        "age": 19
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(userObject));
    });
  } else {
    logIncomingRequests(req, res, () => {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found.');
    });
  }
});

server.listen(PORT, () => {
  console.log("Server running on port", PORT, `\nCheck it out here http://localhost:${PORT}`);
});
