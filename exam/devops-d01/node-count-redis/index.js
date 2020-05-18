const
    http = require('http'),
    redis = require("redis")
;

const
    PORT = 8080,
    REDIS_HOST = process.env.REDIS_HOST,
    REDIS_PORT = process.env.REDIS_PORT
;

const client = redis.createClient({ host: REDIS_HOST, port: REDIS_PORT });
const server  = http.createServer((req, res) => {
    console.log("I receive a request");

    if (req.url !== "/") {
        res.statusCode = 404;
        return res.end()
    }

    client.get("count", (err, reply) => {
        let count = reply || 0;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`You are visitor number ${++count} !\n`);
        client.set("count", count)
    });
});

console.log(`Start listening on port ${PORT}`);
server.listen(PORT);