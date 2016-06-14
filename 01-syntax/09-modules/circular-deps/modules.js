/* eslint no-new-func: 0 no-use-before-define: 0 */

var defineCache = Object.create(null);
var currentMod = null;

function backgroundReadFile(name, done) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', name + '.js');
  xhr.onload = function () {
    done(xhr.responseText);
  };
  xhr.send();
}

function readFile(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', name + '.js', false);
  xhr.send(null);
  return xhr.responseText;
}

function require(name) {
  var code = new Function('exports, module', readFile(name));
  var exports = {};
  var module = {
    exports: exports
  };

  if (name in require.cache) {
    return require.cache[name];
  }

  require.cache[name] = module.exports;
  code(exports, module);

  return module.exports;
}

require.cache = Object.create(null);

function define(depNames, moduleFunction) {
  var myMod = currentMod;
  var deps = depNames.map(getModule);

  function whenDepsLoaded() {
    var isEveryDeps = deps.every(function (m) {
      return m.loaded;
    });
    var args = deps.map(function (m) {
      return m.exports;
    });
    var exports = moduleFunction.apply(null, args);

    if (isEveryDeps) {
      return;
    }
    if (myMod) {
      myMod.exports = exports;
      myMod.loaded = true;
      myMod.onLoad.forEach(function (f) {
        f();
      });
    }
  }

  deps.forEach(function (mod) {
    if (!mod.loaded) {
      mod.onLoad.push(whenDepsLoaded);
    }
  });

  whenDepsLoaded();
}

function getModule(name) {
  var module = {
    exports: null,
    loaded: false,
    onLoad: []
  };
  if (name in defineCache) {
    return defineCache[name];
  }
  defineCache[name] = module;
  backgroundReadFile(name, function (code) {
    var codeFn = new Function('define', code);
    currentMod = module;
    codeFn(define);
  });
  return module;
}
