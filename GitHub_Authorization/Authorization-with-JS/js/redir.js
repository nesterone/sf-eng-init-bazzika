/* exported print */

var code = window.location.search.substr(6);

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', theUrl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function post(path, params, meth) {
  var method = meth || 'post';
  var key;
  var hiddenField;
  var form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', path);

  for (key in params) {
    if (params.hasOwnProperty(key)) {
      hiddenField = document.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', key);
      hiddenField.setAttribute('value', params[key]);

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

post('https://github.com/login/oauth/access_token', { client_id: '883ffab4daeebd447d85',
  client_secret: '060d7d6ec7d0c9a7b2af63a51785f1500b648b98', code: code });

function print() {
  var field;
  var urlGet;
  var userInfo;
  var txt = document.getElementById('access').value;
  var access = txt.match(/=[\D\d]+?\&/);
  if (access) {
    field = access[0].substr(1, access[0].length - 2);
  }
  urlGet = 'https://api.github.com/user?access_token=' + field;
  userInfo = JSON.parse(httpGet(urlGet));
  document.write('<p><img class="avatar" src="' + userInfo.avatar_url + '">' +
    '</img> Login: ' + userInfo.login + '</p>');
}

(function ignoreLint() {
  var cond = 5 < 3;
  if (cond) print();
}());
