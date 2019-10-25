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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Barrel.js":
/*!***********************!*\
  !*** ./src/Barrel.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Barrel; });
/* harmony import */ var _Bucket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bucket */ "./src/Bucket.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Barrel =
/*#__PURE__*/
function () {
  function Barrel(volume) {
    _classCallCheck(this, Barrel);

    this.fullVolume = 150; // л.

    this.volume = volume; // л.

    this.useVolume = 0;
    this.lostVolume = 0; // л.

    this.bucketCounter = 0;
    this.maxBucketCounter = 9;
    this.bottlingCounter = 0;
    this.error = {
      coefficient: 1
    };
  }

  _createClass(Barrel, [{
    key: "bottling",
    value: function bottling(params) {
      for (var i = 1; this.bucketCounter < 9; i++) {
        this.bottlingCounter++;

        try {
          var bucket = new _Bucket__WEBPACK_IMPORTED_MODULE_0__["default"]();
          var steps = this.paramsHandler(params, bucket); //выполнение этапов налива

          var leftTime = bucket.time;

          for (var j = 0; j < steps.length; j++) {
            //--------------------
            this.errorEmulation(i, j); //--------------------

            if (this.volume < steps[j].volume) {
              bucket.currentVolume += this.volume;
              this.volume -= this.volume;
              break;
            }

            var timeStep = this.coutingTime(steps[j]);

            if (timeStep < leftTime) {
              bucket.currentVolume += steps[j].volume;
              this.volume -= steps[j].volume;
              leftTime -= timeStep;
            } else {
              bucket.currentVolume += steps[j].velocity / this.error.coefficient * leftTime;
              this.volume -= steps[j].velocity / this.error.coefficient * leftTime;
            }
          } //----------------------------------------


          if (bucket.isFull()) {
            this.bucketCounter++;
            console.log("\u041D\u0430\u043B\u0438\u0432 \u2116 ".concat(this.bottlingCounter, " - \u0443\u0441\u043F\u0435\u0448\u043D\u043E"));
          } else {
            if (this.isEmpty()) {
              return bucket;
            }

            if (this.error.coefficient !== 1) {
              this.lostVolume += bucket.currentVolume;
              this.clearErrors();
              throw "\u041D\u0430\u043B\u0438\u0432 \u2116 ".concat(this.bottlingCounter, " - \u0442\u0430\u0439\u043C\u0430\u0443\u0442. \u041D\u0430\u043B\u0438\u0442\u043E ").concat(Object(_util__WEBPACK_IMPORTED_MODULE_1__["roundFloat"])(bucket.currentVolume), " \u043B\u0438\u0442\u0440\u043E\u0432");
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, {
    key: "addToBucket",
    value: function addToBucket(barrel, bucket) {
      barrel.useVolume += bucket.volume - bucket.currentVolume;
      barrel.volume -= bucket.volume - bucket.currentVolume;
      bucket.currentVolume += bucket.volume - bucket.currentVolume;

      if (bucket.isFull()) {
        this.bucketCounter++;
        console.log("\u041D\u0430\u043B\u0438\u0432 \u2116 ".concat(this.bottlingCounter, " - \u0443\u0441\u043F\u0435\u0448\u043D\u043E"));
        return barrel;
      }

      return;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.volume === 0 || this.bucketCounter === this.maxBucketCounter;
    }
  }, {
    key: "coutingTime",
    value: function coutingTime(step) {
      return step.volume / (step.velocity / this.error.coefficient);
    }
  }, {
    key: "paramsHandler",
    value: function paramsHandler(props, bucket) {
      return [{
        volume: props.volume_1,
        velocity: props.velocity_1
      }, {
        volume: props.volume_2,
        velocity: props.velocity_2
      }, {
        volume: bucket.volume - (props.volume_1 + props.volume_2),
        velocity: props.velocity_3
      }];
    }
  }, {
    key: "errorEmulation",
    value: function errorEmulation(i, j) {
      if (i === Math.floor(Math.random() * Math.floor(10)) && j === Math.floor(Math.random() * Math.floor(3))) {
        console.log('Засор в узле налива');
        this.error.coefficient = 3;
      }
    }
  }, {
    key: "clearErrors",
    value: function clearErrors() {
      this.error.coefficient = 1;
    }
  }]);

  return Barrel;
}();



/***/ }),

/***/ "./src/BottlingBox.js":
/*!****************************!*\
  !*** ./src/BottlingBox.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BottlingBox; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var BottlingBox =
/*#__PURE__*/
function () {
  function BottlingBox() {
    var barrels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var params = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, BottlingBox);

    this.barrels = barrels;
    this.params = params;
    this.curentBarrelIndex = 0;
    this.currentBarrel = this.barrels[this.curentBarrelIndex];
  }

  _createClass(BottlingBox, [{
    key: "launch",
    value: function launch() {
      var barrel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentBarrel;
      if (!barrel) return;
      console.log('-------------------------');
      console.log("\u0411\u043E\u0447\u043A\u0430 \u2116 ".concat(this.curentBarrelIndex + 1, " - ").concat(Object(_util__WEBPACK_IMPORTED_MODULE_0__["roundFloat"])(barrel.volume), " \u043B\u0438\u0442\u0440\u043E\u0432."), barrel.useVolume !== 0 ? "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043E:".concat(Object(_util__WEBPACK_IMPORTED_MODULE_0__["roundFloat"])(barrel.useVolume), " \u043B") : '');
      console.log('-------------------------');
      this.curentBarrelIndex++;

      while (!barrel.isEmpty()) {
        var res = barrel.bottling(this.params); //не заполненое ведро

        if (res !== undefined) {
          this.nextBarrel();
          var newBarrel = this.currentBarrel;

          if (newBarrel) {
            newBarrel = barrel.addToBucket(newBarrel, res);
            this.info(barrel);
            this.launch(newBarrel);
            return;
          }
        }
      }

      this.nextBarrel();
      this.info(barrel);

      if (this.currentBarrel !== undefined) {
        this.launch();
      }
    }
  }, {
    key: "nextBarrel",
    value: function nextBarrel() {
      this.currentBarrel = this.barrels[this.curentBarrelIndex];
    }
  }, {
    key: "info",
    value: function info(barrel) {
      console.log("\u0411\u043E\u0447\u043A\u0430 \u2116 ".concat(this.curentBarrelIndex, " - \u041D\u0430\u043B\u0438\u0442\u043E \u0443\u0441\u043F\u0435\u0448\u043D\u043E: ").concat(barrel.bucketCounter, ". \u041F\u0440\u043E\u0432\u0430\u043B\u044C\u043D\u044B\u0439 \u043D\u0430\u043B\u0438\u0432: ").concat(Object(_util__WEBPACK_IMPORTED_MODULE_0__["roundFloat"])(barrel.lostVolume), " \u043B\u0438\u0442\u0440\u043E\u0432. "));
    }
  }]);

  return BottlingBox;
}();



/***/ }),

/***/ "./src/Bucket.js":
/*!***********************!*\
  !*** ./src/Bucket.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bucket =
/*#__PURE__*/
function () {
  function Bucket() {
    _classCallCheck(this, Bucket);

    this.volume = 15; // л.

    this.currentVolume = 0;
    this.time = 10; // время за которое необходимо заполнить ведро (с)
  }

  _createClass(Bucket, [{
    key: "isFull",
    value: function isFull() {
      return this.currentVolume === this.volume;
    }
  }]);

  return Bucket;
}();

/* harmony default export */ __webpack_exports__["default"] = (Bucket);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Barrel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Barrel */ "./src/Barrel.js");
/* harmony import */ var _BottlingBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BottlingBox */ "./src/BottlingBox.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util/index.js");



