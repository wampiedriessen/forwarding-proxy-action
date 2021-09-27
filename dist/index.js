/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 193:
/***/ ((module) => {

module.exports = eval("require")("http-proxy");


/***/ }),

/***/ 605:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var http = __nccwpck_require__(605),
    httpProxy = __nccwpck_require__(193);

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
    target: process.env.PROXY_TO
  });

  
  console.log("Request handled!")
});

var port = process.env.PROXY_PORT;

console.log("listening on port " + port)
server.listen(port);

})();

module.exports = __webpack_exports__;
/******/ })()
;