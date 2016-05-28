var MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, country: 'Tanzania' },
  { name: 'Everest', height: 8848, country: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, country: 'Japan' },
  { name: 'Mont Blanc', height: 4808, country: 'Italy/France' },
  { name: 'Vaalserberg', height: 323, country: 'Netherlands' },
  { name: 'Denali', height: 6168, country: 'United States' },
  { name: 'Popocatepetl', height: 5465, country: 'Mexico' }
];
function buildTable(array) {
  var table = document.createElement('table');
  var row = document.createElement('tr');
  var cell;
  var textNode;
  var regularCell;
  var cellContent;
  var columnNames = Object.keys(array[0]);
  columnNames.forEach(function (name) {
    cell = document.createElement('th');
    textNode = document.createTextNode(name);
    cell.appendChild(textNode);
    row.appendChild(cell);
  });
  table.appendChild(row);
  array.forEach(function (rowObject) {
    row = document.createElement('tr');
    columnNames.forEach(function (name) {
      regularCell = document.createElement('td');
      cellContent = rowObject[name];
      textNode = document.createTextNode(cellContent);
      regularCell.appendChild(textNode);
      row.appendChild(regularCell);
      if (typeof cellContent === 'number') {
        regularCell.style.textAlign = 'right';
      }
    });
    table.appendChild(row);
  });
  return table;
}
document.body.appendChild(buildTable(MOUNTAINS));