var N = 2; //количество бочек

var params = {
  volume_1: 6,
  // объем заполнения 1 этапа (л) 
  volume_2: 3,
  // объем заполнения 2 этапа (л) 
  velocity_1: 2,
  // скорость заполнения 1 этапа (л/c) 
  velocity_2: 2,
  // скорость заполнения 2 этапа (л/c) 
  velocity_3: 2 // скорость заполнения 3 этапа (л/c) 

};

var barrels = function (countBarrels) {
  var barrels = [];

  while (countBarrels !== 0) {
    barrels.push(new _Barrel__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_util__WEBPACK_IMPORTED_MODULE_2__["randomNum"])(135, 140)));
    countBarrels--;
  }

  return barrels;
}(N);

var bottlingBox = new _BottlingBox__WEBPACK_IMPORTED_MODULE_1__["default"](barrels, params);
bottlingBox.launch();

/***/ }),

/***/ "./src/util/index.js":
/*!***************************!*\
  !*** ./src/util/index.js ***!
  \***************************/
/*! exports provided: randomNum, roundFloat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomNum", function() { return randomNum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundFloat", function() { return roundFloat; });
function randomNum(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
function roundFloat(num) {
  return parseFloat(num.toFixed(1));
}

/***/ })

/******/ });
//# sourceMappingURL=build.js.map