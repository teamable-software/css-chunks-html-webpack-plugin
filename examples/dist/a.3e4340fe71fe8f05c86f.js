/******/ (function(modules) {
  // webpackBootstrap
  /******/ // install a JSONP callback for chunk loading
  /******/ function webpackJsonpCallback(data) {
    /******/ var chunkIds = data[0];
    /******/ var moreModules = data[1]; // add "moreModules" to the modules object, // then flag all "chunkIds" as loaded and fire callback
    /******/
    /******/ /******/ /******/ var moduleId,
      chunkId,
      i = 0,
      resolves = [];
    /******/ for (; i < chunkIds.length; i++) {
      /******/ chunkId = chunkIds[i];
      /******/ if (installedChunks[chunkId]) {
        /******/ resolves.push(installedChunks[chunkId][0]);
        /******/
      }
      /******/ installedChunks[chunkId] = 0;
      /******/
    }
    /******/ for (moduleId in moreModules) {
      /******/ if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        /******/ modules[moduleId] = moreModules[moduleId];
        /******/
      }
      /******/
    }
    /******/ if (parentJsonpFunction) parentJsonpFunction(data);
    /******/ while (resolves.length) {
      /******/ resolves.shift()();
      /******/
    }
    /******/
    /******/
  } // The module cache
  /******/
  /******/
  /******/ /******/ var installedModules = {}; // object to store loaded CSS chunks
  /******/
  /******/ /******/ var installedCssChunks = {
    /******/ 3: 0,
    /******/
  }; // object to store loaded and loading chunks // undefined = chunk not loaded, null = chunk preloaded/prefetched // Promise = chunk loading, 0 = chunk loaded
  /******/
  /******/ /******/ /******/ /******/ var installedChunks = {
    /******/ 3: 0,
    /******/
  }; // script path function
  /******/
  /******/ /******/ function jsonpScriptSrc(chunkId) {
    /******/ return (
      __webpack_require__.p +
      '' +
      ({ '0': 'b', '1': 'd', '2': 'c' }[chunkId] || chunkId) +
      '.' +
      { '0': '58475290858576a34dc5', '1': 'e9e094980d4cbc5ba328', '2': 'cc03c2fe2a1a040020c5' }[chunkId] +
      '.js'
    );
    /******/
  } // The require function
  /******/
  /******/
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // This file contains only the entry chunk. // The chunk loading function for additional chunks
  /******/
  /******/ /******/ /******/ __webpack_require__.e = function requireEnsure(chunkId) {
    /******/ var promises = []; // mini-css-extract-plugin CSS loading
    /******/
    /******/
    /******/ /******/ var cssChunks = { '0': 1, '1': 1, '2': 1 };
    /******/ if (installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
    /******/ else if (installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
      /******/ promises.push(
        (installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
          /******/ var href = '' + ({ '0': 'b', '1': 'd', '2': 'c' }[chunkId] || chunkId) + '.css';
          /******/ var fullhref = __webpack_require__.p + href;
          /******/ var existingLinkTags = document.getElementsByTagName('link');
          /******/ for (var i = 0; i < existingLinkTags.length; i++) {
            /******/ var tag = existingLinkTags[i];
            /******/ var dataHref = tag.getAttribute('data-href') || tag.getAttribute('href');
            /******/ if (tag.rel === 'stylesheet' && (dataHref === href || dataHref === fullhref)) return resolve();
            /******/
          }
          /******/ var existingStyleTags = document.getElementsByTagName('style');
          /******/ for (var i = 0; i < existingStyleTags.length; i++) {
            /******/ var tag = existingStyleTags[i];
            /******/ var dataHref = tag.getAttribute('data-href');
            /******/ if (dataHref === href || dataHref === fullhref) return resolve();
            /******/
          }
          /******/ var linkTag = document.createElement('link');
          /******/ linkTag.rel = 'stylesheet';
          /******/ linkTag.type = 'text/css';
          /******/ linkTag.onload = resolve;
          /******/ linkTag.onerror = function(event) {
            /******/ var request = (event && event.target && event.target.src) || fullhref;
            /******/ var err = new Error('Loading CSS chunk ' + chunkId + ' failed.\n(' + request + ')');
            /******/ err.request = request;
            /******/ reject(err);
            /******/
          };
          /******/ linkTag.href = fullhref;
          /******/ var head = document.getElementsByTagName('head')[0];
          /******/ head.appendChild(linkTag);
          /******/
        }).then(function() {
          /******/ installedCssChunks[chunkId] = 0;
          /******/
        }))
      );
      /******/
    } /******/ // JSONP chunk loading for javascript
    /******/
    /******/ /******/ var installedChunkData = installedChunks[chunkId];
    /******/ if (installedChunkData !== 0) {
      // 0 means "already installed".
      /******/
      /******/ // a Promise means "currently loading".
      /******/ if (installedChunkData) {
        /******/ promises.push(installedChunkData[2]);
        /******/
      } else {
        /******/ // setup Promise in chunk cache
        /******/ var promise = new Promise(function(resolve, reject) {
          /******/ installedChunkData = installedChunks[chunkId] = [resolve, reject];
          /******/
        });
        /******/ promises.push((installedChunkData[2] = promise)); // start chunk loading
        /******/
        /******/ /******/ var head = document.getElementsByTagName('head')[0];
        /******/ var script = document.createElement('script');
        /******/
        /******/ script.charset = 'utf-8';
        /******/ script.timeout = 120;
        /******/
        /******/ if (__webpack_require__.nc) {
          /******/ script.setAttribute('nonce', __webpack_require__.nc);
          /******/
        }
        /******/ script.src = jsonpScriptSrc(chunkId);
        /******/ var timeout = setTimeout(function() {
          /******/ onScriptComplete({ type: 'timeout', target: script });
          /******/
        }, 120000);
        /******/ script.onerror = script.onload = onScriptComplete;
        /******/ function onScriptComplete(event) {
          /******/ // avoid mem leaks in IE.
          /******/ script.onerror = script.onload = null;
          /******/ clearTimeout(timeout);
          /******/ var chunk = installedChunks[chunkId];
          /******/ if (chunk !== 0) {
            /******/ if (chunk) {
              /******/ var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              /******/ var realSrc = event && event.target && event.target.src;
              /******/ var error = new Error(
                'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')'
              );
              /******/ error.type = errorType;
              /******/ error.request = realSrc;
              /******/ chunk[1](error);
              /******/
            }
            /******/ installedChunks[chunkId] = undefined;
            /******/
          }
          /******/
        }
        /******/ head.appendChild(script);
        /******/
      }
      /******/
    }
    /******/ return Promise.all(promises);
    /******/
  }; // expose the modules object (__webpack_modules__)
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter,
        /******/
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default'];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, 'a', getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ''; // on error function for async loading
  /******/
  /******/ /******/ __webpack_require__.oe = function(err) {
    console.error(err);
    throw err;
  };
  /******/
  /******/ var jsonpArray = (window['webpackJsonp'] = window['webpackJsonp'] || []);
  /******/ var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  /******/ jsonpArray.push = webpackJsonpCallback;
  /******/ jsonpArray = jsonpArray.slice();
  /******/ for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  /******/ var parentJsonpFunction = oldJsonpFunction; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 3));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function(module, exports, __webpack_require__) {
      /* eslint-disable */

      var ADDED = {};

      module.exports = function(chunkName) {
        var href = getHref(chunkName);
        if (!href) {
          if (false) {
          }

          return;
        }

        if (ADDED[href] === true) {
          return Promise.resolve();
        }
        ADDED[href] = true;

        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.charset = 'utf-8';
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.timeout = 30000;

        return new Promise(function(resolve, reject) {
          var timeout;

          link.onerror = function() {
            link.onerror = link.onload = null; // avoid mem leaks in IE.
            clearTimeout(timeout);
            var message = 'could not load css chunk:${chunkName}';
            reject(new Error(message));
          };

          // link.onload doesn't work well enough, but this will handle it
          // since images can't load css (this is a popular fix)
          var img = document.createElement('img');
          img.onerror = function() {
            link.onerror = img.onerror = null; // avoid mem leaks in IE.
            clearTimeout(timeout);
            resolve();
          };

          timeout = setTimeout(link.onerror, link.timeout);
          head.appendChild(link);
          img.src = href;
        });
      };

      function getHref(chunkName) {
        if (typeof window === 'undefined' || !window.__CSS_CHUNKS__) return null;
        return window.__CSS_CHUNKS__[chunkName];
      }

      /***/
    },
    /* 1 */
    /***/ function(module, exports, __webpack_require__) {
      // extracted by mini-css-extract-plugin
      module.exports = { a: 'a__a--32HVX' };

      /***/
    } /* 3 */,
    ,
    /* 2 */ /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__);
      /* harmony import */ var babel_plugin_dual_import_importCss_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        0
      );
      /* harmony import */ var babel_plugin_dual_import_importCss_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
        babel_plugin_dual_import_importCss_js__WEBPACK_IMPORTED_MODULE_0__
      );
      /* harmony import */ var _a_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
      /* harmony import */ var _a_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
        _a_css__WEBPACK_IMPORTED_MODULE_1__
      );

      var button = document.createElement('button');
      button.className = _a_css__WEBPACK_IMPORTED_MODULE_1___default.a.a;
      button.innerText = 'load modules';
      button.addEventListener('click', function() {
        button.innerText = 'loading...';
        Promise.all([
          __webpack_require__.e(/* import() | b */ 0).then(__webpack_require__.bind(null, 4)),
          babel_plugin_dual_import_importCss_js__WEBPACK_IMPORTED_MODULE_0___default()('b'),
        ])
          .then(function(proms) {
            return proms[0];
          })
          .then(function() {
            button.innerText = 'loaded';
          });
      });
      document.body.appendChild(button);

      /***/
    },
    /******/
  ]
);
