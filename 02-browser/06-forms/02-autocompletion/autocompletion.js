// Builds up an array with global variable names, like
// 'alert', 'document', and 'scrollTo'

var terms = [];
for (var name in window){
    terms.push(name);
}

// Your code here.