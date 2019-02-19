# JavaScript
  
Javascript is a lightweight, cross-platform, object-oriented computer programming language

Java script is one of the three core technologies of web development

Client side: traditionally used
Server side: possible due to nodeJS

React and Angular are 100% based on Javascript.
Hence, you need to learn javascript in order to use them.


## JavaScript Language Basics
Variable : a piece of memory which stores data 
- Number
- String
- Boolean : true or false 
- Undefinded : does not have a value yet
- Null : non existent 
```javascript
var firstName = 'John'; // String 
console.log(firstName);

var age = 18; // Number
var isYoung = true; // Boolean 
var job;   
console.log(job); // Undefined 
```


## Functions 
```javascript
function calculateAge(birthYear){
    return 2019 - birthYear;
}
var myAge = caculcateAge(1997);
// 1990 is taken as birthYear in calculateAge function. and the result will be stored in age variable. 
```


## Arrays
collections of variables.
```javascript
var names = ['Se Jin', 'Ye Jin', 'Yu Jin']; // element starts from 0 index.  
var years = new Array(1997,1993, 1987); // not used as much.

// how to access elements
console.log(names[0]); // outputs Se Jin
// how to mutate
names[names.length] = 'Soo Ryong"; 

// Different data types
var sejin = ['Se Jin', 'Lee', 1997, 'gamer', true];
sejin.push('yellow');  // add new element to the end of the element in the end
sejin.unshift('Ms.'); // add new element to the array in the front 
sejin.pop(); // removes the element in the end 
sejin.shift() // removes the element in the front 

sejin.indexOf(1997); // returns the position of the element. returns -1 if not there.

var isGamer = sejin.indexOf('gamer') === -1 ? 'SeJin is not a gamer ' : ' SeJin is a gamer';
console.log(isGamer); 
```

## Objects and properties

``` javascript


```
