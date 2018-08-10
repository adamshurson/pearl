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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pearl = function () {
    function Pearl() {
        _classCallCheck(this, Pearl);

        this.subscribers = [];
        this.state = {};
        this.history = [];

        if (window[this.constructor.name] === undefined) {
            window[this.constructor.name] = this;
            window[this.constructor.name].init();
        }
        return window[this.constructor.name];
    }

    _createClass(Pearl, [{
        key: "init",
        value: function init() {
            throw new Error("PearlError: Init function not set");
        }
    }, {
        key: "setState",
        value: function setState(newState) {
            this.history.push(this.state);
            var temp = Object.assign({}, this.state);
            this.state = Object.assign(temp, newState);
            this.update();
        }
    }, {
        key: "subscribe",
        value: function subscribe(callback, field) {
            field = field || null;
            this.subscribers.push({
                callback: callback,
                field: field
            });
            callback(this.state[field] || this.state);
        }
    }, {
        key: "update",
        value: function update() {
            for (var i = 0; i < this.subscribers.length; i++) {
                var field = this.subscribers[i].field || null;
                if (field === null) {
                    this.subscribers[i].callback(this.state);
                } else {
                    if (this.state.hasOwnProperty(field)) {
                        // field must be changed if state includes it now
                        if (this.history.length <= 1) {
                            this.subscribers[i].callback(this.state);
                        } else {
                            // check if state field has changed in history
                            if (this.history[this.history.length - 2][field] !== this.history[this.history.length - 1][field]) {
                                this.subscribers[i].callback(this.state[field]);
                            } else {
                                console.log('state updated but field not changed');
                            }
                        }
                    } else {
                        throw new Error("Field: " + field + " does not exist in state of " + this.constructor.name);
                    }
                }
            }
        }
    }]);

    return Pearl;
}();

exports.default = Pearl;

/***/ })
/******/ ]);