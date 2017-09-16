// Partial Application
const callFirst = (fn, larg) =>
  function (...rest) {
    return fn.call(this, larg, ...rest);
  }

const callLast = (fn, rarg) =>
  function (...rest) {
    return fn.call(this, ...rest, rarg);
  }

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

// Maybe
const maybe = (fn) =>
  function (...args) {
    if (args.length === 0) {
      return;
    }
    else {
      for (let arg of args) {
        if (arg == null) return;
      }
      return fn.apply(this, args);
    }
  }

// Once
const once = (fn) => {
  let done = false;

  return function () {
    return done ? void 0 : ((done = true), fn.apply(this, arguments));
  }
}

// Left Variadic
const leftVariadic = (fn) => {
  if (fn.length < 1) {
    return fn;
  }
  else {
    return function(...args) {
      const gathered = args.slice(0, args.length - fn.length + 1),
            spread   = args.slice(args.length - fn.length + 1);

      return fn.apply(
        this, [gathered].concat(spread)
      );
    }
  }
}

// Left Gather
const leftGather = (outputArrayLength) => {
  return function (inputArray) {
    return [inputArray.slice(0, inputArray.length - outputArrayLength + 1)].conc\
at(
      inputArray.slice(inputArray.length - outputArrayLength + 1)
    )
  }
}

// Flatten
const flatten = ([first, ...rest]) => {
  if (first === undefined) {
    return [];
  }
  else if (!Array.isArray(first)) {
    return [first, ...flatten(rest)];
  }
  else {
    return [...flatten(first), ...flatten(rest)];
  }
}

// map with (not TCO)
const mapWith = (fn, [first, ...rest]) =>
  first === undefined
    ? []
    : [fn(first), ...mapWith(fn, rest)];

// fold with
const foldWith = (fn, terminalValue, [first, ...rest]) =>
  first === undefined
    ? terminalValue
    : fn(first, foldWith(fn, terminalValue, rest));

// map with TCO
const mapWithDelaysWork = (fn, [first, ...rest], prepend) =>
  first === undefined
    ? prepend
    : mapWithDelaysWork(fn, rest, [...prepend, fn(first)])

const mapWith = callLast(mapWithDelaysWork, [])

// default arguments
// factorial
const factorial = (n, work = 1) =>
  n === 1
    ? work
    : factorial(n - 1, n * work);

// length
const length = ([first, ...rest], numberToBeAdded = 0) =>
  first === undefined
    ? numberToBeAdded
    : length(rest, 1 + numberToBeAdded)

// map with
const mapWith = (fn, [first, ...rest], prepend = []) =>
  first === undefined
    ? prepend
    : mapWith(fn, rest, [...prepend, fn(first)]);
