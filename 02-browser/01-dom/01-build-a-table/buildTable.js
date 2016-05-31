function buildTable(array) {
  var table = document.createElement('table');
  var tr = document.createElement('tr');
  var th;
  var td;
  var key;

  Object.keys(array[0]).forEach(function (value) {
    th = document.createElement('th');
    th.appendChild(document.createTextNode(value));
    tr.appendChild(th);
    table.appendChild(tr);
  });

  array.forEach(function (value) {
    tr = document.createElement('tr');

    for (key in value) {
      if (value.hasOwnProperty(key)) {
        td = document.createElement('td');
        td.appendChild(document.createTextNode(value[key]));
        tr.appendChild(td);
        if (typeof value[key] === 'number') {
          td.style.textAlign = 'right';
        }
      }
    }
    table.appendChild(tr);
  });

  return table;
}

document.body.appendChild(buildTable([
	{ name: 'Kilimanjaro', height: 5895, country: 'Tanzania' },
	{ name: 'Everest', height: 8848, country: 'Nepal' },
	{ name: 'Mount Fuji', height: 3776, country: 'Japan' },
	{ name: 'Mont Blanc', height: 4808, country: 'Italy/France' },
	{ name: 'Vaalserberg', height: 323, country: 'Netherlands' },
	{ name: 'Denali', height: 6168, country: 'United States' },
	{ name: 'Popocatepetl', height: 5465, country: 'Mexico' }
]));
