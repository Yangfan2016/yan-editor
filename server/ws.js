const WebSocket = require('ws');

const PORT = 9696;
const wss = new WebSocket.Server({ port: PORT });


let pool = [];

wss.on('connection', function (ws,req) {
    const ip = req.connection.remoteAddress;
    console.log(ip);
    pool.push(ws);
    ws.on('message', function (message) {
        console.log('received: %s', message);
        pool.forEach(client => {
            if (client !== ws) {
                client.send(message);
            }
        });
    });
    ws.on('close', function () {
        pool = pool.filter(client => {
            return client !== ws;
        });
    });
});