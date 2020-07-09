'use strict';

import {
    getFetchHomePage,
    getFetchLogIn,
    getFetchLoginPage,
    getFetchNewRecipe,
    getFetchRecipeDetails,
    getFetchLogout,
    getFetchRecipe,

} from './services';

const errorMessage = {
    'bad-login': 'Bad Login! Please enter valid username.',
    'illegal-user':'Unauthorize Access! Please enter credentials. ',
    'default': 'Oops, something went wrong. Please try again!!!',
    'network-error': 'Error connecting to the network, please try again!!!',
    'mandatory-field': '** Please fill in all the fields.'
};

const recipeList = document.querySelector('.recipes');
const headerContainer = document.querySelector('.header-panel');
const status = document.querySelector('.status');
const homeButton = document.querySelector('.home');
const dispContainer = document.querySelector('.container-panel');

const headerPanelState = {
    isAddRecipe : false,
};

const userLoginState = {
    loggedInFlag : false,
    user : "default",
};

function getErrorStatus(err){
    status.innerHTML = errorMessage[err.code] || errorMessage.default;
};

function displayRecipeList(recipelist){
    resetContainer();
    const recipes = Object.keys(recipelist).map(
    (key) => {
    return`
        <li>
            <span data-id="${key}" class="recipe-list">${recipelist[key].title}</span>
            <span data-id="${key}">| By: ${recipelist[key].author}</span>
        </li>`;
    }).join('\n');

    recipeList.innerHTML = recipes;
};

function resetContainer(){
    dispContainer.innerHTML = " ";
    dispContainer.append(status);
    dispContainer.append(recipeList);
};

function displayLoginPage(){
    if(!userLoginState.loggedInFlag){
        headerContainer.innerHTML = `
        <input type="text" name="text" class="username" placeholder="Enter Username" >
        <button class="submit">Submit</button>
        `;
        headerContainer.append(homeButton);
        dispContainer.innerHTML = "";
        dispContainer.append(status);
    }  
};

function displayHeader(){
    if(userLoginState.loggedInFlag){
        headerContainer.innerHTML = `
        <div class="welcome">
        <span class="logged-user">WELCOME ${userLoginState.user}! ADD YOUR RECIPES NOW!! </span>
        </div>
        <button class="add-recipe ${headerPanelState.isAddRecipe ? 'visible' : ''}">Add Recipe</button>
        <button class="logout">Logout</button>
        `;
    }else{
        headerContainer.innerHTML = `
            <button class="login">Login</button>
        `;
    }
    headerContainer.append(homeButton);
    resetContainer();
};

function displayAddRecipe(){
    if(userLoginState.loggedInFlag){
        dispContainer.innerHTML = `
            <input type="text" class="recipe-title" placeholder="Add Recipe Title">
            <div><textarea class="ingredients" cols="40" rows="14" placeholder="Add Ingredients"></textarea></div>
            <div><textarea class="instructions" cols="40" rows="14"placeholder="Add Instructions"></textarea></div>
            <div><button class="submit-recipe">Submit Recipe</button></div>
        `;
        dispContainer.append(status);
    }
};

function renderRecipe(recipe){
    dispContainer.innerHTML = `
        <div><span class="display-title">${recipe.title}</span></div>
        <div><span class="display-author">Recipe by: ${recipe.author}</span></div>
        <div><div class="display-ingredients">Ingredients</div><span class="details-area">${recipe.ingredients}</span></div>
        <div><div class="display-instructions">Instructions</div><span class="details-area">${recipe.instructions}</span></div>
    `;
    dispContainer.append(status);
};

function displayHomePage(data){    
    if(data.uid){
        userLoginState.loggedInFlag = true;
        userLoginState.user = data.username;
    }else{
        userLoginState.loggedInFlag = false;
    }
    resetStatus();
    displayHeader();
    displayRecipeList(data.recipeList);
};

function resetStatus(){
    status.innerHTML="";
};

headerContainer.addEventListener('click', (event) =>{
    if(event.target.classList.contains('login')){
        setUserLogin();
    }

    if(event.target.classList.contains('submit')){
        setUserLoggedInPage();
    }

    if(event.target.classList.contains('logout')){
        setUserLogout();
    }

    if(event.target.classList.contains('home')){
        setMainHomePage();
    }

    if(event.target.classList.contains('add-recipe')){
        getNewRecipePage();
    }
});

dispContainer.addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    event.preventDefault();
    if(event.target.classList.contains('submit-recipe')){
        addNewRecipe();
    }

    if(event.target.classList.contains('recipe-list')){
        showRecipe(id);
    }
});

function showRecipe(id){
    getFetchRecipeDetails(id)
    .then((recipe) => {
        renderRecipe(recipe);
    })
    .catch((err) =>{
        getErrorStatus(err);
    })
};

function addNewRecipe(){
    let title = document.querySelector('.recipe-title').value;
    let ingredients = document.querySelector('.ingredients').value;
    let instructions = document.querySelector('.instructions').value;

    getFetchNewRecipe(title, userLoginState.user, ingredients, instructions)
    .then((id) => {
        showRecipe(id);
    })  
    .catch((err) => {
        getErrorStatus(err);
    })  
};

function getNewRecipePage(){
    getFetchRecipe()
    .then(() => {
        headerPanelState.isAddRecipe = true;
        displayHeader();
        displayAddRecipe();
        headerPanelState.isAddRecipe = false;
    })
    .catch((err) => {
        getErrorStatus(err);
    })
};

function setMainHomePage(){
    getFetchHomePage()
    .then((data) => {
        displayHomePage(data);
    })
    .catch((err) => {
        getErrorStatus(err);
    });
};

function setUserLoggedInPage(){
    const selectedUsername = document.querySelector('.username');
    const username = selectedUsername.value;
    getFetchLogIn(username)
    .then( (collection) => {
        userLoginState.loggedInFlag = true;
        userLoginState.user = username;
        displayHeader();
        displayRecipeList(collection);
        resetStatus();
    })
    .catch( (err) => {
        selectedUsername.value = "";
        getErrorStatus(err);
    });
};

function setUserLogout(){
    getFetchLogout()
    .then((collection) => {
        userLoginState.loggedInFlag = false;
        displayHeader();
        displayRecipeList(collection);
    })
    .catch( (err) => {
        getErrorStatus(err);
    });
};

function setUserLogin(){
    getFetchLoginPage()
    .then(() => {
        displayLoginPage();
    })
    .catch((err) => {
        getErrorStatus(err);
    });
};

getFetchHomePage()
.then((res) => {
    displayHomePage(res);
})
.catch((err) => {
    getErrorStatus(err);
});