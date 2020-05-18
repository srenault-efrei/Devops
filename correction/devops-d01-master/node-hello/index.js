const http = require('http');

const PORT = 8080;
const server  = http.createServer((req, res) => {
    console.log("I receive a request");
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
      res.end(`Hello ${process.env.HELLO_WHAT || ' World'} !\n`)
});

console.log(`Start listening on port ${PORT}`);
server.listen(PORT);
