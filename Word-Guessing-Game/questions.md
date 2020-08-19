# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?
    Solution: 1) Static asset are usually plain texts which server cannot change like html, stylesheets etc whereas dynamic assets are assets which keep changes as per requests.
    2) Static assets are focussed on content and styling whereas dynamic assets are related to interactive web pages.
    3) Static assets are plain texts and therefore does not need server to start whereas dynamic assets mainly are server end which need server to be started to show the changes and written usually in scripting languages like Javascript, Java etc.
 

## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?
    Soluton: 1) A relative path in an href refers to the current working directory. Example: ./chat.css
    2) An absolute path refers to a root directory. Example: /css/chat.css
    3) The document root directory is the directry which has the webpages of the application and the location from where our server (for example: localhost) is running.

## Q: What is the difference between server-side and client-side JS?
    Solution: 1) Server-side JS is backend scripting like node js which require server side processing. It helps in building the webpage funcationality whereas client-side JS focuses making the webpage responsive on front end. It does not require processing on the server side and can been seen by the users. 
    2) Examples of Server-side JS are NodeJs and Java whereas examples of Client-side JS are CSS, Javascript and HTML. 
    3) If both are compared server-side JS is more secure than client-side JS.

## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?
    Solution: 1) var is function-scoped, can hoist and can be assigned a value at declerations or even later. 
    2) const is block-scoped, cannot hoist, prevents reassigning and should be given a value at the time of decleration.
    3) let is block-scoped, cannot hoist and mainly used at the time of initialization.

## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)
    Solution: The following are the 4 ways to create inheritence:
    1) Constructor function: By using new keyword on a function call, where the prototype property is assigned to the new object.
    2) Object.create(object): The function gives a new object, where new objects prototype is set to passed object.
    3) ES6 classes: This way makes use of the class syntax to write the reusable classes.		
    4) Brute force prototype: In this type, the objects prototype property is directly set using Object.setPrototypeOf(newObject, object)

## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".
    Solution:   const dog = {
    purr: function () {
    		console.log(`The dog is a ${this.name}`);
    	}
    };

    const dogDetail = Object.create(dog);
    dogDetail.breed = 'Doodle';
    dogDetail.purr();

    Output: The dog is a Doodle

## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".
Solution: const snake = function(name) {
    	this.name = name;
    }

    snake.prototype.hiss = function () {
    	console.log(`The name of snake is ${this.name} and he says hiss`);
    };

    const snaky = new snake(‘Snaky’);
    snaky.hiss();

    Output: The name of snake is Snaky and he says hiss

## Q: Explain what a callback is, and give an example.
    Solution:  A function that can pass to another function as an argument is called as a callback. 
    The primary function then calls the callback function to carry out some sets of action.

    function check(marks, grade, callback) {
   		 return callback(marks, grade);
	}

	function printMarks(marks, garde) {
		return console.log('The marks are'+marks);
	}

	function printGrades(marks, grade) {
		return console.log('The garde is'+garde);
	}
	
	check(98, 'A', printMarks);
	check(84, 'B+', printGrades);


## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is used `callback`, then `this` will not have the expected implicit value"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.
    Solution: The statement "You shouldn't name your classes after what they look like" signify that the name of the class should does not depict what the module looks in webpage of the application. The name of the class should be understanable and should be semantically correct so that the anyone reading the code should be able to decipher what it is meant for. An example of incorrect class name is "temp-display" whereas preferred class name should be "input-display-panel".
