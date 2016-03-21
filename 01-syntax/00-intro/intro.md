# Intro

**[<= Back](../../00-bootcamp/06-our-model-of-collaboration/our-model-of-collaboration.md)**		*	*	*	**[Next =>](../01-language-basics/language-basics.md)**

So, during bootcamp you have to work with javascript even without deep understanding it's parts. Right now it's time to start learn it in details.

### Books for the Course 

1. [Eloquent JavaScript](http://eloquentjavascript.net/)
1. [Speaking JavaScript](http://speakingjs.com/)
1. [JavaScript for Web Developers](https://it-ebooks.info/book/483/)

### Theory

1. [Speaking JavaScript: Why JavaScript?](http://speakingjs.com/es5/ch02.html)
1. [Eloquent JavaScript: Introduction](http://eloquentjavascript.net/00_intro.html)
1. [Speaking JavaScript: A Meta Code Style Guide](http://speakingjs.com/es5/ch26.html)

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
    * `Code Inspector` allows you to see all `EsLint` concerns in one place 
* [Exclude 'node_modules/' folder from the scope of the project](https://www.jetbrains.com/help/webstorm/2016.1/configuring-folders-within-a-content-root.html?origin=old_help)

You have to make sure that linter is turned on in your IDE and grabs `EsLint` project's configuration.


### Additional

1. JavaScript for Web Developers: What Is JavaScript
1. JavaScript for Web Developers: Javascript in HTML
1. [Douglas Crockford: Section 8: Programming Style and Your Brain](https://www.youtube.com/watch?v=taaEzHI9xyY) [1:06:45]
1. [Popular Coding Convention on Github](http://sideeffect.kr/popularconvention/#javascript)


### References

> Don't try to read it all at once, bookmark it and use as a reference

1. [AirBnb Styleguide](https://github.com/airbnb/javascript/tree/master/es5)
1. [EsLint Rules](http://eslint.org/docs/rules/)


### Practice

#### Exercise: Fix code styling issues

Copy next code to [codeStyle.js](./codeStyle.js)

```js

var foo = 1,bar = foo;

if (bar) console.log(foo, bar);
  
var array = [1,3,3]
  
for (var i=0; i < array.length, i++)
console.log(arrayp[i])
```

1. Run CLI command to get list of errors
2. inspect code in IDE 
    * directly in code editor
    * in code inspector
3. Make sure that you read about those concerns at `EsLint` documentation
4. List them in your issue with description of why it's important to fix them 
 
 > If you don't see a reason behind concern, just say that in description, don't spend a lot of time on research 

**[<= Back](../../00-bootcamp/06-our-model-of-collaboration/our-model-of-collaboration.md)**		*	*	*	**[Next =>](../01-language-basics/language-basics.md)**
