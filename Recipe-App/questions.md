# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.
  Solution: (1) URL should represent a resource signifies that the recources should be usually nouns and properly named which can be easily understood and deciphered by the users. (2) At times, if the URL is not well named, it can be misleading at times.
  Example: http://university.com/AddStudent.html
  Firstly, the above URL has poorly named recource. AddStudent signifies an action and not a individual identity noun.
  Secondly, file extensions can be omitted and should be in lower case as well.
  Lastly, the URL can be modified as: http://university.com/students since the resource indicates a noun and is well-formed.

## Q2: If the service returns the username as a plain text string, what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```
 Solution: fetch returns a promise afterwhich  it is then resolved to a object that is response. Since it returns an object, to get required data from that object, we need body and should be parsed. Further, to get the data from the response we can use response.text()
 - In the example, the fetch returns a promise therefore it will not print the username.
 - The above function should be modified as follows where the fetch returns a promise which is a reponse object thereby parsed into text so as to print it in console.log():
 ```
    fetch('/username')
    .then(response => response.text())
    .then((username) => {
        console.log(`user is named ${username}`);
    }) 
```  

## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?
Solution: "store your state in the DOM" means that storing and changing the values of an attribute in the input fields of a form. With this we are making use of the form elements as storage from which we retrieve the data. For example if student enters its name in a input field of a form and hit a submit button, the values uses form fields as storage therefore limiting one handler per event. This practice is acceptable for small application with one or two forms but not suitable for complex applications which may contain several forms with multiple input fields. It can get tedious in managing the state of the application and make it more complex and inconvenient to manage.


## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.
Solution: The following are the differences between single page web application (SPA) and multiple page web application (MPA):
(1) SPA is fact as all the elements are loaded only and there is only trasnmission of data whereas in MPA all the resources are loaded compeletely all over again at the time of jumping from one page to other thereby making it slow and complex.
(2) SPA has cross origin resource sharing making it less secure than MPS.
(3) SPA does not require page reloads as it functions inside a browser whereas MPA requires frequent page reloads.
(4) SPA are easy to develop than MPA as there are many dependencies i.e tight coupled and making changes in one portion becomes a tedious task.
(5) For MPA every change requires rendering a page whereas for SPA, the static content (like html, css) and data are called independently and page rendering happens when requested directly in the browser.


## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?
Solution: Progressive enhancement is an idea which refers at taking the original multiple page web application and adding JavaScript to add single page application functionality to it. In Progressive enchancement, developers focus on important content and core functionality to all users and at the same time delivering new advance features to users having modern browsers supporting javascript. 
  (1) In SPA that does not use Progressive Enhancement, the application is running on supporting browser and does not provide fallback functionality. (2) SPA that uses progressive enhancement gives us the advantage of fallback functionality. Incase the referenced scripts in our markup code fails to load due to network issue, progressive enhancement will still show important content until the referenced scripts are loaded.


## Q6: Explain how a REST service is or is not similar to a dynamic asset.
Solution: REST services can be termed as services that help create RESTful services using client-server architecture. REST service has a URL as a resource as explained to interact, a HTTP method can be called as interaction with the resource and HTTP Status code is the result of that interaction. And thereby, are not dynamic assets but REST services can be used to achieve dynamic assets.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.
Solution: Any confidential data like account number, credit card number or password should not be stored in a cookie, its a security breach and that information can get misused if leaked out. Instead, of that we can store an unique ID in cookies which refers to the confidential data which a cookie cannot hold.

## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data
Solution: We should use seperation of concerns to manage our code and data wherein module should only be responsible of doing one thing.
For example if a function is fetching data it should handle only fetching and call another function which is responsible for 'wat you do with the data' might be to render the data. This helps in easy management of code with easy readability and reducing its complexity when changes needs to be introduced in the code. Code interdependency reduces making it loosely coupled and increases code resuability.

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
Solution: (1) The try/catch block goes well with synchronous functions.
(2) Asynchronous errors happens from the function which are asynchronous in nature.   
(3) An asynchronous function is implemneted when the callback is occured by the host.
(4) So in a scenario where the page loads, the function is initalized and then when the callback happens the event occurs and in this case if try/catch is being used, the function loads before without erros and when the error happens nothing is caught in the try catch block.

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.
Solution: Separation of concerns is a issue which applies to both front end and server side. 
Example: In case of server-side JS, the get method is gets the list of all the recepies and in case of the delete method it access usersList objcet which is maintained in a different file (user-details) responsible for handling user data. This demonstrates seperation of code.

Server-side
```
const userData = require('./user-details');

app.get('/session', (req, res) => {
    res.json(collection.recipes);
 });       

app.delete('/session', (req,res) =>{
      const uid = req.cookies.uid;
      if(!uid) {
         res.status(401).json({code : 'unauthorize'});
         return;
      }
      delete userData.usersList[uid];
      res.clearCookie('uid');
      res.json(collection.recipes);
  });
```
In case of client side JS, the fetch method referes to the get method in server.js and is responsible for getting the data and nothing else. Whereas the function refeshContainer() deals with setting the HTML and appending it to the body. Both functions have its own functioning and can be modified easily if any chages needs to be done.

```                                       
function refreshContainer(){
    container.innerHTML = " ";
    container.append(status);
    container.append(recipeList);
};                                        
                                          
fetch('/home', {
      method: 'GET',
    })
    .catch( () => {
      return Promise.reject({code: 'network-error'});
    })
    .then((convertError));
```



