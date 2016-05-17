function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source === '...') return;
  yes.forEach(function (s) {
    if (!regexp.test(s)) {
      console.log("Failure to match '" + s + "'");
    }
  });
  no.forEach(function (s) {
    if (regexp.test(s)) {
      console.log("Unexpected match for '" + s + "'");
    }
  });
}
// Fill in the regular expressions
verify(/ca[rt]/,
  ['my car', 'bad cats'],
  ['camper', 'high art']);
verify(/p?op/,
  ['pop culture', 'mad props'],
  ['plop']);
verify(/fer(ret|ry|rari|rum)/,
  ['ferret', 'ferry', 'ferrari'],
  ['ferrum', 'transfer A']);
verify(/i?ous\w/,
  ['how delicious', 'spacious room'],
  ['ruinous', 'consciousness']);
verify(/\./,
  ['bad punctuation .'],
  ['escape the dot']);
verify(/\b{,7}\w\b/,
  ['hottentottententen'],
  ['no', 'hotten totten tenten']);
verify(/\b[^e\s]+\b]/,
  ['red platypus', 'wobbling nest'],
  ['earth bed', 'learning ape']);

