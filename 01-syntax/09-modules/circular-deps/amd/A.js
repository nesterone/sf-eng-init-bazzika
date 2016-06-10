define(['amd/B'], function (B) {
  var A = 'Module A (AMD)';

  console.log('Loaded: ' + A);

  if (B) {
    console.log('Loaded dependency from: ' + A + ' to: ' + B);
  }

  return A;
});
