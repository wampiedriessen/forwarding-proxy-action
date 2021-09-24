var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
let headers = {};
headers[process.env.API_KEY_HEADER] = process.env.API_KEY_VALUE;

var proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    headers: headers
});

var server = http.createServer(function(req, res) {
    
  console.log("Handling request!")

  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, {
    target: 'https://octopusdeploy.topicuszorg.nl'
  });

  
  console.log("Request handled!")
});

console.log("listening on port 8080")
server.listen(8080);
