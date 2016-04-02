'use strict';

class NumberTestClass {
  isEven(n) {
    if (this.isNumber(n)) {
      return n % 2 == 0;
    } else {
      return null;
    }
  }

  isOdd(n) {
    if (this.isNumber(n)) {
      return Math.abs(n % 2) == 1;
    } else {
      return null;
    }
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}

let NumberTest = new NumberTestClass();

export {
  NumberTest
};
