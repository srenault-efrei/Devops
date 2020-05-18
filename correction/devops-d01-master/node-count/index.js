const
    http = require('http'),
    fs = require('fs')
;

const PORT = 8080;
let data = require("./data.json");
const server  = http.createServer((req, res) => {
    console.log("I receive a request");
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Your are the visitor number ${++data.count} !\n`)
    fs.writeFileSync("./data.json", JSON.stringify(data))
});

console.log(`Start listening on port ${PORT}`);
server.listen(PORT);