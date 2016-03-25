var foo = 1;
var bar = foo;
var array = [1, 3, 3];
var i;

if (bar !== undefined && bar !== null) {
  console.log(foo, bar);
}

for (i = 0; i < array.length; i++) {
  console.log(array[i]);
}
