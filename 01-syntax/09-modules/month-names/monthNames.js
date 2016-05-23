/**
 * Created by nesterone on 11/1/15.
 */
var month = (function () {
  var months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return {
    name: function (number) {
      return months[number];
    },
    number: function (monthName) {
      return months.indexOf(monthName);
    }
  };
}());

console.log(month);
