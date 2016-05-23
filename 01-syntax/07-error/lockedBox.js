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
    if (this.locked) {
      throw new Error('Locked!');
    }
    return this._content;
  }
};

function withBoxUnlocked(body) {
  var isLocked = box.locked;

  if (isLocked) {
    box.unlock();
  }

  try {
    body();
  } catch (error) {
    console.log(error.message);
  } finally {
    if (isLocked) {
      box.lock();
    }
  }
}

withBoxUnlocked(function () {
  box.content.push('gold piece');
});

try {
  withBoxUnlocked(function () {
    throw new Error('Pirates on the horizon! Abort!');
  });
} catch (e) {
  throw new Error('Error raised:', e);
}
console.log(box.locked);
// → true.
