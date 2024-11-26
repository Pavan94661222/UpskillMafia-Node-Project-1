const http = require('http'); // Import the http module
const fs = require('fs'); // Import the file system module
const path = require('path'); // Import the path module

const PORT = 3000; // Specify the port number

// Function to serve HTML pages
const serveFile = (filePath, contentType, response) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If file not found, send a 500 error
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('500 Internal Server Error');
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(data);
    }
  });
};

// Create the server
const server = http.createServer((req, res) => {
  const route = req.url;

  // Routing logic
  if (route === '/' || route === '/home') {
    serveFile(path.join(__dirname, 'pages', 'home.html'), 'text/html', res);
  } else if (route === '/about') {
    serveFile(path.join(__dirname, 'pages', 'about.html'), 'text/html', res);
  } else if (route === '/contact') {
    serveFile(path.join(__dirname, 'pages', 'contact.html'), 'text/html', res);
  } else {
    // Handle invalid routes
    serveFile(path.join(__dirname, 'pages', '404.html'), 'text/html', res);
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
