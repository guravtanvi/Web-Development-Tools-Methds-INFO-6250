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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/recipe-app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/recipe-app.js":
/*!***************************!*\
  !*** ./src/recipe-app.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");



var errorMessage = {
  'bad-login': 'Bad Login! Please enter valid username.',
  'illegal-user': 'Unauthorize Access! Please enter credentials. ',
  'default': 'Oops, something went wrong. Please try again!!!',
  'network-error': 'Error connecting to the network, please try again!!!',
  'mandatory-field': '** Please fill in all the fields.'
};
var recipeList = document.querySelector('.recipes');
var headerContainer = document.querySelector('.header-panel');
var status = document.querySelector('.status');
var homeButton = document.querySelector('.home');
var dispContainer = document.querySelector('.container-panel');
var headerPanelState = {
  isAddRecipe: false
};
var userLoginState = {
  loggedInFlag: false,
  user: "default"
};

function getErrorStatus(err) {
  status.innerHTML = errorMessage[err.code] || errorMessage["default"];
}

;

function displayRecipeList(recipelist) {
  resetContainer();
  var recipes = Object.keys(recipelist).map(function (key) {
    return "\n        <li>\n            <span data-id=\"".concat(key, "\" class=\"recipe-list\">").concat(recipelist[key].title, "</span>\n            <span data-id=\"").concat(key, "\">| By: ").concat(recipelist[key].author, "</span>\n        </li>");
  }).join('\n');
  recipeList.innerHTML = recipes;
}

;

function resetContainer() {
  dispContainer.innerHTML = " ";
  dispContainer.append(status);
  dispContainer.append(recipeList);
}

;

function displayLoginPage() {
  if (!userLoginState.loggedInFlag) {
    headerContainer.innerHTML = "\n        <input type=\"text\" name=\"text\" class=\"username\" placeholder=\"Enter Username\" >\n        <button class=\"submit\">Submit</button>\n        ";
    headerContainer.append(homeButton);
    dispContainer.innerHTML = "";
    dispContainer.append(status);
  }
}

;

function displayHeader() {
  if (userLoginState.loggedInFlag) {
    headerContainer.innerHTML = "\n        <div class=\"welcome\">\n        <span class=\"logged-user\">WELCOME ".concat(userLoginState.user, "! ADD YOUR RECIPES NOW!! </span>\n        </div>\n        <button class=\"add-recipe ").concat(headerPanelState.isAddRecipe ? 'visible' : '', "\">Add Recipe</button>\n        <button class=\"logout\">Logout</button>\n        ");
  } else {
    headerContainer.innerHTML = "\n            <button class=\"login\">Login</button>\n        ";
  }

  headerContainer.append(homeButton);
  resetContainer();
}

;

function displayAddRecipe() {
  if (userLoginState.loggedInFlag) {
    dispContainer.innerHTML = "\n            <input type=\"text\" class=\"recipe-title\" placeholder=\"Add Recipe Title\">\n            <div><textarea class=\"ingredients\" cols=\"40\" rows=\"14\" placeholder=\"Add Ingredients\"></textarea></div>\n            <div><textarea class=\"instructions\" cols=\"40\" rows=\"14\"placeholder=\"Add Instructions\"></textarea></div>\n            <div><button class=\"submit-recipe\">Submit Recipe</button></div>\n        ";
    dispContainer.append(status);
  }
}

;

function renderRecipe(recipe) {
  dispContainer.innerHTML = "\n        <div><span class=\"display-title\">".concat(recipe.title, "</span></div>\n        <div><span class=\"display-author\">Recipe by: ").concat(recipe.author, "</span></div>\n        <div><div class=\"display-ingredients\">Ingredients</div><span class=\"details-area\">").concat(recipe.ingredients, "</span></div>\n        <div><div class=\"display-instructions\">Instructions</div><span class=\"details-area\">").concat(recipe.instructions, "</span></div>\n    ");
  dispContainer.append(status);
}

;

function displayHomePage(data) {
  if (data.uid) {
    userLoginState.loggedInFlag = true;
    userLoginState.user = data.username;
  } else {
    userLoginState.loggedInFlag = false;
  }

  resetStatus();
  displayHeader();
  displayRecipeList(data.recipeList);
}

;

function resetStatus() {
  status.innerHTML = "";
}

;
headerContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('login')) {
    setUserLogin();
  }

  if (event.target.classList.contains('submit')) {
    setUserLoggedInPage();
  }

  if (event.target.classList.contains('logout')) {
    setUserLogout();
  }

  if (event.target.classList.contains('home')) {
    setMainHomePage();
  }

  if (event.target.classList.contains('add-recipe')) {
    getNewRecipePage();
  }
});
dispContainer.addEventListener('click', function (event) {
  var id = event.target.dataset.id;
  event.preventDefault();

  if (event.target.classList.contains('submit-recipe')) {
    addNewRecipe();
  }

  if (event.target.classList.contains('recipe-list')) {
    showRecipe(id);
  }
});

function showRecipe(id) {
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["getFetchRecipeDetails"])(id).then(function (recipe) {
    renderRecipe(recipe);
  })["catch"](function (err) {
    getErrorStatus(err);
  });
}

;

function addNewRecipe() {
  var title = document.querySelector('.recipe-title').value;
  var ingredients = document.querySelector('.ingredients').value;
  var instructions = document.querySelector('.instructions').value;
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["getFetchNewRecipe"])(title, userLoginState.user, ingredients, instructions).then(function (id) {
    showRecipe(id);
  })["catch"](function (err) {
    getErrorStatus(err);
  });
}

;

function getNewRecipePage() {
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["getFetchRecipe"])().then(function () {
    headerPanelState.isAddRecipe = true;
    displayHeader();
    displayAddRecipe();
    headerPanelState.isAddRecipe = false;
  })["catch"](function (err) {
    getErrorStatus(err);
  });
}

;

function setMainHomePage() {
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["getFetchHomePage"])().then(function (data) {
    displayHomePage(data);
  })["catch"](function (err) {
    getErrorStatus(err);
  });
}

;

function setUserLoggedInPage() {
  var selectedUsername = document.querySelector('.username');
  var username = selectedUsername.value;
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["getFetchLogIn"])(username).then(function (collection) {
    userLoginState.loggedInFlag = true;
    userLoginState.user = username;
    displayHeader();
    displayRecipeList(collection);
    resetStatus();
  })["catch"](function (err) {
    selectedUsername.value = "";
    getErrorStatus(err);
  });
}

;

function setUserLogout() {
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["getFetchLogout"])().then(function (collection) {
    userLoginState.loggedInFlag = false;
    displayHeader();
    displayRecipeList(collection);
  })["catch"](function (err) {
    getErrorStatus(err);
  });
}

;

function setUserLogin() {
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["getFetchLoginPage"])().then(function () {
    displayLoginPage();
  })["catch"](function (err) {
    getErrorStatus(err);
  });
}

;
Object(_services__WEBPACK_IMPORTED_MODULE_0__["getFetchHomePage"])().then(function (res) {
  displayHomePage(res);
})["catch"](function (err) {
  getErrorStatus(err);
});

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! exports provided: getFetchHomePage, getFetchLoginPage, getFetchLogIn, getFetchLogout, getFetchRecipe, getFetchNewRecipe, getFetchRecipeDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFetchHomePage", function() { return getFetchHomePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFetchLoginPage", function() { return getFetchLoginPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFetchLogIn", function() { return getFetchLogIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFetchLogout", function() { return getFetchLogout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFetchRecipe", function() { return getFetchRecipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFetchNewRecipe", function() { return getFetchNewRecipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFetchRecipeDetails", function() { return getFetchRecipeDetails; });
var getFetchHomePage = function getFetchHomePage() {
  return fetch('/home', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(getErrorMessage);
};
var getFetchLoginPage = function getFetchLoginPage() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(getErrorMessage);
};
var getFetchLogIn = function getFetchLogIn(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(getErrorMessage);
};
var getFetchLogout = function getFetchLogout() {
  return fetch('/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(getErrorMessage);
};
var getFetchRecipe = function getFetchRecipe() {
  return fetch('/recipe', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(getErrorMessage);
};
var getFetchNewRecipe = function getFetchNewRecipe(title, author, ingredients, instructions) {
  return fetch('/recipe', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      title: title,
      author: author,
      ingredients: ingredients,
      instructions: instructions
    })
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(getErrorMessage);
};
var getFetchRecipeDetails = function getFetchRecipeDetails(id) {
  return fetch("/info/".concat(id), {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(getErrorMessage);
};

function getErrorMessage(response) {
  if (!response.ok) {
    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  }

  return response.json();
}

;

/***/ })

/******/ });
//# sourceMappingURL=recipe-app.js.map