var B = require('commonjs/B');

var name = 'Module A (CommonJs)';

console.log('Loaded: ' + name);

module.exports.name = name;

module.exports.printFrinendName = function () {
  console.log('My friend name is ' + B.name);
};
