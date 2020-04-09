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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/test */ "./src/js/test.js");
/* harmony import */ var _js_test__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_test__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_hamburger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/hamburger */ "./src/js/hamburger.js");
/* harmony import */ var _js_hamburger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_hamburger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_changeLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/changeLink */ "./src/js/changeLink.js");
/* harmony import */ var _js_changeLink__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_changeLink__WEBPACK_IMPORTED_MODULE_2__);




/***/ }),

/***/ "./src/js/changeLink.js":
/*!******************************!*\
  !*** ./src/js/changeLink.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/js/hamburger.js":
/*!*****************************!*\
  !*** ./src/js/hamburger.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

//sript for hamburger
var hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', function () {
  if (hamburger.classList[1] == 'active') {
    hamburger.classList.remove('active');
    hamburger.classList.add('not-active');
    navigation.classList.remove('navigation-active');
  } else {
    hamburger.classList.remove('not-active');
    hamburger.classList.add('active');
    navigation.classList.add('navigation-active');
  }
});

/***/ }),

/***/ "./src/js/test.js":
/*!************************!*\
  !*** ./src/js/test.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

var pageStatus = {
  pageMode: 'train',
  categori: 'Main Page'
};
var imagesMainPage = ['fish.jpg', 'open.jpg', 'fly.jpg', 'open.jpg', 'chicken.jpg', 'bird.jpg', 'blouse.jpg', 'smile.jpg'];
var categories = ['Main Page', 'Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotion'];
var mainImages = document.getElementById('main-images');
var navigation = document.getElementById('navigation'); //script for switcher

var switcher = document.getElementById('myonoffswitch');

var navigationChangeBackground = function navigationChangeBackground() {
  var NavigationClassList = navigation.classList;

  if (NavigationClassList.contains('navigation_train')) {
    NavigationClassList.add('navigation_play');
    NavigationClassList.remove('navigation_train');
  } else {
    NavigationClassList.remove('navigation_play');
    NavigationClassList.add('navigation_train');
  }
};

var changeCardsBackground = function changeCardsBackground(element) {
  if (pageStatus.pageMode === 'train') {
    element.classList.remove('main-card_train');
    element.classList.add('main-card_play');
  } else {
    element.classList.remove('main-card_play');
    element.classList.add('main-card_train');
  }
};

var changeLinks = function changeLinks(str) {
  var navigationLinks = navigation.querySelectorAll('a');
  navigationLinks.forEach(function (element) {
    if (!element.href.includes('index')) {
      element.href = "".concat(str, ".html");
    }
  });
};

var changePageMode = function changePageMode(mode) {
  if (mode) {
    pageStatus.pageMode = 'train';
    changeLinks('train');
  } else {
    pageStatus.pageMode = 'play';
    changeLinks('play');
  }
};

var modeSwitch = function modeSwitch(mode) {
  navigationChangeBackground();
  var cards = mainImages.querySelectorAll('.main-card');
  cards.forEach(function (element) {
    changeCardsBackground(element);
  });
  changePageMode(mode);
};

switcher.addEventListener('click', function () {
  modeSwitch(event.target.checked);
}); //create card for main-page

var createCardText = function createCardText(card, index) {
  var text = document.createElement('p');
  card.append(text);
  text.textContent = "".concat(categories[index]);
};

var createCard = function createCard(element, typeCard, index) {
  var card = document.createElement('a');
  card.className = 'main-card';
  card.classList.add('main-card_train');
  mainImages.append(card);
  createCardImage(element, card);
  createCardText(card, index);
};

var createCardImage = function createCardImage(element, card) {
  var image = document.createElement('img');
  image.src = "/src/assets/img/".concat(element);
  card.append(image);
};

var addCards = function addCards(array, typeCard, mode) {
  var index = 1;
  array.forEach(function (element) {
    createCard(element, typeCard, index, mode);
    index += 1;
  });
};

window.onload = function () {
  addCards(imagesMainPage);
};

/***/ }),

/***/ "./src/sass/style.scss":
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi ./src/index.js ./src/sass/style.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/index.js */"./src/index.js");
module.exports = __webpack_require__(/*! ./src/sass/style.scss */"./src/sass/style.scss");


/***/ })

/******/ });
//# sourceMappingURL=script.js.map