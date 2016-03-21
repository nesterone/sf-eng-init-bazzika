# Intro

**[<= Back](../../00-bootcamp/06-our-model-of-collaboration/our-model-of-collaboration.md)**		*	*	*	**[Next =>](../01-language-basics/language-basics.md)**

So, during bootcamp you have to work with javascript even without deep understanding it's parts. Right now it's time to start learn it in details.

### Books for the Course 

1. [Eloquent JavaScript](http://eloquentjavascript.net/)
1. [Speaking JavaScript](http://speakingjs.com/)
1. [JavaScript for Web Developers](https://it-ebooks.info/book/483/)

### Theory

1. [Why JavaScript?](http://speakingjs.com/es5/ch02.html)
1. [Douglas Crockford: Section 8: Programming Style and Your Brain](https://www.youtube.com/watch?v=taaEzHI9xyY) [1:06:45]


To establish code style rules we would follow next coding styleguide:

> Don't try to understand all parts at once, give it a time and use as a reference 

* [AirBnb Javascript Styleguide](https://github.com/airbnb/javascript/tree/master/es5)

To validate our code we would use next JavaScript linter tool: 

* [EsLint](http://eslint.org/docs/about/)

### Setup

#### Install EsLint

Go to root folder of the project and install `npm` modules

```bash
npm install
```

#### Validate your Javascript

To validate your files in terminal run next command

```bash
npm run lint
```

#### Configure IDE

* [Install EsLint Plugin](https://plugins.jetbrains.com/plugin/7494)
* [Use Code Inspector](https://www.jetbrains.com/help/webstorm/2016.1/running-inspections.html?origin=old_help)
* [Exclude 'node_modules/' folder from the scope of the project](https://www.jetbrains.com/help/webstorm/2016.1/configuring-folders-within-a-content-root.html?origin=old_help)

You have to make sure that IDE turned on and grabs `EsLint` project's configuration.
`Code Inspector` allows you to see all `EsLint` concerns in one place 

### Additional

...

### References

> Don't try to read it all at once, bookmark it and use as a reference

1. [AirBnb Styleguide](https://github.com/airbnb/javascript/tree/master/es5)
1. [EsLint Rules](http://eslint.org/docs/rules/)


### Practice

#### Exercise: Fix styling

Copy next code to [codeStyle.js](./codeStyle.js)

```js

var foo = 1,bar = foo;

if (bar) console.log(foo, bar);
  
var array = [1,3,3]
  
for (var i=0; i < array.length, i++)
console.log(arrayp[i])
```

1. run CLI command to get list of errors
2. inspect code in IDE 
    * directly in code editor
    * in code inspector
3. make sure that you understand read about those conferences at `EsLint`
4. List them in with description of why it's important fix them 
 
 > If you don't see a reason behind concern, just say that in description, don't spend a lot of time on research 

**[<= Back](../../00-bootcamp/06-our-model-of-collaboration/our-model-of-collaboration.md)**		*	*	*	**[Next =>](../01-language-basics/language-basics.md)**
