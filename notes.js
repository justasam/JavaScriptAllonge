// Partial Application
const callFirst = (fn, larg) =>
  function (...rest) {
    return fn.call(this, larg, ...rest);
  }

const callLast = (fn, rarg) =>
  function (...rest) {
    return fn.call(this, ...rest, rarg);
  }

const greet = (me, you) =>
  `Hello, ${you}, my name is ${me}`;

const callLeft = (fn, ...args) =>
  (...remainingArgs) =>
    fn(...args, ...remainingArgs);

const callRight = (fn, ...args) =>
  (...remainingArgs) =>
    fn(...remainingArgs, ...args);

// Unary
const unary = (fn) =>
  fn.length === 1 // number of args expected by function
    ? fn
    : function (something) {
      return fn.call(this, something);
    }

// Tap
const tap = (value, fn) => {
  const curried = (fn) => (
    // comma evaluates operands, returns last value
    typeof(fn) === 'function' && fn(value),
    value
  );

  return fn === undefined
    ? curried
    : curried(fn);
}

// bookmark: 86 page
