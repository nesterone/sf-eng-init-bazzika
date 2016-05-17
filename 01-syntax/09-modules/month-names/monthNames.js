/**
 * Created by nesterone on 11/1/15.
 */

var month = (function () {
  var names = ['January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'];

  if (!month) {
    return {
      name: function (number) {
        return names[number];
      },
      number: function (name) {
        return names.indexOf(name);
      }
    };
  }
  return undefined;
}());
