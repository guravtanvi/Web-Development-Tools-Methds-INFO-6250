(function iife(){

    const addItem = document.querySelector('.item-name');
    const addbtn = document.querySelector('.add-button');
    const status = document.querySelector('.status-panel');
    const list = document.querySelector('.items');
    const dispContainer = document.querySelector('.display-panel');
    
const errorCodes = {
    'duplicate-item': 'Item already exists in the inventory! Enter a new item.',
    'network-error': 'Error connecting to the network!',
    'item-required' : 'Please enter a valid item name!',
    'bad-login' : 'Bad Login! Please enter valid name!',
    'default' : 'Oops! There was a problem, please try again.',
    'item-does-not-exists' : 'Entered item is not longer available in the inventory.',
    'login-unauthorize':'Unauthorize Access! Please login to use application. ',
  };

function showError(response) {
    if(response.ok) {
        return response.json();
    } else if(response.status === 401){
        renderingLogin();
    }
    return response.json().then( error => Promise.reject(error) );
}



const getStatus = ( error ) => {
    status.innerText = errorCodes[error.code] || errorCodes.default;
}


const refreshStatus = (message) =>{
    if(message){
        status.innerHTML = message;
    }else{
        status.innerHTML = "";
    }        
}

fetch('/mainPage', {
    method : 'GET',
    }).catch( () => Promise.reject( { error: 'network-error' }) )
    .then( () => {
        if(document.cookie === ""){
            return getloginPage();
        }
        else{
            renderingInventory();
        }
    })
    .catch( error => {
        getStatus(error);
});

function getloginPage(){
    fetch('/session', {
        method : 'GET',
    }).catch( (err) => Promise.reject( {
        code : 'network-error',
        error: err }) )
    .then(() => {
        renderingLogin();        
    })
    .catch( err => {
        getStatus(err);
    })
}

function setloginPage(){
    const name = document.querySelector('.add-name').value;
    fetch(`/session/${name}`, {
            method : 'POST',
        }).catch( (error) => Promise.reject( { 
            code : 'network-error',
            error: error }) )
        .then(showError)
        .then(() => {
            renderingInventory();  
        })
        .catch( error => {
            getStatus(error);
        })
}

function logoutPage(){
    fetch('/session', {
        method : 'DELETE',
    }).catch( () => Promise.reject( { error: 'network-error' }) )
    .then(showError)
    .then(() => {
        getloginPage();
    })
    .catch( error => {
        getStatus(error);
    })
}

function renderingLogin(message){
    dispContainer.innerHTML = `<div class=login>
        <input class="add-name" name="text" type="text" placeholder="Enter Username">
        <button class="login-button">Login</button>
        </div>
    `;

    dispContainer.append(status);
    refreshStatus(message);
}

function renderingInventory(){
    fetch('/items', {
        method: 'GET',
    }).catch( () => Promise.reject( {
        code: 'network-error',
        error : err,
    }) )
    .then(showError)
    .then((items) => {
        getInventoryPage(items);
    }) 
    .catch( err => {
        getStatus(err);
    })   
}

function addNewItem(itemName){
    fetch('/items', {
        method: 'POST',
        body : JSON.stringify({name: itemName, quantity: 0}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch( () => Promise.reject( { 
        code : 'network-error',
        error: err }) )
    .then(showError)        
    .then(items => {
        getItemList(items);
    })   
    .catch( err => {
        getStatus(err);
    })
}

function updateItem(itemId, count){
    fetch(`/items/${itemId}`, {
        method: 'PATCH',
        body : JSON.stringify({quantity: count}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch( () => Promise.reject( { 
        code: 'network-error',
        error : err,
    }) )
    .then(showError)
    .then(items => {
        getItemList(items);
    })
    .catch( err => {
        if(err.items){
            getItemList(err.items);
        } 
        getStatus(err);
    })
}

function removeItem(itemId){
    fetch(`/items/${itemId}`,{
        method: 'DELETE'
    }).catch( () => Promise.reject( { 
        code: 'network-error',
        error : err,
    }) )
    .then(showError)
    .then(items => {
        getItemList(items);
    })
    .catch( err => {
        if(err.items){
            getItemList(err.items);
        }        
        getStatus(err);
    })
}

function getInventoryPage(items){
    list.innerHTML = "Loading";

    dispContainer.innerHTML = `
        <div class=logout>
         <button class="logout-button">Logout</button>
       </div>
    `;

    dispContainer.append(addItem);
    dispContainer.append(addbtn);  
    dispContainer.append(status);
    dispContainer.append(list);
    
    
    getItemList(items);    
    refreshStatus("");
}

function getItemList(items){
    
    const inventoryList = Object.keys(items).map(
        (key) => {
        return`
            <li>
            <button data-id="${key}" class="delete">X</button>
            <button data-id="${key}" class="update-item">Update</button>
            <input data-id="${key}" class="quantity" value=${items[key].quantity}>
            <span data-id="${key}" class="li-item">${items[key].name}</span>
            </li>
            `;
      }).join('');
      
    list.innerHTML = inventoryList;
    refreshStatus("");
}



dispContainer.addEventListener('click', (event)=> {
    if(event.target.classList.contains('login-button')){
        setloginPage();
    }

    if(event.target.classList.contains('logout-button')){
        logoutPage();
    }

    if(event.target.classList.contains('add-button')){
        addNewItem(addItem.value);
        addItem.value = '';
        addbtn.disabled = true;
    }
});


list.addEventListener('click', function (event) {    
    const itemId = event.target.dataset.id;
    if(event.target.classList.contains('delete')) {
        removeItem(itemId);
    }

    if(event.target.classList.contains('update-item')){
        let quantityList = document.querySelectorAll('.quantity');
        let quantity = getQuantityData(quantityList, itemId);
        updateItem(itemId, quantity);
    }  
  });


function getQuantityData(quantityList, itemId){
    for(let q of quantityList){
        if(q.dataset.id === itemId){
            return q.value;
        }
    }
}

addItem.addEventListener('keyup', function (event) {
    const text = event.target.value;
    addbtn.disabled = !text;
});


addbtn.disabled = true;

})();