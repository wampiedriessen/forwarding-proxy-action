var httpProxy = require('http-proxy');
var net = require('net');
var http = require('http');

var port = process.env.PROXY_PORT || 8080;
console.log("listening on port " + port)

process.on('uncaughtException', function (err) {
    console.error('! uncaughtException: ' + err.stack);
});

function truncate(str)
{
    var maxLength = 100;
    return (str.length >= maxLength ? str.substring(0,maxLength) + '...' : str);
}

function logRequest(req)
{
    console.log(req.method + ' ' + truncate(req.url));
}

var regularProxy = new httpProxy.createProxyServer();

regularProxy.on('proxyReq', function(proxyReq, req, res, options) {
    proxyReq.setHeader(process.env.API_KEY_HEADER, process.env.API_KEY_VALUE);
});

var server = http.createServer();

server.on('request', function(req, res) {
    logRequest(req);

    regularProxy.proxyRequest(req, res, {
        host: req.url.hostname,
        port: req.url.port || 80
    });
});

server.on('connect', function(req, socket, head) {
    logRequest(req);

    var parts = req.url.split(':', 2);

    var host = parts[0];
    var port = parts[1];

    var conn = net.connect(port, host, function() {
        socket.write("HTTP/1.1 200 OK\r\n\r\n");
        socket.pipe(conn);
        conn.pipe(socket);
    });
});

server.listen(port);
