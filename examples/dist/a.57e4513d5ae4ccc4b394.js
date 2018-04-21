/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"a": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"a": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"b":1,"c":1,"d":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = reject;
/******/ 				linkTag.href = __webpack_require__.p + "" + ({"b":"b","c":"c","d":"d"}[chunkId]||chunkId) + ".css";
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = __webpack_require__.p + "" + ({"b":"b","c":"c","d":"d"}[chunkId]||chunkId) + "." + {"b":"d480bf313112e7a53685","c":"a4a040af3582138de2bc","d":"d4007f0e18c8de4bc110"}[chunkId] + ".js";
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				function onScriptComplete(event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./a.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/babel-plugin-dual-import/importCss.js":
/*!*************************************************************!*\
  !*** ../node_modules/babel-plugin-dual-import/importCss.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable */\n\nvar ADDED = {};\n\nmodule.exports = function(chunkName) {\n  var href = getHref(chunkName)\n  if (!href) {\n    if (true) {\n      if (typeof window === 'undefined' || !window.__CSS_CHUNKS__) {\n        console.warn(\n          '[DUAL-IMPORT] no css chunks hash found at \"window.__CSS_CHUNKS__\"'\n        )\n        return\n      }\n\n      console.warn(\n        '[DUAL-IMPORT] no chunk, ',\n        chunkName,\n        ', found in \"window.__CSS_CHUNKS__\"'\n      )\n    }\n\n    return\n  }\n  \n  if (ADDED[href] === true) {\n    return Promise.resolve();\n  }\n  ADDED[href] = true;\n\n  var head = document.getElementsByTagName('head')[0]\n  var link = document.createElement('link')\n\n  link.href = href\n  link.charset = 'utf-8'\n  link.type = 'text/css'\n  link.rel = 'stylesheet'\n  link.timeout = 30000\n\n  return new Promise(function(resolve, reject) {\n    var timeout\n\n    link.onerror = function() {\n      link.onerror = link.onload = null // avoid mem leaks in IE.\n      clearTimeout(timeout)\n      var message = 'could not load css chunk:${chunkName}'\n      reject(new Error(message))\n    }\n\n    // link.onload doesn't work well enough, but this will handle it\n    // since images can't load css (this is a popular fix)\n    var img = document.createElement('img')\n    img.onerror = function() {\n      link.onerror = img.onerror = null // avoid mem leaks in IE.\n      clearTimeout(timeout)\n      resolve()\n    }\n\n    timeout = setTimeout(link.onerror, link.timeout)\n    head.appendChild(link)\n    img.src = href\n  })\n}\n\nfunction getHref(chunkName) {\n  if (typeof window === 'undefined' || !window.__CSS_CHUNKS__) return null\n  return window.__CSS_CHUNKS__[chunkName]\n}\n\n\n//# sourceURL=webpack:///../node_modules/babel-plugin-dual-import/importCss.js?");

/***/ }),

/***/ "./a.css":
/*!***************!*\
  !*** ./a.css ***!
  \***************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\nmodule.exports = {\"a\":\"a__a--32HVX\"};\n\n//# sourceURL=webpack:///./a.css?");

/***/ }),

/***/ "./a.js":
/*!**************!*\
  !*** ./a.js ***!
  \**************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var babel_plugin_dual_import_importCss_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-plugin-dual-import/importCss.js */ \"../node_modules/babel-plugin-dual-import/importCss.js\");\n/* harmony import */ var babel_plugin_dual_import_importCss_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_plugin_dual_import_importCss_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _a_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./a.css */ \"./a.css\");\n/* harmony import */ var _a_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_a_css__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar button = document.createElement('button');\nbutton.className = _a_css__WEBPACK_IMPORTED_MODULE_1___default.a.a;\nbutton.innerText = 'load modules';\nbutton.addEventListener('click', function () {\n  button.innerText = 'loading...';\n  Promise.all([__webpack_require__.e(/*! import() | b */ \"b\").then(__webpack_require__.bind(null, /*! ./b.js */ \"./b.js\")), babel_plugin_dual_import_importCss_js__WEBPACK_IMPORTED_MODULE_0___default()('b')]).then(function (proms) {\n    return proms[0];\n  }).then(function () {\n    button.innerText = 'loaded';\n  });\n});\n\ndocument.body.appendChild(button);\n\n//# sourceURL=webpack:///./a.js?");

/***/ })

/******/ });