import networks from '../../contracts/networks';

export function captureConsole(cb) {
  // eslint-disable-next-line
  const origConsoleLog = console.log,
    output = [];

  // eslint-disable-next-line
  console.log = (...args) => args.forEach(a => output.push(a));

  cb();

  // eslint-disable-next-line
  console.log = origConsoleLog;
}

export function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn.apply(
        this,
        args.concat((err, value) => (err ? reject(err) : resolve(value)))
      );
    });
  };
}

export function getNetworkName(networkId) {
  const result = networks.filter(n => n.networkId === networkId);

  if (result.length < 1) {
    throw new Error('No network with ID ' + networkId + ' found.');
  }

  return result[0].name;
}

export function slug() {
  return (
    '-' +
    Math.random()
      .toString(36)
      .substring(2, 7) +
    Math.random()
      .toString(36)
      .substring(2, 7)
  );
}

export function promiseWait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function observePromise(promise) {
  // https://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved
  // Don't create a wrapper for promises that can already be queried.
  if (promise.isResolved) return promise;

  let isResolved = false;
  let isRejected = false;

  // Observe the promise, saving the fulfillment in a closure scope.
  let result = promise.then(
    v => {
      isResolved = true;
      return v;
    },
    e => {
      isRejected = true;
      throw e;
    }
  );

  result.isSettled = () => {
    return isResolved || isRejected;
  };
  result.isResolved = () => {
    return isResolved;
  };
  result.isRejected = () => {
    return isRejected;
  };
  return result;
}

// https://stackoverflow.com/a/43963612/56817
export const uniqueId = (() => {
  let currentId = 0;
  const map = new WeakMap();

  return object => {
    if (!map.has(object)) {
      map.set(object, ++currentId);
    }

    return map.get(object);
  };
})();
