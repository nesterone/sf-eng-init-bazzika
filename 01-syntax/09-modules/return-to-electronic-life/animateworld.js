var animate = (function () {
  'use strict';

  var active = null;
  var animateWorld;

  function Animated(world) {
    var outer = (window.__sandbox ? window.__sandbox.output.div : document.body);
    var doc = outer.ownerDocument;
    var node = outer.appendChild(doc.createElement('div'));
    var self = this;

    this.world = world;
    node.style.cssText = 'position: relative; width: intrinsic; width: fit-content;';
    this.pre = node.appendChild(doc.createElement('pre'));
    this.pre.appendChild(doc.createTextNode(world.toString()));
    this.button = node.appendChild(doc.createElement('div'));
    this.button.style.cssText = 'position: absolute; bottom: 8px; right: -4.5em;' +
      ' color: white; font-family: tahoma, arial; ' +
      'background: #4ab; cursor: pointer; border-radius: 18px; font-size: 70%;' +
      ' width: 3.5em; text-align: center;';
    this.button.innerHTML = 'stop';
    this.button.addEventListener('click', function () {
      self.clicked();
    });
    this.disabled = false;
    if (active) active.disable();
    active = this;
    this.interval = setInterval(function () {
      self.tick();
    }, 333);
  }

  Animated.prototype.clicked = function () {
    var self = this;
    if (this.disabled) return;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.button.innerHTML = 'start';
    } else {
      this.interval = setInterval(function () {
        self.tick();
      }, 333);
      this.button.innerHTML = 'stop';
    }
  };

  Animated.prototype.tick = function () {
    this.world.turn();
    this.pre.removeChild(this.pre.firstChild);
    this.pre.appendChild(this.pre.ownerDocument.createTextNode(this.world.toString()));
  };

  Animated.prototype.disable = function () {
    this.disabled = true;
    clearInterval(this.interval);
    this.button.innerHTML = 'Disabled';
    this.button.style.color = 'red';
  };

  animateWorld = function (world) {
    var animated = new Animated(world);
    console.log(animated);
  };

  return {
    Animated: Animated,
    animateWorld: animateWorld,
    active: active
  };
}());

if (animate) {
  console.log('animatedWorld module is loaded!');
}
