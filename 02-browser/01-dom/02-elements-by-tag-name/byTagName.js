var paragraph = document.querySelector('p');

function byTagName() {
  // Your code here.
}

console.log(byTagName(document.body, 'h1').length);
// → 1
console.log(byTagName(document.body, 'span').length);
// → 3
console.log(byTagName(paragraph, 'span').length);
// → 2

