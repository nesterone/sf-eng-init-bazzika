define(['amd/B'], function (B) {
  var A = 'Module A (AMD)';

  console.log('Loaded dependency to: ' + B);

  console.log('Loaded: ' + A);

  return A;
});
