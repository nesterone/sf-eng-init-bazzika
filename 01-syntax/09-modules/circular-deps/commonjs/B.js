var A = require("commonjs/A");

var name = "Module B (CommonJs)";

console.log("Loaded: " + name);

module.exports.name = name;

module.exports.printFrinendName = function () {
    console.log("My friend name is " + A.name);
};