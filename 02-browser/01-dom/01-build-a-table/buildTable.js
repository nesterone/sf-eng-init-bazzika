var MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, country: 'Tanzania' },
  { name: 'Everest', height: 8848, country: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, country: 'Japan' },
  { name: 'Mont Blanc', height: 4808, country: 'Italy/France' },
  { name: 'Vaalserberg', height: 323, country: 'Netherlands' },
  { name: 'Denali', height: 6168, country: 'United States' },
  { name: 'Popocatepetl', height: 5465, country: 'Mexico' }
];

function buildTable() {
  var i;
  var cell;
  var row;
  var innerCell;
  var key;
  var table = document.createElement('TABLE');
  var heading = document.createElement('TR');

  if (MOUNTAINS.length === 0) {
    throw new SyntaxError('Array should contain any objects to display');
  }

  // Generate heading (th) from object
  for (key in MOUNTAINS[0]) {
    if (MOUNTAINS[0].hasOwnProperty(key)) {
      cell = document.createElement('TH');
      innerCell = document.createTextNode(key);
      cell.appendChild(innerCell);
      heading.appendChild(cell);
      table.appendChild(heading);
    }
  }

  // Display items from array
  for (i = 0; i < MOUNTAINS.length; i++) {
    row = document.createElement('TR');
    for (key in MOUNTAINS[i]) {
      if (MOUNTAINS[i].hasOwnProperty(key)) {
        cell = document.createElement('TD');
        innerCell = document.createTextNode(MOUNTAINS[i][key]);
        if (!isNaN(MOUNTAINS[i][key])) {
          cell.style.textAlign = 'right';
        }
        cell.appendChild(innerCell);
        row.appendChild(cell);
      }
    }
    table.appendChild(row);
  }
  return table;
}

document.body.appendChild(buildTable(MOUNTAINS));
