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
  var i;
  var j;
  var cell;
  var header;
  var textNode;
  var regularCell;
  var cellContent;
  for (i = 0; i <= 2; i++) {
    cell = document.createElement('th');
    header = Object.keys(array[0])[i];
    textNode = document.createTextNode(header);
    cell.appendChild(textNode);
    row.appendChild(cell);
  }
  table.appendChild(row);
  for (i = 0; i < array.length - 1; i++) {
    row = document.createElement('tr');
    for (j = 0; j <= 2; j++) {
      regularCell = document.createElement('td');
      cellContent = array[i][Object.keys(array[i])[j]];
      textNode = document.createTextNode(cellContent);
      regularCell.appendChild(textNode);
      row.appendChild(regularCell);
      if (typeof cellContent === 'number') {
        regularCell.style.textAlign = 'right';
      }
    }
    table.appendChild(row);
  }
  return table;
}
document.body.appendChild(buildTable(MOUNTAINS));
