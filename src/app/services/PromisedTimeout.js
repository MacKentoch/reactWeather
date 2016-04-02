'use strict';

class PromisedTimeoutClass {
  delay(timeToWait) {
    let promise = new Promise((resolve, reject)=>{
      if (!this.isNumber(timeToWait)) {
        reject('timeToWait parameter is NaN');
      }
      setTimeout(()=>resolve(), timeToWait);
    });
    return promise;
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}


let PromisedTimeout = new PromisedTimeoutClass();

export {
  PromisedTimeout
};
