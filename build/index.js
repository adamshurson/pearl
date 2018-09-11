module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var window = global.window || window;

var Pearl = function Pearl(className, init) {
    _classCallCheck(this, Pearl);

    if (window[className] === undefined) {
        init = init || function () {
            throw new Error("Init not defined");
        };
        window[className] = {
            subscribers: [],
            state: {},
            history: [],
            init: init,
            setState: function setState(newState) {
                window[className].history.push(window[className].state);
                var temp = Object.assign({}, window[className].state);
                window[className].state = Object.assign(temp, newState);
                window[className].update();
            },
            subscribe: function subscribe(callback, field) {
                field = field || null;
                window[className].subscribers.push({
                    callback: callback,
                    field: field
                });
                callback(window[className].state[field] || window[className].state);
            },
            update: function update() {
                for (var i = 0; i < window[className].subscribers.length; i++) {
                    var field = window[className].subscribers[i].field || null;
                    if (field === null) {
                        window[className].subscribers[i].callback(window[className].state);
                    } else {
                        if (window[className].state.hasOwnProperty(field)) {
                            // field must be changed if state includes it now
                            if (window[className].history.length <= 1) {
                                window[className].subscribers[i].callback(window[className].state);
                            } else {
                                // check if state field has changed in history
                                if (window[className].history[window[className].history.length - 2][field] !== window[className].history[window[className].history.length - 1][field]) {
                                    window[className].subscribers[i].callback(window[className].state[field]);
                                } else {
                                    console.log('state updated but field not changed');
                                }
                            }
                        } else {
                            throw new Error("Field: " + field + " does not exist in state of " + className);
                        }
                    }
                }
            }
        };
        window[className].init.bind(window[className]);
        window[className].init();
    }
    return window[className];
};

exports.default = Pearl;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);