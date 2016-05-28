var box = {
  locked: true,
  unlock: function () {
    this.locked = false;
  },
  lock: function () {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error('Locked!');
    return this._content;
  }
};
function withBoxUnlocked(body) {
  var result;
  if (!box.locked) {
    result = body();
    return result;
  }
  box.unlock();
  try {
    result = body();
  } catch (e) {
    if (!box.locked) {
      console.log(e);
    }
  } finally {
    box.lock();
  }
  return result;
}
withBoxUnlocked(function () {
  box.content.push('gold piece');
});
try {
  withBoxUnlocked(function () {
    throw new Error('Pirates on the horizon! Abort!');
  });
} catch (e) {
  console.log('Error raised:', e);
}
console.log(box.locked);
// → true
