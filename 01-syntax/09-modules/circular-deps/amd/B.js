define(['amd/A'], function (A) {
  var B = 'Module B (AMD)';

  console.log('Loaded: ' + B);

  console.log('Loaded dependency from: ' + B + ' to: ' + A);

  return B;
});
