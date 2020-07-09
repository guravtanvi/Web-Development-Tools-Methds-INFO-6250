export const getFetchHomePage = () => {
    return fetch('/home', {
        method: 'GET',
      })
      .catch( () => {
        return Promise.reject({code: 'network-error'});
      })
      .then( (getErrorMessage));
};

export const getFetchLoginPage = () => {
    return fetch('/session', {
        method: 'GET',
      })
      .catch( () => {
        return Promise.reject({code: 'network-error'});
      })
      .then( (getErrorMessage));
};

export const getFetchLogIn = (username) => {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
        'content-type': 'application/json',
        }),
        body: JSON.stringify({ username }),
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (getErrorMessage)) 
};

export const getFetchLogout = () => {
    return fetch('/session', {
        method : 'DELETE',
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (getErrorMessage))      
};

export const getFetchRecipe = () => {
    return fetch('/recipe', {
        method : 'GET',
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (getErrorMessage))   
};

export const getFetchNewRecipe = (title, author, ingredients, instructions) => {
    return fetch('/recipe', {
        method: 'POST',
        headers: new Headers({
        'content-type': 'application/json',
        }),
        body: JSON.stringify({ title, author, ingredients, instructions }),
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (getErrorMessage)) 
};

export const getFetchRecipeDetails = (id) => {
    return fetch(`/info/${id}`, {
        method : 'GET',
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (getErrorMessage))
};

function getErrorMessage(response){
    if(!response.ok) {
        return response.json().then( err => Promise.reject(err) );
    }
    return response.json();
}; 