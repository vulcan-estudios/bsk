(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.async = global.async || {})));
}(this, function (exports) { 'use strict';

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    var length = args.length;
    switch (length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }

  var funcTag = '[object Function]';
  var genTag = '[object GeneratorFunction]';
  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString = objectProto.toString;

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified,
   *  else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8 which returns 'object' for typed array and weak map constructors,
    // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString$1 = objectProto$1.toString;

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified,
   *  else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike(value) && objectToString$1.call(value) == symbolTag);
  }

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = isFunction(value.valueOf) ? value.valueOf() : value;
      value = isObject(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  var INFINITY = 1 / 0;
  var MAX_INTEGER = 1.7976931348623157e+308;
  /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
      var sign = (value < 0 ? -1 : 1);
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */
  function toInteger(value) {
    var result = toFinite(value),
        remainder = result % 1;

    return result === result ? (remainder ? result - remainder : result) : 0;
  }

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * Creates a function that invokes `func` with the `this` binding of the
   * created function and arguments from `start` and beyond provided as
   * an array.
   *
   * **Note:** This method is based on the
   * [rest parameter](https://mdn.io/rest_parameters).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Function
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var say = _.rest(function(what, names) {
   *   return what + ' ' + _.initial(names).join(', ') +
   *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
   * });
   *
   * say('hello', 'fred', 'barney', 'pebbles');
   * // => 'hello fred, barney, & pebbles'
   */
  function rest(func, start) {
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      switch (start) {
        case 0: return func.call(this, array);
        case 1: return func.call(this, args[0], array);
        case 2: return func.call(this, args[0], args[1], array);
      }
      var otherArgs = Array(start + 1);
      index = -1;
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = array;
      return apply(func, this, otherArgs);
    };
  }

  function initialParams (fn) {
      return rest(function (args /*..., callback*/) {
          var callback = args.pop();
          fn.call(this, args, callback);
      });
  }

  function applyEach$1(eachfn) {
      return rest(function (fns, args) {
          var go = initialParams(function (args, callback) {
              var that = this;
              return eachfn(fns, function (fn, cb) {
                  fn.apply(that, args.concat([cb]));
              }, callback);
          });
          if (args.length) {
              return go.apply(this, args);
          } else {
              return go;
          }
      });
  }

  /**
   * A method that returns `undefined`.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Util
   * @example
   *
   * _.times(2, _.noop);
   * // => [undefined, undefined]
   */
  function noop() {
    // No operation performed.
  }

  function once(fn) {
      return function () {
          if (fn === null) return;
          var callFn = fn;
          fn = null;
          callFn.apply(this, arguments);
      };
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * Gets the "length" property value of `object`.
   *
   * **Note:** This function is used to avoid a
   * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
   * Safari on at least iOS 8.1-8.3 ARM64.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {*} Returns the "length" value.
   */
  var getLength = baseProperty('length');

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This function is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length,
   *  else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength(getLength(value)) && !isFunction(value);
  }

  var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;

  function getIterator (coll) {
      return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetPrototype = Object.getPrototypeOf;

  /**
   * Gets the `[[Prototype]]` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {null|Object} Returns the `[[Prototype]]`.
   */
  function getPrototype(value) {
    return nativeGetPrototype(Object(value));
  }

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto$2.hasOwnProperty;

  /**
   * The base implementation of `_.has` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHas(object, key) {
    // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
    // that are composed entirely of index properties, return `false` for
    // `hasOwnProperty` checks of them.
    return object != null &&
      (hasOwnProperty.call(object, key) ||
        (typeof object == 'object' && key in object && getPrototype(object) === null));
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = Object.keys;

  /**
   * The base implementation of `_.keys` which doesn't skip the constructor
   * property of prototypes or treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    return nativeKeys(Object(object));
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$3.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString$2 = objectProto$3.toString;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
    // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
    return isArrayLikeObject(value) && hasOwnProperty$1.call(value, 'callee') &&
      (!propertyIsEnumerable.call(value, 'callee') || objectToString$2.call(value) == argsTag);
  }

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @type {Function}
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified,
   *  else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  /** `Object#toString` result references. */
  var stringTag = '[object String]';

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString$3 = objectProto$4.toString;

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified,
   *  else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' ||
      (!isArray(value) && isObjectLike(value) && objectToString$3.call(value) == stringTag);
  }

  /**
   * Creates an array of index keys for `object` values of arrays,
   * `arguments` objects, and strings, otherwise `null` is returned.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array|null} Returns index keys, else `null`.
   */
  function indexKeys(object) {
    var length = object ? object.length : undefined;
    if (isLength(length) &&
        (isArray(object) || isString(object) || isArguments(object))) {
      return baseTimes(length, String);
    }
    return null;
  }

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length &&
      (typeof value == 'number' || reIsUint.test(value)) &&
      (value > -1 && value % 1 == 0 && value < length);
  }

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

    return value === proto;
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    var isProto = isPrototype(object);
    if (!(isProto || isArrayLike(object))) {
      return baseKeys(object);
    }
    var indexes = indexKeys(object),
        skipIndexes = !!indexes,
        result = indexes || [],
        length = result.length;

    for (var key in object) {
      if (baseHas(object, key) &&
          !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
          !(isProto && key == 'constructor')) {
        result.push(key);
      }
    }
    return result;
  }

  function iterator(coll) {
      var i = -1;
      var len;
      if (isArrayLike(coll)) {
          len = coll.length;
          return function next() {
              i++;
              return i < len ? { value: coll[i], key: i } : null;
          };
      }

      var iterate = getIterator(coll);
      if (iterate) {
          return function next() {
              var item = iterate.next();
              if (item.done) return null;
              i++;
              return { value: item.value, key: i };
          };
      }

      var okeys = keys(coll);
      len = okeys.length;
      return function next() {
          i++;
          var key = okeys[i];
          return i < len ? { value: coll[key], key: key } : null;
      };
  }

  function onlyOnce(fn) {
      return function () {
          if (fn === null) throw new Error("Callback was already called.");
          var callFn = fn;
          fn = null;
          callFn.apply(this, arguments);
      };
  }

  function _eachOfLimit(limit) {
      return function (obj, iteratee, callback) {
          callback = once(callback || noop);
          obj = obj || [];
          var nextElem = iterator(obj);
          if (limit <= 0) {
              return callback(null);
          }
          var done = false;
          var running = 0;
          var errored = false;

          (function replenish() {
              if (done && running <= 0) {
                  return callback(null);
              }

              while (running < limit && !errored) {
                  var elem = nextElem();
                  if (elem === null) {
                      done = true;
                      if (running <= 0) {
                          callback(null);
                      }
                      return;
                  }
                  running += 1;
                  /* eslint {no-loop-func: 0} */
                  iteratee(elem.value, elem.key, onlyOnce(function (err) {
                      running -= 1;
                      if (err) {
                          callback(err);
                          errored = true;
                      } else {
                          replenish();
                      }
                  }));
              }
          })();
      };
  }

  function doParallelLimit(fn) {
      return function (obj, limit, iteratee, callback) {
          return fn(_eachOfLimit(limit), obj, iteratee, callback);
      };
  }

  function _asyncMap(eachfn, arr, iteratee, callback) {
      callback = once(callback || noop);
      arr = arr || [];
      var results = [];
      var counter = 0;

      eachfn(arr, function (value, _, callback) {
          var index = counter++;
          iteratee(value, function (err, v) {
              results[index] = v;
              callback(err);
          });
      }, function (err) {
          callback(err, results);
      });
  }

  /**
   * The same as [`map`]{@link module:Collections.map} but runs a maximum of `limit` async operations at a time.
   *
   * @name mapLimit
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.map]{@link module:Collections.map}
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {number} limit - The maximum number of async operations at a time.
   * @param {Function} iteratee - A function to apply to each item in `coll`.
   * The iteratee is passed a `callback(err, transformed)` which must be called
   * once it has completed with an error (which can be `null`) and a transformed
   * item. Invoked with (item, callback).
   * @param {Function} [callback] - A callback which is called when all `iteratee`
   * functions have finished, or an error occurs. Results is an array of the
   * transformed items from the `coll`. Invoked with (err, results).
   */
  var mapLimit = doParallelLimit(_asyncMap);

  function doLimit(fn, limit) {
      return function (iterable, iteratee, callback) {
          return fn(iterable, limit, iteratee, callback);
      };
  }

  /**
   * Produces a new collection of values by mapping each value in `coll` through
   * the `iteratee` function. The `iteratee` is called with an item from `coll`
   * and a callback for when it has finished processing. Each of these callback
   * takes 2 arguments: an `error`, and the transformed item from `coll`. If
   * `iteratee` passes an error to its callback, the main `callback` (for the
   * `map` function) is immediately called with the error.
   *
   * Note, that since this function applies the `iteratee` to each item in
   * parallel, there is no guarantee that the `iteratee` functions will complete
   * in order. However, the results array will be in the same order as the
   * original `coll`.
   *
   * If `map` is passed an Object, the results will be an Array.  The results
   * will roughly be in the order of the original Objects' keys (but this can
   * vary across JavaScript engines)
   *
   * @name map
   * @static
   * @memberOf module:Collections
   * @method
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A function to apply to each item in `coll`.
   * The iteratee is passed a `callback(err, transformed)` which must be called
   * once it has completed with an error (which can be `null`) and a
   * transformed item. Invoked with (item, callback).
   * @param {Function} [callback] - A callback which is called when all `iteratee`
   * functions have finished, or an error occurs. Results is an Array of the
   * transformed items from the `coll`. Invoked with (err, results).
   * @example
   *
   * async.map(['file1','file2','file3'], fs.stat, function(err, results) {
   *     // results is now an array of stats for each file
   * });
   */
  var map = doLimit(mapLimit, Infinity);

  /**
   * Applies the provided arguments to each function in the array, calling
   * `callback` after all functions have completed. If you only provide the first
   * argument, then it will return a function which lets you pass in the
   * arguments as if it were a single function call.
   *
   * @name applyEach
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @category Control Flow
   * @param {Array|Iterable|Object} fns - A collection of asynchronous functions to all
   * call with the same arguments
   * @param {...*} [args] - any number of separate arguments to pass to the
   * function.
   * @param {Function} [callback] - the final argument should be the callback,
   * called when all functions have completed processing.
   * @returns {Function} - If only the first argument is provided, it will return
   * a function which lets you pass in the arguments as if it were a single
   * function call.
   * @example
   *
   * async.applyEach([enableSearch, updateSchema], 'bucket', callback);
   *
   * // partial application example:
   * async.each(
   *     buckets,
   *     async.applyEach([enableSearch, updateSchema]),
   *     callback
   * );
   */
  var applyEach = applyEach$1(map);

  /**
   * The same as [`map`]{@link module:Collections.map} but runs only a single async operation at a time.
   *
   * @name mapSeries
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.map]{@link module:Collections.map}
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A function to apply to each item in `coll`.
   * The iteratee is passed a `callback(err, transformed)` which must be called
   * once it has completed with an error (which can be `null`) and a
   * transformed item. Invoked with (item, callback).
   * @param {Function} [callback] - A callback which is called when all `iteratee`
   * functions have finished, or an error occurs. Results is an array of the
   * transformed items from the `coll`. Invoked with (err, results).
   */
  var mapSeries = doLimit(mapLimit, 1);

  /**
   * The same as [`applyEach`]{@link module:ControlFlow.applyEach} but runs only a single async operation at a time.
   *
   * @name applyEachSeries
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.applyEach]{@link module:ControlFlow.applyEach}
   * @category Control Flow
   * @param {Array|Iterable|Object} fns - A collection of asynchronous functions to all
   * call with the same arguments
   * @param {...*} [args] - any number of separate arguments to pass to the
   * function.
   * @param {Function} [callback] - the final argument should be the callback,
   * called when all functions have completed processing.
   * @returns {Function} - If only the first argument is provided, it will return
   * a function which lets you pass in the arguments as if it were a single
   * function call.
   */
  var applyEachSeries = applyEach$1(mapSeries);

  /**
   * Creates a continuation function with some arguments already applied.
   *
   * Useful as a shorthand when combined with other control flow functions. Any
   * arguments passed to the returned function are added to the arguments
   * originally passed to apply.
   *
   * @name apply
   * @static
   * @memberOf module:Utils
   * @method
   * @category Util
   * @param {Function} function - The function you want to eventually apply all
   * arguments to. Invokes with (arguments...).
   * @param {...*} arguments... - Any number of arguments to automatically apply
   * when the continuation is called.
   * @example
   *
   * // using apply
   * async.parallel([
   *     async.apply(fs.writeFile, 'testfile1', 'test1'),
   *     async.apply(fs.writeFile, 'testfile2', 'test2')
   * ]);
   *
   *
   * // the same process without using apply
   * async.parallel([
   *     function(callback) {
   *         fs.writeFile('testfile1', 'test1', callback);
   *     },
   *     function(callback) {
   *         fs.writeFile('testfile2', 'test2', callback);
   *     }
   * ]);
   *
   * // It's possible to pass any number of additional arguments when calling the
   * // continuation:
   *
   * node> var fn = async.apply(sys.puts, 'one');
   * node> fn('two', 'three');
   * one
   * two
   * three
   */
  var apply$1 = rest(function (fn, args) {
      return rest(function (callArgs) {
          return fn.apply(null, args.concat(callArgs));
      });
  });

  /**
   * Take a sync function and make it async, passing its return value to a
   * callback. This is useful for plugging sync functions into a waterfall,
   * series, or other async functions. Any arguments passed to the generated
   * function will be passed to the wrapped function (except for the final
   * callback argument). Errors thrown will be passed to the callback.
   *
   * If the function passed to `asyncify` returns a Promise, that promises's
   * resolved/rejected state will be used to call the callback, rather than simply
   * the synchronous return value.
   *
   * This also means you can asyncify ES2016 `async` functions.
   *
   * @name asyncify
   * @static
   * @memberOf module:Utils
   * @method
   * @alias wrapSync
   * @category Util
   * @param {Function} func - The synchronous function to convert to an
   * asynchronous function.
   * @returns {Function} An asynchronous wrapper of the `func`. To be invoked with
   * (callback).
   * @example
   *
   * // passing a regular synchronous function
   * async.waterfall([
   *     async.apply(fs.readFile, filename, "utf8"),
   *     async.asyncify(JSON.parse),
   *     function (data, next) {
   *         // data is the result of parsing the text.
   *         // If there was a parsing error, it would have been caught.
   *     }
   * ], callback);
   *
   * // passing a function returning a promise
   * async.waterfall([
   *     async.apply(fs.readFile, filename, "utf8"),
   *     async.asyncify(function (contents) {
   *         return db.model.create(contents);
   *     }),
   *     function (model, next) {
   *         // `model` is the instantiated model object.
   *         // If there was an error, this function would be skipped.
   *     }
   * ], callback);
   *
   * // es6 example
   * var q = async.queue(async.asyncify(async function(file) {
   *     var intermediateStep = await processFile(file);
   *     return await somePromise(intermediateStep)
   * }));
   *
   * q.push(files);
   */
  function asyncify(func) {
      return initialParams(function (args, callback) {
          var result;
          try {
              result = func.apply(this, args);
          } catch (e) {
              return callback(e);
          }
          // if result is Promise object
          if (isObject(result) && typeof result.then === 'function') {
              result.then(function (value) {
                  callback(null, value);
              }, function (err) {
                  callback(err.message ? err : new Error(err));
              });
          } else {
              callback(null, result);
          }
      });
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = createBaseFor();

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
  }

  /**
   * Gets the index at which the first occurrence of `NaN` is found in `array`.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
   */
  function indexOfNaN(array, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      var other = array[index];
      if (other !== other) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
      return indexOfNaN(array, fromIndex);
    }
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Determines the best order for running the functions in `tasks`, based on
   * their requirements. Each function can optionally depend on other functions
   * being completed first, and each function is run as soon as its requirements
   * are satisfied.
   *
   * If any of the functions pass an error to their callback, the `auto` sequence
   * will stop. Further tasks will not execute (so any other functions depending
   * on it will not run), and the main `callback` is immediately called with the
   * error.
   *
   * Functions also receive an object containing the results of functions which
   * have completed so far as the first argument, if they have dependencies. If a
   * task function has no dependencies, it will only be passed a callback.
   *
   * @name auto
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @category Control Flow
   * @param {Object} tasks - An object. Each of its properties is either a
   * function or an array of requirements, with the function itself the last item
   * in the array. The object's key of a property serves as the name of the task
   * defined by that property, i.e. can be used when specifying requirements for
   * other tasks. The function receives one or two arguments:
   * * a `results` object, containing the results of the previously executed
   *   functions, only passed if the task has any dependencies,
   * * a `callback(err, result)` function, which must be called when finished,
   *   passing an `error` (which can be `null`) and the result of the function's
   *   execution.
   * @param {number} [concurrency=Infinity] - An optional `integer` for
   * determining the maximum number of tasks that can be run in parallel. By
   * default, as many as possible.
   * @param {Function} [callback] - An optional callback which is called when all
   * the tasks have been completed. It receives the `err` argument if any `tasks`
   * pass an error to their callback. Results are always returned; however, if an
   * error occurs, no further `tasks` will be performed, and the results object
   * will only contain partial results. Invoked with (err, results).
   * @returns undefined
   * @example
   *
   * async.auto({
   *     // this function will just be passed a callback
   *     readData: async.apply(fs.readFile, 'data.txt', 'utf-8'),
   *     showData: ['readData', function(results, cb) {
   *         // results.readData is the file's contents
   *         // ...
   *     }]
   * }, callback);
   *
   * async.auto({
   *     get_data: function(callback) {
   *         console.log('in get_data');
   *         // async code to get some data
   *         callback(null, 'data', 'converted to array');
   *     },
   *     make_folder: function(callback) {
   *         console.log('in make_folder');
   *         // async code to create a directory to store a file in
   *         // this is run at the same time as getting the data
   *         callback(null, 'folder');
   *     },
   *     write_file: ['get_data', 'make_folder', function(results, callback) {
   *         console.log('in write_file', JSON.stringify(results));
   *         // once there is some data and the directory exists,
   *         // write the data to a file in the directory
   *         callback(null, 'filename');
   *     }],
   *     email_link: ['write_file', function(results, callback) {
   *         console.log('in email_link', JSON.stringify(results));
   *         // once the file is written let's email a link to it...
   *         // results.write_file contains the filename returned by write_file.
   *         callback(null, {'file':results.write_file, 'email':'user@example.com'});
   *     }]
   * }, function(err, results) {
   *     console.log('err = ', err);
   *     console.log('results = ', results);
   * });
   */
  function auto (tasks, concurrency, callback) {
      if (typeof concurrency === 'function') {
          // concurrency is optional, shift the args.
          callback = concurrency;
          concurrency = null;
      }
      callback = once(callback || noop);
      var keys$$ = keys(tasks);
      var numTasks = keys$$.length;
      if (!numTasks) {
          return callback(null);
      }
      if (!concurrency) {
          concurrency = numTasks;
      }

      var results = {};
      var runningTasks = 0;
      var hasError = false;

      var listeners = {};

      var readyTasks = [];

      // for cycle detection:
      var readyToCheck = []; // tasks that have been identified as reachable
      // without the possibility of returning to an ancestor task
      var uncheckedDependencies = {};

      baseForOwn(tasks, function (task, key) {
          if (!isArray(task)) {
              // no dependencies
              enqueueTask(key, [task]);
              readyToCheck.push(key);
              return;
          }

          var dependencies = task.slice(0, task.length - 1);
          var remainingDependencies = dependencies.length;
          if (remainingDependencies === 0) {
              enqueueTask(key, task);
              readyToCheck.push(key);
              return;
          }
          uncheckedDependencies[key] = remainingDependencies;

          arrayEach(dependencies, function (dependencyName) {
              if (!tasks[dependencyName]) {
                  throw new Error('async.auto task `' + key + '` has a non-existent dependency in ' + dependencies.join(', '));
              }
              addListener(dependencyName, function () {
                  remainingDependencies--;
                  if (remainingDependencies === 0) {
                      enqueueTask(key, task);
                  }
              });
          });
      });

      checkForDeadlocks();
      processQueue();

      function enqueueTask(key, task) {
          readyTasks.push(function () {
              runTask(key, task);
          });
      }

      function processQueue() {
          if (readyTasks.length === 0 && runningTasks === 0) {
              return callback(null, results);
          }
          while (readyTasks.length && runningTasks < concurrency) {
              var run = readyTasks.shift();
              run();
          }
      }

      function addListener(taskName, fn) {
          var taskListeners = listeners[taskName];
          if (!taskListeners) {
              taskListeners = listeners[taskName] = [];
          }

          taskListeners.push(fn);
      }

      function taskComplete(taskName) {
          var taskListeners = listeners[taskName] || [];
          arrayEach(taskListeners, function (fn) {
              fn();
          });
          processQueue();
      }

      function runTask(key, task) {
          if (hasError) return;

          var taskCallback = onlyOnce(rest(function (err, args) {
              runningTasks--;
              if (args.length <= 1) {
                  args = args[0];
              }
              if (err) {
                  var safeResults = {};
                  baseForOwn(results, function (val, rkey) {
                      safeResults[rkey] = val;
                  });
                  safeResults[key] = args;
                  hasError = true;
                  listeners = [];

                  callback(err, safeResults);
              } else {
                  results[key] = args;
                  taskComplete(key);
              }
          }));

          runningTasks++;
          var taskFn = task[task.length - 1];
          if (task.length > 1) {
              taskFn(results, taskCallback);
          } else {
              taskFn(taskCallback);
          }
      }

      function checkForDeadlocks() {
          // Kahn's algorithm
          // https://en.wikipedia.org/wiki/Topological_sorting#Kahn.27s_algorithm
          // http://connalle.blogspot.com/2013/10/topological-sortingkahn-algorithm.html
          var currentTask;
          var counter = 0;
          while (readyToCheck.length) {
              currentTask = readyToCheck.pop();
              counter++;
              arrayEach(getDependents(currentTask), function (dependent) {
                  if (! --uncheckedDependencies[dependent]) {
                      readyToCheck.push(dependent);
                  }
              });
          }

          if (counter !== numTasks) {
              throw new Error('async.auto cannot execute tasks due to a recursive dependency');
          }
      }

      function getDependents(taskName) {
          var result = [];
          baseForOwn(tasks, function (task, key) {
              if (isArray(task) && baseIndexOf(task, taskName, 0) >= 0) {
                  result.push(key);
              }
          });
          return result;
      }
  }

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array ? array.length : 0,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  /**
   * Checks if `value` is a global object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {null|Object} Returns `value` if it's a global object, else `null`.
   */
  function checkGlobal(value) {
    return (value && value.Object === Object) ? value : null;
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = checkGlobal(typeof global == 'object' && global);

  /** Detect free variable `self`. */
  var freeSelf = checkGlobal(typeof self == 'object' && self);

  /** Detect `this` as the global object. */
  var thisGlobal = checkGlobal(typeof this == 'object' && this);

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

  /** Built-in value references. */
  var Symbol$1 = root.Symbol;

  /** Used as references for various `Number` constants. */
  var INFINITY$1 = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined;
  var symbolToString = symbolProto ? symbolProto.toString : undefined;
  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
  }

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    if (start < 0) {
      start = -start > length ? 0 : (length + start);
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }

  /**
   * Casts `array` to a slice if it's needed.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {number} start The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the cast slice.
   */
  function castSlice(array, start, end) {
    var length = array.length;
    end = end === undefined ? length : end;
    return (!start && end >= length) ? array : baseSlice(array, start, end);
  }

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
        length = strSymbols.length;

    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff';
  var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23';
  var rsComboSymbolsRange = '\\u20d0-\\u20f0';
  var rsVarRange = '\\ufe0e\\ufe0f';
  var rsAstral = '[' + rsAstralRange + ']';
  var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';
  var rsFitz = '\\ud83c[\\udffb-\\udfff]';
  var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
  var rsNonAstral = '[^' + rsAstralRange + ']';
  var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
  var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
  var rsZWJ = '\\u200d';
  var reOptMod = rsModifier + '?';
  var rsOptVar = '[' + rsVarRange + ']?';
  var rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
  var rsSeq = rsOptVar + reOptMod + rsOptJoin;
  var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reComplexSymbol = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return string.match(reComplexSymbol);
  }

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    return value == null ? '' : baseToString(value);
  }

  /** Used to match leading and trailing whitespace. */
  var reTrim$1 = /^\s+|\s+$/g;

  /**
   * Removes leading and trailing whitespace or specified characters from `string`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to trim.
   * @param {string} [chars=whitespace] The characters to trim.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {string} Returns the trimmed string.
   * @example
   *
   * _.trim('  abc  ');
   * // => 'abc'
   *
   * _.trim('-_-abc-_-', '_-');
   * // => 'abc'
   *
   * _.map(['  foo  ', '  bar  '], _.trim);
   * // => ['foo', 'bar']
   */
  function trim(string, chars, guard) {
    string = toString(string);
    if (string && (guard || chars === undefined)) {
      return string.replace(reTrim$1, '');
    }
    if (!string || !(chars = baseToString(chars))) {
      return string;
    }
    var strSymbols = stringToArray(string),
        chrSymbols = stringToArray(chars),
        start = charsStartIndex(strSymbols, chrSymbols),
        end = charsEndIndex(strSymbols, chrSymbols) + 1;

    return castSlice(strSymbols, start, end).join('');
  }

  var FN_ARGS = /^(function)?\s*[^\(]*\(\s*([^\)]*)\)/m;
  var FN_ARG_SPLIT = /,/;
  var FN_ARG = /(=.+)?(\s*)$/;
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

  function parseParams(func) {
      func = func.toString().replace(STRIP_COMMENTS, '');
      func = func.match(FN_ARGS)[2].replace(' ', '');
      func = func ? func.split(FN_ARG_SPLIT) : [];
      func = func.map(function (arg) {
          return trim(arg.replace(FN_ARG, ''));
      });
      return func;
  }

  /**
   * A dependency-injected version of the [async.auto]{@link module:ControlFlow.auto} function. Dependent
   * tasks are specified as parameters to the function, after the usual callback
   * parameter, with the parameter names matching the names of the tasks it
   * depends on. This can provide even more readable task graphs which can be
   * easier to maintain.
   *
   * If a final callback is specified, the task results are similarly injected,
   * specified as named parameters after the initial error parameter.
   *
   * The autoInject function is purely syntactic sugar and its semantics are
   * otherwise equivalent to [async.auto]{@link module:ControlFlow.auto}.
   *
   * @name autoInject
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.auto]{@link module:ControlFlow.auto}
   * @category Control Flow
   * @param {Object} tasks - An object, each of whose properties is a function of
   * the form 'func([dependencies...], callback). The object's key of a property
   * serves as the name of the task defined by that property, i.e. can be used
   * when specifying requirements for other tasks.
   * * The `callback` parameter is a `callback(err, result)` which must be called
   *   when finished, passing an `error` (which can be `null`) and the result of
   *   the function's execution. The remaining parameters name other tasks on
   *   which the task is dependent, and the results from those tasks are the
   *   arguments of those parameters.
   * @param {Function} [callback] - An optional callback which is called when all
   * the tasks have been completed. It receives the `err` argument if any `tasks`
   * pass an error to their callback, and a `results` object with any completed
   * task results, similar to `auto`.
   * @example
   *
   * //  The example from `auto` can be rewritten as follows:
   * async.autoInject({
   *     get_data: function(callback) {
   *         // async code to get some data
   *         callback(null, 'data', 'converted to array');
   *     },
   *     make_folder: function(callback) {
   *         // async code to create a directory to store a file in
   *         // this is run at the same time as getting the data
   *         callback(null, 'folder');
   *     },
   *     write_file: function(get_data, make_folder, callback) {
   *         // once there is some data and the directory exists,
   *         // write the data to a file in the directory
   *         callback(null, 'filename');
   *     },
   *     email_link: function(write_file, callback) {
   *         // once the file is written let's email a link to it...
   *         // write_file contains the filename returned by write_file.
   *         callback(null, {'file':write_file, 'email':'user@example.com'});
   *     }
   * }, function(err, results) {
   *     console.log('err = ', err);
   *     console.log('email_link = ', results.email_link);
   * });
   *
   * // If you are using a JS minifier that mangles parameter names, `autoInject`
   * // will not work with plain functions, since the parameter names will be
   * // collapsed to a single letter identifier.  To work around this, you can
   * // explicitly specify the names of the parameters your task function needs
   * // in an array, similar to Angular.js dependency injection.
   *
   * // This still has an advantage over plain `auto`, since the results a task
   * // depends on are still spread into arguments.
   * async.autoInject({
   *     //...
   *     write_file: ['get_data', 'make_folder', function(get_data, make_folder, callback) {
   *         callback(null, 'filename');
   *     }],
   *     email_link: ['write_file', function(write_file, callback) {
   *         callback(null, {'file':write_file, 'email':'user@example.com'});
   *     }]
   *     //...
   * }, function(err, results) {
   *     console.log('err = ', err);
   *     console.log('email_link = ', results.email_link);
   * });
   */
  function autoInject(tasks, callback) {
      var newTasks = {};

      baseForOwn(tasks, function (taskFn, key) {
          var params;

          if (isArray(taskFn)) {
              params = copyArray(taskFn);
              taskFn = params.pop();

              newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
          } else if (taskFn.length === 1) {
              // no dependencies, use the function as-is
              newTasks[key] = taskFn;
          } else {
              params = parseParams(taskFn);
              if (taskFn.length === 0 && params.length === 0) {
                  throw new Error("autoInject task functions require explicit parameters.");
              }

              params.pop();

              newTasks[key] = params.concat(newTask);
          }

          function newTask(results, taskCb) {
              var newArgs = arrayMap(params, function (name) {
                  return results[name];
              });
              newArgs.push(taskCb);
              taskFn.apply(null, newArgs);
          }
      });

      auto(newTasks, callback);
  }

  var hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
  var hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

  function fallback(fn) {
      setTimeout(fn, 0);
  }

  function wrap(defer) {
      return rest(function (fn, args) {
          defer(function () {
              fn.apply(null, args);
          });
      });
  }

  var _defer;

  if (hasSetImmediate) {
      _defer = setImmediate;
  } else if (hasNextTick) {
      _defer = process.nextTick;
  } else {
      _defer = fallback;
  }

  var setImmediate$1 = wrap(_defer);

  // Simple doubly linked list (https://en.wikipedia.org/wiki/Doubly_linked_list) implementation
  // used for queues. This implementation assumes that the node provided by the user can be modified
  // to adjust the next and last properties. We implement only the minimal functionality
  // for queue support.
  function DLL() {
      this.head = this.tail = null;
      this.length = 0;
  }

  function setInitial(dll, node) {
      dll.length = 1;
      dll.head = dll.tail = node;
  }

  DLL.prototype.removeLink = function (node) {
      if (node.prev) node.prev.next = node.next;else this.head = node.next;
      if (node.next) node.next.prev = node.prev;else this.tail = node.prev;

      node.prev = node.next = null;
      this.length -= 1;
      return node;
  };

  DLL.prototype.empty = DLL;

  DLL.prototype.insertAfter = function (node, newNode) {
      newNode.prev = node;
      newNode.next = node.next;
      if (node.next) node.next.prev = newNode;else this.tail = newNode;
      node.next = newNode;
      this.length += 1;
  };

  DLL.prototype.insertBefore = function (node, newNode) {
      newNode.prev = node.prev;
      newNode.next = node;
      if (node.prev) node.prev.next = newNode;else this.head = newNode;
      node.prev = newNode;
      this.length += 1;
  };

  DLL.prototype.unshift = function (node) {
      if (this.head) this.insertBefore(this.head, node);else setInitial(this, node);
  };

  DLL.prototype.push = function (node) {
      if (this.tail) this.insertAfter(this.tail, node);else setInitial(this, node);
  };

  DLL.prototype.shift = function () {
      return this.head && this.removeLink(this.head);
  };

  DLL.prototype.pop = function () {
      return this.tail && this.removeLink(this.tail);
  };

  function queue(worker, concurrency, payload) {
      if (concurrency == null) {
          concurrency = 1;
      } else if (concurrency === 0) {
          throw new Error('Concurrency must not be zero');
      }

      function _insert(data, pos, callback) {
          if (callback != null && typeof callback !== 'function') {
              throw new Error('task callback must be a function');
          }
          q.started = true;
          if (!isArray(data)) {
              data = [data];
          }
          if (data.length === 0 && q.idle()) {
              // call drain immediately if there are no tasks
              return setImmediate$1(function () {
                  q.drain();
              });
          }
          arrayEach(data, function (task) {
              var item = {
                  data: task,
                  callback: callback || noop
              };

              if (pos) {
                  q._tasks.unshift(item);
              } else {
                  q._tasks.push(item);
              }
          });
          setImmediate$1(q.process);
      }

      function _next(tasks) {
          return rest(function (args) {
              workers -= 1;

              arrayEach(tasks, function (task) {
                  arrayEach(workersList, function (worker, index) {
                      if (worker === task) {
                          workersList.splice(index, 1);
                          return false;
                      }
                  });

                  task.callback.apply(task, args);

                  if (args[0] != null) {
                      q.error(args[0], task.data);
                  }
              });

              if (workers <= q.concurrency - q.buffer) {
                  q.unsaturated();
              }

              if (q.idle()) {
                  q.drain();
              }
              q.process();
          });
      }

      var workers = 0;
      var workersList = [];
      var q = {
          _tasks: new DLL(),
          concurrency: concurrency,
          payload: payload,
          saturated: noop,
          unsaturated: noop,
          buffer: concurrency / 4,
          empty: noop,
          drain: noop,
          error: noop,
          started: false,
          paused: false,
          push: function (data, callback) {
              _insert(data, false, callback);
          },
          kill: function () {
              q.drain = noop;
              q._tasks.empty();
          },
          unshift: function (data, callback) {
              _insert(data, true, callback);
          },
          process: function () {
              while (!q.paused && workers < q.concurrency && q._tasks.length) {
                  var tasks = [],
                      data = [];
                  var l = q._tasks.length;
                  if (q.payload) l = Math.min(l, q.payload);
                  for (var i = 0; i < l; i++) {
                      var node = q._tasks.shift();
                      tasks.push(node);
                      data.push(node.data);
                  }

                  if (q._tasks.length === 0) {
                      q.empty();
                  }
                  workers += 1;
                  workersList.push(tasks[0]);

                  if (workers === q.concurrency) {
                      q.saturated();
                  }

                  var cb = onlyOnce(_next(tasks));
                  worker(data, cb);
              }
          },
          length: function () {
              return q._tasks.length;
          },
          running: function () {
              return workers;
          },
          workersList: function () {
              return workersList;
          },
          idle: function () {
              return q._tasks.length + workers === 0;
          },
          pause: function () {
              q.paused = true;
          },
          resume: function () {
              if (q.paused === false) {
                  return;
              }
              q.paused = false;
              var resumeCount = Math.min(q.concurrency, q._tasks.length);
              // Need to call q.process once per concurrent
              // worker to preserve full concurrency after pause
              for (var w = 1; w <= resumeCount; w++) {
                  setImmediate$1(q.process);
              }
          }
      };
      return q;
  }

  /**
   * A cargo of tasks for the worker function to complete. Cargo inherits all of
   * the same methods and event callbacks as [`queue`]{@link module:ControlFlow.queue}.
   * @typedef {Object} CargoObject
   * @memberOf module:ControlFlow
   * @property {Function} length - A function returning the number of items
   * waiting to be processed. Invoke like `cargo.length()`.
   * @property {number} payload - An `integer` for determining how many tasks
   * should be process per round. This property can be changed after a `cargo` is
   * created to alter the payload on-the-fly.
   * @property {Function} push - Adds `task` to the `queue`. The callback is
   * called once the `worker` has finished processing the task. Instead of a
   * single task, an array of `tasks` can be submitted. The respective callback is
   * used for every task in the list. Invoke like `cargo.push(task, [callback])`.
   * @property {Function} saturated - A callback that is called when the
   * `queue.length()` hits the concurrency and further tasks will be queued.
   * @property {Function} empty - A callback that is called when the last item
   * from the `queue` is given to a `worker`.
   * @property {Function} drain - A callback that is called when the last item
   * from the `queue` has returned from the `worker`.
   * @property {Function} idle - a function returning false if there are items
   * waiting or being processed, or true if not. Invoke like `cargo.idle()`.
   * @property {Function} pause - a function that pauses the processing of tasks
   * until `resume()` is called. Invoke like `cargo.pause()`.
   * @property {Function} resume - a function that resumes the processing of
   * queued tasks when the queue is paused. Invoke like `cargo.resume()`.
   * @property {Function} kill - a function that removes the `drain` callback and
   * empties remaining tasks from the queue forcing it to go idle. Invoke like `cargo.kill()`.
   */

  /**
   * Creates a `cargo` object with the specified payload. Tasks added to the
   * cargo will be processed altogether (up to the `payload` limit). If the
   * `worker` is in progress, the task is queued until it becomes available. Once
   * the `worker` has completed some tasks, each callback of those tasks is
   * called. Check out [these](https://camo.githubusercontent.com/6bbd36f4cf5b35a0f11a96dcd2e97711ffc2fb37/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130382f62626330636662302d356632392d313165322d393734662d3333393763363464633835382e676966) [animations](https://camo.githubusercontent.com/f4810e00e1c5f5f8addbe3e9f49064fd5d102699/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130312f38346339323036362d356632392d313165322d383134662d3964336430323431336266642e676966)
   * for how `cargo` and `queue` work.
   *
   * While [`queue`]{@link module:ControlFlow.queue} passes only one task to one of a group of workers
   * at a time, cargo passes an array of tasks to a single worker, repeating
   * when the worker is finished.
   *
   * @name cargo
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.queue]{@link module:ControlFlow.queue}
   * @category Control Flow
   * @param {Function} worker - An asynchronous function for processing an array
   * of queued tasks, which must call its `callback(err)` argument when finished,
   * with an optional `err` argument. Invoked with `(tasks, callback)`.
   * @param {number} [payload=Infinity] - An optional `integer` for determining
   * how many tasks should be processed per round; if omitted, the default is
   * unlimited.
   * @returns {module:ControlFlow.CargoObject} A cargo object to manage the tasks. Callbacks can
   * attached as certain properties to listen for specific events during the
   * lifecycle of the cargo and inner queue.
   * @example
   *
   * // create a cargo object with payload 2
   * var cargo = async.cargo(function(tasks, callback) {
   *     for (var i=0; i<tasks.length; i++) {
   *         console.log('hello ' + tasks[i].name);
   *     }
   *     callback();
   * }, 2);
   *
   * // add some items
   * cargo.push({name: 'foo'}, function(err) {
   *     console.log('finished processing foo');
   * });
   * cargo.push({name: 'bar'}, function(err) {
   *     console.log('finished processing bar');
   * });
   * cargo.push({name: 'baz'}, function(err) {
   *     console.log('finished processing baz');
   * });
   */
  function cargo(worker, payload) {
    return queue(worker, 1, payload);
  }

  /**
   * The same as [`eachOf`]{@link module:Collections.eachOf} but runs a maximum of `limit` async operations at a
   * time.
   *
   * @name eachOfLimit
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.eachOf]{@link module:Collections.eachOf}
   * @alias forEachOfLimit
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {number} limit - The maximum number of async operations at a time.
   * @param {Function} iteratee - A function to apply to each
   * item in `coll`. The `key` is the item's key, or index in the case of an
   * array. The iteratee is passed a `callback(err)` which must be called once it
   * has completed. If no error has occurred, the callback should be run without
   * arguments or with an explicit `null` argument. Invoked with
   * (item, key, callback).
   * @param {Function} [callback] - A callback which is called when all
   * `iteratee` functions have finished, or an error occurs. Invoked with (err).
   */
  function eachOfLimit(coll, limit, iteratee, callback) {
    _eachOfLimit(limit)(coll, iteratee, callback);
  }

  /**
   * The same as [`eachOf`]{@link module:Collections.eachOf} but runs only a single async operation at a time.
   *
   * @name eachOfSeries
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.eachOf]{@link module:Collections.eachOf}
   * @alias forEachOfSeries
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A function to apply to each item in `coll`. The
   * `key` is the item's key, or index in the case of an array. The iteratee is
   * passed a `callback(err)` which must be called once it has completed. If no
   * error has occurred, the callback should be run without arguments or with an
   * explicit `null` argument. Invoked with (item, key, callback).
   * @param {Function} [callback] - A callback which is called when all `iteratee`
   * functions have finished, or an error occurs. Invoked with (err).
   */
  var eachOfSeries = doLimit(eachOfLimit, 1);

  /**
   * Reduces `coll` into a single value using an async `iteratee` to return each
   * successive step. `memo` is the initial state of the reduction. This function
   * only operates in series.
   *
   * For performance reasons, it may make sense to split a call to this function
   * into a parallel map, and then use the normal `Array.prototype.reduce` on the
   * results. This function is for situations where each step in the reduction
   * needs to be async; if you can get the data before reducing it, then it's
   * probably a good idea to do so.
   *
   * @name reduce
   * @static
   * @memberOf module:Collections
   * @method
   * @alias inject
   * @alias foldl
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {*} memo - The initial state of the reduction.
   * @param {Function} iteratee - A function applied to each item in the
   * array to produce the next step in the reduction. The `iteratee` is passed a
   * `callback(err, reduction)` which accepts an optional error as its first
   * argument, and the state of the reduction as the second. If an error is
   * passed to the callback, the reduction is stopped and the main `callback` is
   * immediately called with the error. Invoked with (memo, item, callback).
   * @param {Function} [callback] - A callback which is called after all the
   * `iteratee` functions have finished. Result is the reduced value. Invoked with
   * (err, result).
   * @example
   *
   * async.reduce([1,2,3], 0, function(memo, item, callback) {
   *     // pointless async:
   *     process.nextTick(function() {
   *         callback(null, memo + item)
   *     });
   * }, function(err, result) {
   *     // result is now equal to the last value of memo, which is 6
   * });
   */
  function reduce(coll, memo, iteratee, callback) {
      callback = once(callback || noop);
      eachOfSeries(coll, function (x, i, callback) {
          iteratee(memo, x, function (err, v) {
              memo = v;
              callback(err);
          });
      }, function (err) {
          callback(err, memo);
      });
  }

  /**
   * Version of the compose function that is more natural to read. Each function
   * consumes the return value of the previous function. It is the equivalent of
   * [compose]{@link module:ControlFlow.compose} with the arguments reversed.
   *
   * Each function is executed with the `this` binding of the composed function.
   *
   * @name seq
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.compose]{@link module:ControlFlow.compose}
   * @category Control Flow
   * @param {...Function} functions - the asynchronous functions to compose
   * @returns {Function} a function that composes the `functions` in order
   * @example
   *
   * // Requires lodash (or underscore), express3 and dresende's orm2.
   * // Part of an app, that fetches cats of the logged user.
   * // This example uses `seq` function to avoid overnesting and error
   * // handling clutter.
   * app.get('/cats', function(request, response) {
   *     var User = request.models.User;
   *     async.seq(
   *         _.bind(User.get, User),  // 'User.get' has signature (id, callback(err, data))
   *         function(user, fn) {
   *             user.getCats(fn);      // 'getCats' has signature (callback(err, data))
   *         }
   *     )(req.session.user_id, function (err, cats) {
   *         if (err) {
   *             console.error(err);
   *             response.json({ status: 'error', message: err.message });
   *         } else {
   *             response.json({ status: 'ok', message: 'Cats found', data: cats });
   *         }
   *     });
   * });
   */
  var seq = rest(function seq(functions) {
      return rest(function (args) {
          var that = this;

          var cb = args[args.length - 1];
          if (typeof cb == 'function') {
              args.pop();
          } else {
              cb = noop;
          }

          reduce(functions, args, function (newargs, fn, cb) {
              fn.apply(that, newargs.concat([rest(function (err, nextargs) {
                  cb(err, nextargs);
              })]));
          }, function (err, results) {
              cb.apply(that, [err].concat(results));
          });
      });
  });

  /**
   * Creates a function which is a composition of the passed asynchronous
   * functions. Each function consumes the return value of the function that
   * follows. Composing functions `f()`, `g()`, and `h()` would produce the result
   * of `f(g(h()))`, only this version uses callbacks to obtain the return values.
   *
   * Each function is executed with the `this` binding of the composed function.
   *
   * @name compose
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @category Control Flow
   * @param {...Function} functions - the asynchronous functions to compose
   * @returns {Function} an asynchronous function that is the composed
   * asynchronous `functions`
   * @example
   *
   * function add1(n, callback) {
   *     setTimeout(function () {
   *         callback(null, n + 1);
   *     }, 10);
   * }
   *
   * function mul3(n, callback) {
   *     setTimeout(function () {
   *         callback(null, n * 3);
   *     }, 10);
   * }
   *
   * var add1mul3 = async.compose(mul3, add1);
   * add1mul3(4, function (err, result) {
   *     // result now equals 15
   * });
   */
  var compose = rest(function (args) {
    return seq.apply(null, args.reverse());
  });

  function concat$1(eachfn, arr, fn, callback) {
      var result = [];
      eachfn(arr, function (x, index, cb) {
          fn(x, function (err, y) {
              result = result.concat(y || []);
              cb(err);
          });
      }, function (err) {
          callback(err, result);
      });
  }

  /**
   * Like [`each`]{@link module:Collections.each}, except that it passes the key (or index) as the second argument
   * to the iteratee.
   *
   * @name eachOf
   * @static
   * @memberOf module:Collections
   * @method
   * @alias forEachOf
   * @category Collection
   * @see [async.each]{@link module:Collections.each}
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A function to apply to each
   * item in `coll`. The `key` is the item's key, or index in the case of an
   * array. The iteratee is passed a `callback(err)` which must be called once it
   * has completed. If no error has occurred, the callback should be run without
   * arguments or with an explicit `null` argument. Invoked with
   * (item, key, callback).
   * @param {Function} [callback] - A callback which is called when all
   * `iteratee` functions have finished, or an error occurs. Invoked with (err).
   * @example
   *
   * var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
   * var configs = {};
   *
   * async.forEachOf(obj, function (value, key, callback) {
   *     fs.readFile(__dirname + value, "utf8", function (err, data) {
   *         if (err) return callback(err);
   *         try {
   *             configs[key] = JSON.parse(data);
   *         } catch (e) {
   *             return callback(e);
   *         }
   *         callback();
   *     });
   * }, function (err) {
   *     if (err) console.error(err.message);
   *     // configs is now a map of JSON data
   *     doSomethingWith(configs);
   * });
   */
  var eachOf = doLimit(eachOfLimit, Infinity);

  function doParallel(fn) {
      return function (obj, iteratee, callback) {
          return fn(eachOf, obj, iteratee, callback);
      };
  }

  /**
   * Applies `iteratee` to each item in `coll`, concatenating the results. Returns
   * the concatenated list. The `iteratee`s are called in parallel, and the
   * results are concatenated as they return. There is no guarantee that the
   * results array will be returned in the original order of `coll` passed to the
   * `iteratee` function.
   *
   * @name concat
   * @static
   * @memberOf module:Collections
   * @method
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A function to apply to each item in `coll`.
   * The iteratee is passed a `callback(err, results)` which must be called once
   * it has completed with an error (which can be `null`) and an array of results.
   * Invoked with (item, callback).
   * @param {Function} [callback(err)] - A callback which is called after all the
   * `iteratee` functions have finished, or an error occurs. Results is an array
   * containing the concatenated results of the `iteratee` function. Invoked with
   * (err, results).
   * @example
   *
   * async.concat(['dir1','dir2','dir3'], fs.readdir, function(err, files) {
   *     // files is now a list of filenames that exist in the 3 directories
   * });
   */
  var concat = doParallel(concat$1);

  function doSeries(fn) {
      return function (obj, iteratee, callback) {
          return fn(eachOfSeries, obj, iteratee, callback);
      };
  }

  /**
   * The same as [`concat`]{@link module:Collections.concat} but runs only a single async operation at a time.
   *
   * @name concatSeries
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.concat]{@link module:Collections.concat}
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A function to apply to each item in `coll`.
   * The iteratee is passed a `callback(err, results)` which must be called once
   * it has completed with an error (which can be `null`) and an array of results.
   * Invoked with (item, callback).
   * @param {Function} [callback(err)] - A callback which is called after all the
   * `iteratee` functions have finished, or an error occurs. Results is an array
   * containing the concatenated results of the `iteratee` function. Invoked with
   * (err, results).
   */
  var concatSeries = doSeries(concat$1);

  /**
   * Returns a function that when called, calls-back with the values provided.
   * Useful as the first function in a [`waterfall`]{@link module:ControlFlow.waterfall}, or for plugging values in to
   * [`auto`]{@link module:ControlFlow.auto}.
   *
   * @name constant
   * @static
   * @memberOf module:Utils
   * @method
   * @category Util
   * @param {...*} arguments... - Any number of arguments to automatically invoke
   * callback with.
   * @returns {Function} Returns a function that when invoked, automatically
   * invokes the callback with the previous given arguments.
   * @example
   *
   * async.waterfall([
   *     async.constant(42),
   *     function (value, next) {
   *         // value === 42
   *     },
   *     //...
   * ], callback);
   *
   * async.waterfall([
   *     async.constant(filename, "utf8"),
   *     fs.readFile,
   *     function (fileData, next) {
   *         //...
   *     }
   *     //...
   * ], callback);
   *
   * async.auto({
   *     hostname: async.constant("https://server.net/"),
   *     port: findFreePort,
   *     launchServer: ["hostname", "port", function (options, cb) {
   *         startServer(options, cb);
   *     }],
   *     //...
   * }, callback);
   */
  var constant = rest(function (values) {
      var args = [null].concat(values);
      return initialParams(function (ignoredArgs, callback) {
          return callback.apply(this, args);
      });
  });

  /**
   * This method returns the first argument given to it.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'user': 'fred' };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  function _createTester(eachfn, check, getResult) {
      return function (arr, limit, iteratee, cb) {
          function done(err) {
              if (cb) {
                  if (err) {
                      cb(err);
                  } else {
                      cb(null, getResult(false));
                  }
              }
          }
          function wrappedIteratee(x, _, callback) {
              if (!cb) return callback();
              iteratee(x, function (err, v) {
                  if (cb) {
                      if (err) {
                          cb(err);
                          cb = iteratee = false;
                      } else if (check(v)) {
                          cb(null, getResult(true, x));
                          cb = iteratee = false;
                      }
                  }
                  callback();
              });
          }
          if (arguments.length > 3) {
              cb = cb || noop;
              eachfn(arr, limit, wrappedIteratee, done);
          } else {
              cb = iteratee;
              cb = cb || noop;
              iteratee = limit;
              eachfn(arr, wrappedIteratee, done);
          }
      };
  }

  function _findGetResult(v, x) {
      return x;
  }

  /**
   * Returns the first value in `coll` that passes an async truth test. The
   * `iteratee` is applied in parallel, meaning the first iteratee to return
   * `true` will fire the detect `callback` with that result. That means the
   * result might not be the first item in the original `coll` (in terms of order)
   * that passes the test.

   * If order within the original `coll` is important, then look at
   * [`detectSeries`]{@link module:Collections.detectSeries}.
   *
   * @name detect
   * @static
   * @memberOf module:Collections
   * @method
   * @alias find
   * @category Collections
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A truth test to apply to each item in `coll`.
   * The iteratee is passed a `callback(err, truthValue)` which must be called
   * with a boolean argument once it has completed. Invoked with (item, callback).
   * @param {Function} [callback] - A callback which is called as soon as any
   * iteratee returns `true`, or after all the `iteratee` functions have finished.
   * Result will be the first item in the array that passes the truth test
   * (iteratee) or the value `undefined` if none passed. Invoked with
   * (err, result).
   * @example
   *
   * async.detect(['file1','file2','file3'], function(filePath, callback) {
   *     fs.access(filePath, function(err) {
   *         callback(null, !err)
   *     });
   * }, function(err, result) {
   *     // result now equals the first file in the list that exists
   * });
   */
  var detect = _createTester(eachOf, identity, _findGetResult);

  /**
   * The same as [`detect`]{@link module:Collections.detect} but runs a maximum of `limit` async operations at a
   * time.
   *
   * @name detectLimit
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.detect]{@link module:Collections.detect}
   * @alias findLimit
   * @category Collections
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {number} limit - The maximum number of async operations at a time.
   * @param {Function} iteratee - A truth test to apply to each item in `coll`.
   * The iteratee is passed a `callback(err, truthValue)` which must be called
   * with a boolean argument once it has completed. Invoked with (item, callback).
   * @param {Function} [callback] - A callback which is called as soon as any
   * iteratee returns `true`, or after all the `iteratee` functions have finished.
   * Result will be the first item in the array that passes the truth test
   * (iteratee) or the value `undefined` if none passed. Invoked with
   * (err, result).
   */
  var detectLimit = _createTester(eachOfLimit, identity, _findGetResult);

  /**
   * The same as [`detect`]{@link module:Collections.detect} but runs only a single async operation at a time.
   *
   * @name detectSeries
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.detect]{@link module:Collections.detect}
   * @alias findSeries
   * @category Collections
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A truth test to apply to each item in `coll`.
   * The iteratee is passed a `callback(err, truthValue)` which must be called
   * with a boolean argument once it has completed. Invoked with (item, callback).
   * @param {Function} [callback] - A callback which is called as soon as any
   * iteratee returns `true`, or after all the `iteratee` functions have finished.
   * Result will be the first item in the array that passes the truth test
   * (iteratee) or the value `undefined` if none passed. Invoked with
   * (err, result).
   */
  var detectSeries = _createTester(eachOfSeries, identity, _findGetResult);

  function consoleFunc(name) {
      return rest(function (fn, args) {
          fn.apply(null, args.concat([rest(function (err, args) {
              if (typeof console === 'object') {
                  if (err) {
                      if (console.error) {
                          console.error(err);
                      }
                  } else if (console[name]) {
                      arrayEach(args, function (x) {
                          console[name](x);
                      });
                  }
              }
          })]));
      });
  }

  /**
   * Logs the result of an `async` function to the `console` using `console.dir`
   * to display the properties of the resulting object. Only works in Node.js or
   * in browsers that support `console.dir` and `console.error` (such as FF and
   * Chrome). If multiple arguments are returned from the async function,
   * `console.dir` is called on each argument in order.
   *
   * @name dir
   * @static
   * @memberOf module:Utils
   * @method
   * @category Util
   * @param {Function} function - The function you want to eventually apply all
   * arguments to.
   * @param {...*} arguments... - Any number of arguments to apply to the function.
   * @example
   *
   * // in a module
   * var hello = function(name, callback) {
   *     setTimeout(function() {
   *         callback(null, {hello: name});
   *     }, 1000);
   * };
   *
   * // in the node repl
   * node> async.dir(hello, 'world');
   * {hello: 'world'}
   */
  var dir = consoleFunc('dir');

  /**
   * The post-check version of [`during`]{@link module:ControlFlow.during}. To reflect the difference in
   * the order of operations, the arguments `test` and `fn` are switched.
   *
   * Also a version of [`doWhilst`]{@link module:ControlFlow.doWhilst} with asynchronous `test` function.
   * @name doDuring
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.during]{@link module:ControlFlow.during}
   * @category Control Flow
   * @param {Function} fn - A function which is called each time `test` passes.
   * The function is passed a `callback(err)`, which must be called once it has
   * completed with an optional `err` argument. Invoked with (callback).
   * @param {Function} test - asynchronous truth test to perform before each
   * execution of `fn`. Invoked with (...args, callback), where `...args` are the
   * non-error args from the previous callback of `fn`.
   * @param {Function} [callback] - A callback which is called after the test
   * function has failed and repeated execution of `fn` has stopped. `callback`
   * will be passed an error if one occured, otherwise `null`.
   */
  function doDuring(fn, test, callback) {
      callback = onlyOnce(callback || noop);

      var next = rest(function (err, args) {
          if (err) return callback(err);
          args.push(check);
          test.apply(this, args);
      });

      function check(err, truth) {
          if (err) return callback(err);
          if (!truth) return callback(null);
          fn(next);
      }

      check(null, true);
  }

  /**
   * The post-check version of [`whilst`]{@link module:ControlFlow.whilst}. To reflect the difference in
   * the order of operations, the arguments `test` and `iteratee` are switched.
   *
   * `doWhilst` is to `whilst` as `do while` is to `while` in plain JavaScript.
   *
   * @name doWhilst
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.whilst]{@link module:ControlFlow.whilst}
   * @category Control Flow
   * @param {Function} iteratee - A function which is called each time `test`
   * passes. The function is passed a `callback(err)`, which must be called once
   * it has completed with an optional `err` argument. Invoked with (callback).
   * @param {Function} test - synchronous truth test to perform after each
   * execution of `iteratee`. Invoked with Invoked with the non-error callback
   * results of `iteratee`.
   * @param {Function} [callback] - A callback which is called after the test
   * function has failed and repeated execution of `iteratee` has stopped.
   * `callback` will be passed an error and any arguments passed to the final
   * `iteratee`'s callback. Invoked with (err, [results]);
   */
  function doWhilst(iteratee, test, callback) {
      callback = onlyOnce(callback || noop);
      var next = rest(function (err, args) {
          if (err) return callback(err);
          if (test.apply(this, args)) return iteratee(next);
          callback.apply(null, [null].concat(args));
      });
      iteratee(next);
  }

  /**
   * Like ['doWhilst']{@link module:ControlFlow.doWhilst}, except the `test` is inverted. Note the
   * argument ordering differs from `until`.
   *
   * @name doUntil
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.doWhilst]{@link module:ControlFlow.doWhilst}
   * @category Control Flow
   * @param {Function} fn - A function which is called each time `test` fails.
   * The function is passed a `callback(err)`, which must be called once it has
   * completed with an optional `err` argument. Invoked with (callback).
   * @param {Function} test - synchronous truth test to perform after each
   * execution of `fn`. Invoked with the non-error callback results of `fn`.
   * @param {Function} [callback] - A callback which is called after the test
   * function has passed and repeated execution of `fn` has stopped. `callback`
   * will be passed an error and any arguments passed to the final `fn`'s
   * callback. Invoked with (err, [results]);
   */
  function doUntil(fn, test, callback) {
      doWhilst(fn, function () {
          return !test.apply(this, arguments);
      }, callback);
  }

  /**
   * Like [`whilst`]{@link module:ControlFlow.whilst}, except the `test` is an asynchronous function that
   * is passed a callback in the form of `function (err, truth)`. If error is
   * passed to `test` or `fn`, the main callback is immediately called with the
   * value of the error.
   *
   * @name during
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.whilst]{@link module:ControlFlow.whilst}
   * @category Control Flow
   * @param {Function} test - asynchronous truth test to perform before each
   * execution of `fn`. Invoked with (callback).
   * @param {Function} fn - A function which is called each time `test` passes.
   * The function is passed a `callback(err)`, which must be called once it has
   * completed with an optional `err` argument. Invoked with (callback).
   * @param {Function} [callback] - A callback which is called after the test
   * function has failed and repeated execution of `fn` has stopped. `callback`
   * will be passed an error, if one occured, otherwise `null`.
   * @example
   *
   * var count = 0;
   *
   * async.during(
   *     function (callback) {
   *         return callback(null, count < 5);
   *     },
   *     function (callback) {
   *         count++;
   *         setTimeout(callback, 1000);
   *     },
   *     function (err) {
   *         // 5 seconds have passed
   *     }
   * );
   */
  function during(test, fn, callback) {
      callback = onlyOnce(callback || noop);

      function next(err) {
          if (err) return callback(err);
          test(check);
      }

      function check(err, truth) {
          if (err) return callback(err);
          if (!truth) return callback(null);
          fn(next);
      }

      test(check);
  }

  function _withoutIndex(iteratee) {
      return function (value, index, callback) {
          return iteratee(value, callback);
      };
  }

  /**
   * The same as [`each`]{@link module:Collections.each} but runs a maximum of `limit` async operations at a time.
   *
   * @name eachLimit
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.each]{@link module:Collections.each}
   * @alias forEachLimit
   * @category Collection
   * @param {Array|Iterable|Object} coll - A colleciton to iterate over.
   * @param {number} limit - The maximum number of async operations at a time.
   * @param {Function} iteratee - A function to apply to each item in `coll`. The
   * iteratee is passed a `callback(err)` which must be called once it has
   * completed. If no error has occurred, the `callback` should be run without
   * arguments or with an explicit `null` argument. The array index is not passed
   * to the iteratee. Invoked with (item, callback). If you need the index, use
   * `eachOfLimit`.
   * @param {Function} [callback] - A callback which is called when all
   * `iteratee` functions have finished, or an error occurs. Invoked with (err).
   */
  function eachLimit(coll, limit, iteratee, callback) {
    _eachOfLimit(limit)(coll, _withoutIndex(iteratee), callback);
  }

  /**
   * Applies the function `iteratee` to each item in `coll`, in parallel.
   * The `iteratee` is called with an item from the list, and a callback for when
   * it has finished. If the `iteratee` passes an error to its `callback`, the
   * main `callback` (for the `each` function) is immediately called with the
   * error.
   *
   * Note, that since this function applies `iteratee` to each item in parallel,
   * there is no guarantee that the iteratee functions will complete in order.
   *
   * @name each
   * @static
   * @memberOf module:Collections
   * @method
   * @alias forEach
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A function to apply to each item
   * in `coll`. The iteratee is passed a `callback(err)` which must be called once
   * it has completed. If no error has occurred, the `callback` should be run
   * without arguments or with an explicit `null` argument. The array index is not
   * passed to the iteratee. Invoked with (item, callback). If you need the index,
   * use `eachOf`.
   * @param {Function} [callback] - A callback which is called when all
   * `iteratee` functions have finished, or an error occurs. Invoked with (err).
   * @example
   *
   * // assuming openFiles is an array of file names and saveFile is a function
   * // to save the modified contents of that file:
   *
   * async.each(openFiles, saveFile, function(err){
   *   // if any of the saves produced an error, err would equal that error
   * });
   *
   * // assuming openFiles is an array of file names
   * async.each(openFiles, function(file, callback) {
   *
   *     // Perform operation on file here.
   *     console.log('Processing file ' + file);
   *
   *     if( file.length > 32 ) {
   *       console.log('This file name is too long');
   *       callback('File name too long');
   *     } else {
   *       // Do work to process file here
   *       console.log('File processed');
   *       callback();
   *     }
   * }, function(err) {
   *     // if any of the file processing produced an error, err would equal that error
   *     if( err ) {
   *       // One of the iterations produced an error.
   *       // All processing will now stop.
   *       console.log('A file failed to process');
   *     } else {
   *       console.log('All files have been processed successfully');
   *     }
   * });
   */
  var each = doLimit(eachLimit, Infinity);

  /**
   * The same as [`each`]{@link module:Collections.each} but runs only a single async operation at a time.
   *
   * @name eachSeries
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.each]{@link module:Collections.each}
   * @alias forEachSeries
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A function to apply to each
   * item in `coll`. The iteratee is passed a `callback(err)` which must be called
   * once it has completed. If no error has occurred, the `callback` should be run
   * without arguments or with an explicit `null` argument. The array index is
   * not passed to the iteratee. Invoked with (item, callback). If you need the
   * index, use `eachOfSeries`.
   * @param {Function} [callback] - A callback which is called when all
   * `iteratee` functions have finished, or an error occurs. Invoked with (err).
   */
  var eachSeries = doLimit(eachLimit, 1);

  /**
   * Wrap an async function and ensure it calls its callback on a later tick of
   * the event loop.  If the function already calls its callback on a next tick,
   * no extra deferral is added. This is useful for preventing stack overflows
   * (`RangeError: Maximum call stack size exceeded`) and generally keeping
   * [Zalgo](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)
   * contained.
   *
   * @name ensureAsync
   * @static
   * @memberOf module:Utils
   * @method
   * @category Util
   * @param {Function} fn - an async function, one that expects a node-style
   * callback as its last argument.
   * @returns {Function} Returns a wrapped function with the exact same call
   * signature as the function passed in.
   * @example
   *
   * function sometimesAsync(arg, callback) {
   *     if (cache[arg]) {
   *         return callback(null, cache[arg]); // this would be synchronous!!
   *     } else {
   *         doSomeIO(arg, callback); // this IO would be asynchronous
   *     }
   * }
   *
   * // this has a risk of stack overflows if many results are cached in a row
   * async.mapSeries(args, sometimesAsync, done);
   *
   * // this will defer sometimesAsync's callback if necessary,
   * // preventing stack overflows
   * async.mapSeries(args, async.ensureAsync(sometimesAsync), done);
   */
  function ensureAsync(fn) {
      return initialParams(function (args, callback) {
          var sync = true;
          args.push(function () {
              var innerArgs = arguments;
              if (sync) {
                  setImmediate$1(function () {
                      callback.apply(null, innerArgs);
                  });
              } else {
                  callback.apply(null, innerArgs);
              }
          });
          fn.apply(this, args);
          sync = false;
      });
  }

  function notId(v) {
      return !v;
  }

  /**
   * The same as [`every`]{@link module:Collections.every} but runs a maximum of `limit` async operations at a time.
   *
   * @name everyLimit
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.every]{@link module:Collections.every}
   * @alias allLimit
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {number} limit - The maximum number of async operations at a time.
   * @param {Function} iteratee - A truth test to apply to each item in the
   * collection in parallel. The iteratee is passed a `callback(err, truthValue)`
   * which must be called with a  boolean argument once it has completed. Invoked
   * with (item, callback).
   * @param {Function} [callback] - A callback which is called after all the
   * `iteratee` functions have finished. Result will be either `true` or `false`
   * depending on the values of the async tests. Invoked with (err, result).
   */
  var everyLimit = _createTester(eachOfLimit, notId, notId);

  /**
   * Returns `true` if every element in `coll` satisfies an async test. If any
   * iteratee call returns `false`, the main `callback` is immediately called.
   *
   * @name every
   * @static
   * @memberOf module:Collections
   * @method
   * @alias all
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A truth test to apply to each item in the
   * collection in parallel. The iteratee is passed a `callback(err, truthValue)`
   * which must be called with a  boolean argument once it has completed. Invoked
   * with (item, callback).
   * @param {Function} [callback] - A callback which is called after all the
   * `iteratee` functions have finished. Result will be either `true` or `false`
   * depending on the values of the async tests. Invoked with (err, result).
   * @example
   *
   * async.every(['file1','file2','file3'], function(filePath, callback) {
   *     fs.access(filePath, function(err) {
   *         callback(null, !err)
   *     });
   * }, function(err, result) {
   *     // if result is true then every file exists
   * });
   */
  var every = doLimit(everyLimit, Infinity);

  /**
   * The same as [`every`]{@link module:Collections.every} but runs only a single async operation at a time.
   *
   * @name everySeries
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.every]{@link module:Collections.every}
   * @alias allSeries
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A truth test to apply to each item in the
   * collection in parallel. The iteratee is passed a `callback(err, truthValue)`
   * which must be called with a  boolean argument once it has completed. Invoked
   * with (item, callback).
   * @param {Function} [callback] - A callback which is called after all the
   * `iteratee` functions have finished. Result will be either `true` or `false`
   * depending on the values of the async tests. Invoked with (err, result).
   */
  var everySeries = doLimit(everyLimit, 1);

  function _filter(eachfn, arr, iteratee, callback) {
      callback = once(callback || noop);
      var results = [];
      eachfn(arr, function (x, index, callback) {
          iteratee(x, function (err, v) {
              if (err) {
                  callback(err);
              } else {
                  if (v) {
                      results.push({ index: index, value: x });
                  }
                  callback();
              }
          });
      }, function (err) {
          if (err) {
              callback(err);
          } else {
              callback(null, arrayMap(results.sort(function (a, b) {
                  return a.index - b.index;
              }), baseProperty('value')));
          }
      });
  }

  /**
   * The same as [`filter`]{@link module:Collections.filter} but runs a maximum of `limit` async operations at a
   * time.
   *
   * @name filterLimit
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.filter]{@link module:Collections.filter}
   * @alias selectLimit
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {number} limit - The maximum number of async operations at a time.
   * @param {Function} iteratee - A truth test to apply to each item in `coll`.
   * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
   * with a boolean argument once it has completed. Invoked with (item, callback).
   * @param {Function} [callback] - A callback which is called after all the
   * `iteratee` functions have finished. Invoked with (err, results).
   */
  var filterLimit = doParallelLimit(_filter);

  /**
   * Returns a new array of all the values in `coll` which pass an async truth
   * test. This operation is performed in parallel, but the results array will be
   * in the same order as the original.
   *
   * @name filter
   * @static
   * @memberOf module:Collections
   * @method
   * @alias select
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A truth test to apply to each item in `coll`.
   * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
   * with a boolean argument once it has completed. Invoked with (item, callback).
   * @param {Function} [callback] - A callback which is called after all the
   * `iteratee` functions have finished. Invoked with (err, results).
   * @example
   *
   * async.filter(['file1','file2','file3'], function(filePath, callback) {
   *     fs.access(filePath, function(err) {
   *         callback(null, !err)
   *     });
   * }, function(err, results) {
   *     // results now equals an array of the existing files
   * });
   */
  var filter = doLimit(filterLimit, Infinity);

  /**
   * The same as [`filter`]{@link module:Collections.filter} but runs only a single async operation at a time.
   *
   * @name filterSeries
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.filter]{@link module:Collections.filter}
   * @alias selectSeries
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A truth test to apply to each item in `coll`.
   * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
   * with a boolean argument once it has completed. Invoked with (item, callback).
   * @param {Function} [callback] - A callback which is called after all the
   * `iteratee` functions have finished. Invoked with (err, results)
   */
  var filterSeries = doLimit(filterLimit, 1);

  /**
   * Calls the asynchronous function `fn` with a callback parameter that allows it
   * to call itself again, in series, indefinitely.

   * If an error is passed to the
   * callback then `errback` is called with the error, and execution stops,
   * otherwise it will never be called.
   *
   * @name forever
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @category Control Flow
   * @param {Function} fn - a function to call repeatedly. Invoked with (next).
   * @param {Function} [errback] - when `fn` passes an error to it's callback,
   * this function will be called, and execution stops. Invoked with (err).
   * @example
   *
   * async.forever(
   *     function(next) {
   *         // next is suitable for passing to things that need a callback(err [, whatever]);
   *         // it will result in this function being called again.
   *     },
   *     function(err) {
   *         // if next is called with a value in its first parameter, it will appear
   *         // in here as 'err', and execution will stop.
   *     }
   * );
   */
  function forever(fn, errback) {
      var done = onlyOnce(errback || noop);
      var task = ensureAsync(fn);

      function next(err) {
          if (err) return done(err);
          task(next);
      }
      next();
  }

  /**
   * Logs the result of an `async` function to the `console`. Only works in
   * Node.js or in browsers that support `console.log` and `console.error` (such
   * as FF and Chrome). If multiple arguments are returned from the async
   * function, `console.log` is called on each argument in order.
   *
   * @name log
   * @static
   * @memberOf module:Utils
   * @method
   * @category Util
   * @param {Function} function - The function you want to eventually apply all
   * arguments to.
   * @param {...*} arguments... - Any number of arguments to apply to the function.
   * @example
   *
   * // in a module
   * var hello = function(name, callback) {
   *     setTimeout(function() {
   *         callback(null, 'hello ' + name);
   *     }, 1000);
   * };
   *
   * // in the node repl
   * node> async.log(hello, 'world');
   * 'hello world'
   */
  var log = consoleFunc('log');

  /**
   * The same as [`mapValues`]{@link module:Collections.mapValues} but runs a maximum of `limit` async operations at a
   * time.
   *
   * @name mapValuesLimit
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.mapValues]{@link module:Collections.mapValues}
   * @category Collection
   * @param {Object} obj - A collection to iterate over.
   * @param {number} limit - The maximum number of async operations at a time.
   * @param {Function} iteratee - A function to apply to each value in `obj`.
   * The iteratee is passed a `callback(err, transformed)` which must be called
   * once it has completed with an error (which can be `null`) and a
   * transformed value. Invoked with (value, key, callback).
   * @param {Function} [callback] - A callback which is called when all `iteratee`
   * functions have finished, or an error occurs. Result is an object of the
   * transformed values from the `obj`. Invoked with (err, result).
   */
  function mapValuesLimit(obj, limit, iteratee, callback) {
      callback = once(callback || noop);
      var newObj = {};
      eachOfLimit(obj, limit, function (val, key, next) {
          iteratee(val, key, function (err, result) {
              if (err) return next(err);
              newObj[key] = result;
              next();
          });
      }, function (err) {
          callback(err, newObj);
      });
  }

  /**
   * A relative of [`map`]{@link module:Collections.map}, designed for use with objects.
   *
   * Produces a new Object by mapping each value of `obj` through the `iteratee`
   * function. The `iteratee` is called each `value` and `key` from `obj` and a
   * callback for when it has finished processing. Each of these callbacks takes
   * two arguments: an `error`, and the transformed item from `obj`. If `iteratee`
   * passes an error to its callback, the main `callback` (for the `mapValues`
   * function) is immediately called with the error.
   *
   * Note, the order of the keys in the result is not guaranteed.  The keys will
   * be roughly in the order they complete, (but this is very engine-specific)
   *
   * @name mapValues
   * @static
   * @memberOf module:Collections
   * @method
   * @category Collection
   * @param {Object} obj - A collection to iterate over.
   * @param {Function} iteratee - A function to apply to each value and key in
   * `coll`. The iteratee is passed a `callback(err, transformed)` which must be
   * called once it has completed with an error (which can be `null`) and a
   * transformed value. Invoked with (value, key, callback).
   * @param {Function} [callback] - A callback which is called when all `iteratee`
   * functions have finished, or an error occurs. Results is an array of the
   * transformed items from the `obj`. Invoked with (err, result).
   * @example
   *
   * async.mapValues({
   *     f1: 'file1',
   *     f2: 'file2',
   *     f3: 'file3'
   * }, function (file, key, callback) {
   *   fs.stat(file, callback);
   * }, function(err, result) {
   *     // results is now a map of stats for each file, e.g.
   *     // {
   *     //     f1: [stats for file1],
   *     //     f2: [stats for file2],
   *     //     f3: [stats for file3]
   *     // }
   * });
   */

  var mapValues = doLimit(mapValuesLimit, Infinity);

  /**
   * The same as [`mapValues`]{@link module:Collections.mapValues} but runs only a single async operation at a time.
   *
   * @name mapValuesSeries
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.mapValues]{@link module:Collections.mapValues}
   * @category Collection
   * @param {Object} obj - A collection to iterate over.
   * @param {Function} iteratee - A function to apply to each value in `obj`.
   * The iteratee is passed a `callback(err, transformed)` which must be called
   * once it has completed with an error (which can be `null`) and a
   * transformed value. Invoked with (value, key, callback).
   * @param {Function} [callback] - A callback which is called when all `iteratee`
   * functions have finished, or an error occurs. Result is an object of the
   * transformed values from the `obj`. Invoked with (err, result).
   */
  var mapValuesSeries = doLimit(mapValuesLimit, 1);

  function has(obj, key) {
      return key in obj;
  }

  /**
   * Caches the results of an `async` function. When creating a hash to store
   * function results against, the callback is omitted from the hash and an
   * optional hash function can be used.
   *
   * If no hash function is specified, the first argument is used as a hash key,
   * which may work reasonably if it is a string or a data type that converts to a
   * distinct string. Note that objects and arrays will not behave reasonably.
   * Neither will cases where the other arguments are significant. In such cases,
   * specify your own hash function.
   *
   * The cache of results is exposed as the `memo` property of the function
   * returned by `memoize`.
   *
   * @name memoize
   * @static
   * @memberOf module:Utils
   * @method
   * @category Util
   * @param {Function} fn - The function to proxy and cache results from.
   * @param {Function} hasher - An optional function for generating a custom hash
   * for storing results. It has all the arguments applied to it apart from the
   * callback, and must be synchronous.
   * @returns {Function} a memoized version of `fn`
   * @example
   *
   * var slow_fn = function(name, callback) {
   *     // do something
   *     callback(null, result);
   * };
   * var fn = async.memoize(slow_fn);
   *
   * // fn can now be used as if it were slow_fn
   * fn('some name', function() {
   *     // callback
   * });
   */
  function memoize(fn, hasher) {
      var memo = Object.create(null);
      var queues = Object.create(null);
      hasher = hasher || identity;
      var memoized = initialParams(function memoized(args, callback) {
          var key = hasher.apply(null, args);
          if (has(memo, key)) {
              setImmediate$1(function () {
                  callback.apply(null, memo[key]);
              });
          } else if (has(queues, key)) {
              queues[key].push(callback);
          } else {
              queues[key] = [callback];
              fn.apply(null, args.concat([rest(function (args) {
                  memo[key] = args;
                  var q = queues[key];
                  delete queues[key];
                  for (var i = 0, l = q.length; i < l; i++) {
                      q[i].apply(null, args);
                  }
              })]));
          }
      });
      memoized.memo = memo;
      memoized.unmemoized = fn;
      return memoized;
  }

  /**
   * Calls `callback` on a later loop around the event loop. In Node.js this just
   * calls `setImmediate`.  In the browser it will use `setImmediate` if
   * available, otherwise `setTimeout(callback, 0)`, which means other higher
   * priority events may precede the execution of `callback`.
   *
   * This is used internally for browser-compatibility purposes.
   *
   * @name nextTick
   * @static
   * @memberOf module:Utils
   * @method
   * @alias setImmediate
   * @category Util
   * @param {Function} callback - The function to call on a later loop around
   * the event loop. Invoked with (args...).
   * @param {...*} args... - any number of additional arguments to pass to the
   * callback on the next tick.
   * @example
   *
   * var call_order = [];
   * async.nextTick(function() {
   *     call_order.push('two');
   *     // call_order now equals ['one','two']
   * });
   * call_order.push('one');
   *
   * async.setImmediate(function (a, b, c) {
   *     // a, b, and c equal 1, 2, and 3
   * }, 1, 2, 3);
   */
  var _defer$1;

  if (hasNextTick) {
      _defer$1 = process.nextTick;
  } else if (hasSetImmediate) {
      _defer$1 = setImmediate;
  } else {
      _defer$1 = fallback;
  }

  var nextTick = wrap(_defer$1);

  function _parallel(eachfn, tasks, callback) {
      callback = callback || noop;
      var results = isArrayLike(tasks) ? [] : {};

      eachfn(tasks, function (task, key, callback) {
          task(rest(function (err, args) {
              if (args.length <= 1) {
                  args = args[0];
              }
              results[key] = args;
              callback(err);
          }));
      }, function (err) {
          callback(err, results);
      });
  }

  /**
   * The same as [`parallel`]{@link module:ControlFlow.parallel} but runs a maximum of `limit` async operations at a
   * time.
   *
   * @name parallelLimit
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.parallel]{@link module:ControlFlow.parallel}
   * @category Control Flow
   * @param {Array|Collection} tasks - A collection containing functions to run.
   * Each function is passed a `callback(err, result)` which it must call on
   * completion with an error `err` (which can be `null`) and an optional `result`
   * value.
   * @param {number} limit - The maximum number of async operations at a time.
   * @param {Function} [callback] - An optional callback to run once all the
   * functions have completed successfully. This function gets a results array
   * (or object) containing all the result arguments passed to the task callbacks.
   * Invoked with (err, results).
   */
  function parallelLimit(tasks, limit, callback) {
    _parallel(_eachOfLimit(limit), tasks, callback);
  }

  /**
   * Run the `tasks` collection of functions in parallel, without waiting until
   * the previous function has completed. If any of the functions pass an error to
   * its callback, the main `callback` is immediately called with the value of the
   * error. Once the `tasks` have completed, the results are passed to the final
   * `callback` as an array.
   *
   * **Note:** `parallel` is about kicking-off I/O tasks in parallel, not about
   * parallel execution of code.  If your tasks do not use any timers or perform
   * any I/O, they will actually be executed in series.  Any synchronous setup
   * sections for each task will happen one after the other.  JavaScript remains
   * single-threaded.
   *
   * It is also possible to use an object instead of an array. Each property will
   * be run as a function and the results will be passed to the final `callback`
   * as an object instead of an array. This can be a more readable way of handling
   * results from {@link async.parallel}.
   *
   * @name parallel
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @category Control Flow
   * @param {Array|Iterable|Object} tasks - A collection containing functions to run.
   * Each function is passed a `callback(err, result)` which it must call on
   * completion with an error `err` (which can be `null`) and an optional `result`
   * value.
   * @param {Function} [callback] - An optional callback to run once all the
   * functions have completed successfully. This function gets a results array
   * (or object) containing all the result arguments passed to the task callbacks.
   * Invoked with (err, results).
   * @example
   * async.parallel([
   *     function(callback) {
   *         setTimeout(function() {
   *             callback(null, 'one');
   *         }, 200);
   *     },
   *     function(callback) {
   *         setTimeout(function() {
   *             callback(null, 'two');
   *         }, 100);
   *     }
   * ],
   * // optional callback
   * function(err, results) {
   *     // the results array will equal ['one','two'] even though
   *     // the second function had a shorter timeout.
   * });
   *
   * // an example using an object instead of an array
   * async.parallel({
   *     one: function(callback) {
   *         setTimeout(function() {
   *             callback(null, 1);
   *         }, 200);
   *     },
   *     two: function(callback) {
   *         setTimeout(function() {
   *             callback(null, 2);
   *         }, 100);
   *     }
   * }, function(err, results) {
   *     // results is now equals to: {one: 1, two: 2}
   * });
   */
  var parallel = doLimit(parallelLimit, Infinity);

  /**
   * A queue of tasks for the worker function to complete.
   * @typedef {Object} QueueObject
   * @memberOf module:ControlFlow
   * @property {Function} length - a function returning the number of items
   * waiting to be processed. Invoke with `queue.length()`.
   * @property {Function} started - a function returning whether or not any
   * items have been pushed and processed by the queue. Invoke with `queue.started()`.
   * @property {Function} running - a function returning the number of items
   * currently being processed. Invoke with `queue.running()`.
   * @property {Function} workersList - a function returning the array of items
   * currently being processed. Invoke with `queue.workersList()`.
   * @property {Function} idle - a function returning false if there are items
   * waiting or being processed, or true if not. Invoke with `queue.idle()`.
   * @property {number} concurrency - an integer for determining how many `worker`
   * functions should be run in parallel. This property can be changed after a
   * `queue` is created to alter the concurrency on-the-fly.
   * @property {Function} push - add a new task to the `queue`. Calls `callback`
   * once the `worker` has finished processing the task. Instead of a single task,
   * a `tasks` array can be submitted. The respective callback is used for every
   * task in the list. Invoke with `queue.push(task, [callback])`,
   * @property {Function} unshift - add a new task to the front of the `queue`.
   * Invoke with `queue.unshift(task, [callback])`.
   * @property {Function} saturated - a callback that is called when the number of
   * running workers hits the `concurrency` limit, and further tasks will be
   * queued.
   * @property {Function} unsaturated - a callback that is called when the number
   * of running workers is less than the `concurrency` & `buffer` limits, and
   * further tasks will not be queued.
   * @property {number} buffer - A minimum threshold buffer in order to say that
   * the `queue` is `unsaturated`.
   * @property {Function} empty - a callback that is called when the last item
   * from the `queue` is given to a `worker`.
   * @property {Function} drain - a callback that is called when the last item
   * from the `queue` has returned from the `worker`.
   * @property {Function} error - a callback that is called when a task errors.
   * Has the signature `function(error, task)`.
   * @property {boolean} paused - a boolean for determining whether the queue is
   * in a paused state.
   * @property {Function} pause - a function that pauses the processing of tasks
   * until `resume()` is called. Invoke with `queue.pause()`.
   * @property {Function} resume - a function that resumes the processing of
   * queued tasks when the queue is paused. Invoke with `queue.resume()`.
   * @property {Function} kill - a function that removes the `drain` callback and
   * empties remaining tasks from the queue forcing it to go idle. Invoke with `queue.kill()`.
   */

  /**
   * Creates a `queue` object with the specified `concurrency`. Tasks added to the
   * `queue` are processed in parallel (up to the `concurrency` limit). If all
   * `worker`s are in progress, the task is queued until one becomes available.
   * Once a `worker` completes a `task`, that `task`'s callback is called.
   *
   * @name queue
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @category Control Flow
   * @param {Function} worker - An asynchronous function for processing a queued
   * task, which must call its `callback(err)` argument when finished, with an
   * optional `error` as an argument.  If you want to handle errors from an
   * individual task, pass a callback to `q.push()`. Invoked with
   * (task, callback).
   * @param {number} [concurrency=1] - An `integer` for determining how many
   * `worker` functions should be run in parallel.  If omitted, the concurrency
   * defaults to `1`.  If the concurrency is `0`, an error is thrown.
   * @returns {module:ControlFlow.QueueObject} A queue object to manage the tasks. Callbacks can
   * attached as certain properties to listen for specific events during the
   * lifecycle of the queue.
   * @example
   *
   * // create a queue object with concurrency 2
   * var q = async.queue(function(task, callback) {
   *     console.log('hello ' + task.name);
   *     callback();
   * }, 2);
   *
   * // assign a callback
   * q.drain = function() {
   *     console.log('all items have been processed');
   * };
   *
   * // add some items to the queue
   * q.push({name: 'foo'}, function(err) {
   *     console.log('finished processing foo');
   * });
   * q.push({name: 'bar'}, function (err) {
   *     console.log('finished processing bar');
   * });
   *
   * // add some items to the queue (batch-wise)
   * q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
   *     console.log('finished processing item');
   * });
   *
   * // add some items to the front of the queue
   * q.unshift({name: 'bar'}, function (err) {
   *     console.log('finished processing bar');
   * });
   */
  function queue$1 (worker, concurrency) {
    return queue(function (items, cb) {
      worker(items[0], cb);
    }, concurrency, 1);
  }

  /**
   * The same as [async.queue]{@link module:ControlFlow.queue} only tasks are assigned a priority and
   * completed in ascending priority order.
   *
   * @name priorityQueue
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.queue]{@link module:ControlFlow.queue}
   * @category Control Flow
   * @param {Function} worker - An asynchronous function for processing a queued
   * task, which must call its `callback(err)` argument when finished, with an
   * optional `error` as an argument.  If you want to handle errors from an
   * individual task, pass a callback to `q.push()`. Invoked with
   * (task, callback).
   * @param {number} concurrency - An `integer` for determining how many `worker`
   * functions should be run in parallel.  If omitted, the concurrency defaults to
   * `1`.  If the concurrency is `0`, an error is thrown.
   * @returns {module:ControlFlow.QueueObject} A priorityQueue object to manage the tasks. There are two
   * differences between `queue` and `priorityQueue` objects:
   * * `push(task, priority, [callback])` - `priority` should be a number. If an
   *   array of `tasks` is given, all tasks will be assigned the same priority.
   * * The `unshift` method was removed.
   */
  function priorityQueue (worker, concurrency) {
      // Start with a normal queue
      var q = queue$1(worker, concurrency);

      // Override push to accept second parameter representing priority
      q.push = function (data, priority, callback) {
          if (callback == null) callback = noop;
          if (typeof callback !== 'function') {
              throw new Error('task callback must be a function');
          }
          q.started = true;
          if (!isArray(data)) {
              data = [data];
          }
          if (data.length === 0) {
              // call drain immediately if there are no tasks
              return setImmediate$1(function () {
                  q.drain();
              });
          }

          priority = priority || 0;
          var nextNode = q._tasks.head;
          while (nextNode && priority >= nextNode.priority) {
              nextNode = nextNode.next;
          }

          arrayEach(data, function (task) {
              var item = {
                  data: task,
                  priority: priority,
                  callback: callback
              };

              if (nextNode) {
                  q._tasks.insertBefore(nextNode, item);
              } else {
                  q._tasks.push(item);
              }
          });
          setImmediate$1(q.process);
      };

      // Remove unshift function
      delete q.unshift;

      return q;
  }

  /**
   * Runs the `tasks` array of functions in parallel, without waiting until the
   * previous function has completed. Once any the `tasks` completed or pass an
   * error to its callback, the main `callback` is immediately called. It's
   * equivalent to `Promise.race()`.
   *
   * @name race
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @category Control Flow
   * @param {Array} tasks - An array containing functions to run. Each function
   * is passed a `callback(err, result)` which it must call on completion with an
   * error `err` (which can be `null`) and an optional `result` value.
   * @param {Function} callback - A callback to run once any of the functions have
   * completed. This function gets an error or result from the first function that
   * completed. Invoked with (err, result).
   * @returns undefined
   * @example
   *
   * async.race([
   *     function(callback) {
   *         setTimeout(function() {
   *             callback(null, 'one');
   *         }, 200);
   *     },
   *     function(callback) {
   *         setTimeout(function() {
   *             callback(null, 'two');
   *         }, 100);
   *     }
   * ],
   * // main callback
   * function(err, result) {
   *     // the result will be equal to 'two' as it finishes earlier
   * });
   */
  function race(tasks, callback) {
      callback = once(callback || noop);
      if (!isArray(tasks)) return callback(new TypeError('First argument to race must be an array of functions'));
      if (!tasks.length) return callback();
      arrayEach(tasks, function (task) {
          task(callback);
      });
  }

  var slice = Array.prototype.slice;

  /**
   * Same as [`reduce`]{@link module:Collections.reduce}, only operates on `array` in reverse order.
   *
   * @name reduceRight
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.reduce]{@link module:Collections.reduce}
   * @alias foldr
   * @category Collection
   * @param {Array} array - A collection to iterate over.
   * @param {*} memo - The initial state of the reduction.
   * @param {Function} iteratee - A function applied to each item in the
   * array to produce the next step in the reduction. The `iteratee` is passed a
   * `callback(err, reduction)` which accepts an optional error as its first
   * argument, and the state of the reduction as the second. If an error is
   * passed to the callback, the reduction is stopped and the main `callback` is
   * immediately called with the error. Invoked with (memo, item, callback).
   * @param {Function} [callback] - A callback which is called after all the
   * `iteratee` functions have finished. Result is the reduced value. Invoked with
   * (err, result).
   */
  function reduceRight(array, memo, iteratee, callback) {
    var reversed = slice.call(array).reverse();
    reduce(reversed, memo, iteratee, callback);
  }

  /**
   * Wraps the function in another function that always returns data even when it
   * errors.
   *
   * The object returned has either the property `error` or `value`.
   *
   * @name reflect
   * @static
   * @memberOf module:Utils
   * @method
   * @category Util
   * @param {Function} fn - The function you want to wrap
   * @returns {Function} - A function that always passes null to it's callback as
   * the error. The second argument to the callback will be an `object` with
   * either an `error` or a `value` property.
   * @example
   *
   * async.parallel([
   *     async.reflect(function(callback) {
   *         // do some stuff ...
   *         callback(null, 'one');
   *     }),
   *     async.reflect(function(callback) {
   *         // do some more stuff but error ...
   *         callback('bad stuff happened');
   *     }),
   *     async.reflect(function(callback) {
   *         // do some more stuff ...
   *         callback(null, 'two');
   *     })
   * ],
   * // optional callback
   * function(err, results) {
   *     // values
   *     // results[0].value = 'one'
   *     // results[1].error = 'bad stuff happened'
   *     // results[2].value = 'two'
   * });
   */
  function reflect(fn) {
      return initialParams(function reflectOn(args, reflectCallback) {
          args.push(rest(function callback(err, cbArgs) {
              if (err) {
                  reflectCallback(null, {
                      error: err
                  });
              } else {
                  var value = null;
                  if (cbArgs.length === 1) {
                      value = cbArgs[0];
                  } else if (cbArgs.length > 1) {
                      value = cbArgs;
                  }
                  reflectCallback(null, {
                      value: value
                  });
              }
          }));

          return fn.apply(this, args);
      });
  }

  function reject$1(eachfn, arr, iteratee, callback) {
      _filter(eachfn, arr, function (value, cb) {
          iteratee(value, function (err, v) {
              if (err) {
                  cb(err);
              } else {
                  cb(null, !v);
              }
          });
      }, callback);
  }

  /**
   * The same as [`reject`]{@link module:Collections.reject} but runs a maximum of `limit` async operations at a
   * time.
   *
   * @name rejectLimit
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.reject]{@link module:Collections.reject}
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {number} limit - The maximum number of async operations at a time.
   * @param {Function} iteratee - A truth test to apply to each item in `coll`.
   * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
   * with a boolean argument once it has completed. Invoked with (item, callback).
   * @param {Function} [callback] - A callback which is called after all the
   * `iteratee` functions have finished. Invoked with (err, results).
   */
  var rejectLimit = doParallelLimit(reject$1);

  /**
   * The opposite of [`filter`]{@link module:Collections.filter}. Removes values that pass an `async` truth test.
   *
   * @name reject
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.filter]{@link module:Collections.filter}
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A truth test to apply to each item in `coll`.
   * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
   * with a boolean argument once it has completed. Invoked with (item, callback).
   * @param {Function} [callback] - A callback which is called after all the
   * `iteratee` functions have finished. Invoked with (err, results).
   * @example
   *
   * async.reject(['file1','file2','file3'], function(filePath, callback) {
   *     fs.access(filePath, function(err) {
   *         callback(null, !err)
   *     });
   * }, function(err, results) {
   *     // results now equals an array of missing files
   *     createFiles(results);
   * });
   */
  var reject = doLimit(rejectLimit, Infinity);

  /**
   * A helper function that wraps an array or an object of functions with reflect.
   *
   * @name reflectAll
   * @static
   * @memberOf module:Utils
   * @method
   * @see [async.reflect]{@link module:Utils.reflect}
   * @category Util
   * @param {Array} tasks - The array of functions to wrap in `async.reflect`.
   * @returns {Array} Returns an array of functions, each function wrapped in
   * `async.reflect`
   * @example
   *
   * let tasks = [
   *     function(callback) {
   *         setTimeout(function() {
   *             callback(null, 'one');
   *         }, 200);
   *     },
   *     function(callback) {
   *         // do some more stuff but error ...
   *         callback(new Error('bad stuff happened'));
   *     },
   *     function(callback) {
   *         setTimeout(function() {
   *             callback(null, 'two');
   *         }, 100);
   *     }
   * ];
   *
   * async.parallel(async.reflectAll(tasks),
   * // optional callback
   * function(err, results) {
   *     // values
   *     // results[0].value = 'one'
   *     // results[1].error = Error('bad stuff happened')
   *     // results[2].value = 'two'
   * });
   *
   * // an example using an object instead of an array
   * let tasks = {
   *     one: function(callback) {
   *         setTimeout(function() {
   *             callback(null, 'one');
   *         }, 200);
   *     },
   *     two: function(callback) {
   *         callback('two');
   *     },
   *     three: function(callback) {
   *         setTimeout(function() {
   *             callback(null, 'three');
   *         }, 100);
   *     }
   * };
   *
   * async.parallel(async.reflectAll(tasks),
   * // optional callback
   * function(err, results) {
   *     // values
   *     // results.one.value = 'one'
   *     // results.two.error = 'two'
   *     // results.three.value = 'three'
   * });
   */
  function reflectAll(tasks) {
      var results;
      if (isArray(tasks)) {
          results = arrayMap(tasks, reflect);
      } else {
          results = {};
          baseForOwn(tasks, function (task, key) {
              results[key] = reflect.call(this, task);
          });
      }
      return results;
  }

  /**
   * The same as [`reject`]{@link module:Collections.reject} but runs only a single async operation at a time.
   *
   * @name rejectSeries
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.reject]{@link module:Collections.reject}
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A truth test to apply to each item in `coll`.
   * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
   * with a boolean argument once it has completed. Invoked with (item, callback).
   * @param {Function} [callback] - A callback which is called after all the
   * `iteratee` functions have finished. Invoked with (err, results).
   */
  var rejectSeries = doLimit(rejectLimit, 1);

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant$1(value) {
    return function() {
      return value;
    };
  }

  /**
   * Attempts to get a successful response from `task` no more than `times` times
   * before returning an error. If the task is successful, the `callback` will be
   * passed the result of the successful task. If all attempts fail, the callback
   * will be passed the error and result (if any) of the final attempt.
   *
   * @name retry
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @category Control Flow
   * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - Can be either an
   * object with `times` and `interval` or a number.
   * * `times` - The number of attempts to make before giving up.  The default
   *   is `5`.
   * * `interval` - The time to wait between retries, in milliseconds.  The
   *   default is `0`. The interval may also be specified as a function of the
   *   retry count (see example).
   * * If `opts` is a number, the number specifies the number of times to retry,
   *   with the default interval of `0`.
   * @param {Function} task - A function which receives two arguments: (1) a
   * `callback(err, result)` which must be called when finished, passing `err`
   * (which can be `null`) and the `result` of the function's execution, and (2)
   * a `results` object, containing the results of the previously executed
   * functions (if nested inside another control flow). Invoked with
   * (callback, results).
   * @param {Function} [callback] - An optional callback which is called when the
   * task has succeeded, or after the final failed attempt. It receives the `err`
   * and `result` arguments of the last attempt at completing the `task`. Invoked
   * with (err, results).
   * @example
   *
   * // The `retry` function can be used as a stand-alone control flow by passing
   * // a callback, as shown below:
   *
   * // try calling apiMethod 3 times
   * async.retry(3, apiMethod, function(err, result) {
   *     // do something with the result
   * });
   *
   * // try calling apiMethod 3 times, waiting 200 ms between each retry
   * async.retry({times: 3, interval: 200}, apiMethod, function(err, result) {
   *     // do something with the result
   * });
   *
   * // try calling apiMethod 10 times with exponential backoff
   * // (i.e. intervals of 100, 200, 400, 800, 1600, ... milliseconds)
   * async.retry({
   *   times: 10,
   *   interval: function(retryCount) {
   *     return 50 * Math.pow(2, retryCount);
   *   }
   * }, apiMethod, function(err, result) {
   *     // do something with the result
   * });
   *
   * // try calling apiMethod the default 5 times no delay between each retry
   * async.retry(apiMethod, function(err, result) {
   *     // do something with the result
   * });
   *
   * // It can also be embedded within other control flow functions to retry
   * // individual methods that are not as reliable, like this:
   * async.auto({
   *     users: api.getUsers.bind(api),
   *     payments: async.retry(3, api.getPayments.bind(api))
   * }, function(err, results) {
   *     // do something with the results
   * });
   */
  function retry(opts, task, callback) {
      var DEFAULT_TIMES = 5;
      var DEFAULT_INTERVAL = 0;

      var options = {
          times: DEFAULT_TIMES,
          intervalFunc: constant$1(DEFAULT_INTERVAL)
      };

      function parseTimes(acc, t) {
          if (typeof t === 'object') {
              acc.times = +t.times || DEFAULT_TIMES;

              acc.intervalFunc = typeof t.interval === 'function' ? t.interval : constant$1(+t.interval || DEFAULT_INTERVAL);
          } else if (typeof t === 'number' || typeof t === 'string') {
              acc.times = +t || DEFAULT_TIMES;
          } else {
              throw new Error("Invalid arguments for async.retry");
          }
      }

      if (arguments.length < 3 && typeof opts === 'function') {
          callback = task || noop;
          task = opts;
      } else {
          parseTimes(options, opts);
          callback = callback || noop;
      }

      if (typeof task !== 'function') {
          throw new Error("Invalid arguments for async.retry");
      }

      var attempt = 1;
      function retryAttempt() {
          task(function (err) {
              if (err && attempt++ < options.times) {
                  setTimeout(retryAttempt, options.intervalFunc(attempt));
              } else {
                  callback.apply(null, arguments);
              }
          });
      }

      retryAttempt();
  }

  /**
   * A close relative of [`retry`]{@link module:ControlFlow.retry}.  This method wraps a task and makes it
   * retryable, rather than immediately calling it with retries.
   *
   * @name retryable
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.retry]{@link module:ControlFlow.retry}
   * @category Control Flow
   * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - optional
   * options, exactly the same as from `retry`
   * @param {Function} task - the asynchronous function to wrap
   * @returns {Functions} The wrapped function, which when invoked, will retry on
   * an error, based on the parameters specified in `opts`.
   * @example
   *
   * async.auto({
   *     dep1: async.retryable(3, getFromFlakyService),
   *     process: ["dep1", async.retryable(3, function (results, cb) {
   *         maybeProcessData(results.dep1, cb);
   *     })]
   * }, callback);
   */
  function retryable (opts, task) {
      if (!task) {
          task = opts;
          opts = null;
      }
      return initialParams(function (args, callback) {
          function taskFn(cb) {
              task.apply(null, args.concat([cb]));
          }

          if (opts) retry(opts, taskFn, callback);else retry(taskFn, callback);
      });
  }

  /**
   * Run the functions in the `tasks` collection in series, each one running once
   * the previous function has completed. If any functions in the series pass an
   * error to its callback, no more functions are run, and `callback` is
   * immediately called with the value of the error. Otherwise, `callback`
   * receives an array of results when `tasks` have completed.
   *
   * It is also possible to use an object instead of an array. Each property will
   * be run as a function, and the results will be passed to the final `callback`
   * as an object instead of an array. This can be a more readable way of handling
   *  results from {@link async.series}.
   *
   * **Note** that while many implementations preserve the order of object
   * properties, the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6)
   * explicitly states that
   *
   * > The mechanics and order of enumerating the properties is not specified.
   *
   * So if you rely on the order in which your series of functions are executed,
   * and want this to work on all platforms, consider using an array.
   *
   * @name series
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @category Control Flow
   * @param {Array|Iterable|Object} tasks - A collection containing functions to run, each
   * function is passed a `callback(err, result)` it must call on completion with
   * an error `err` (which can be `null`) and an optional `result` value.
   * @param {Function} [callback] - An optional callback to run once all the
   * functions have completed. This function gets a results array (or object)
   * containing all the result arguments passed to the `task` callbacks. Invoked
   * with (err, result).
   * @example
   * async.series([
   *     function(callback) {
   *         // do some stuff ...
   *         callback(null, 'one');
   *     },
   *     function(callback) {
   *         // do some more stuff ...
   *         callback(null, 'two');
   *     }
   * ],
   * // optional callback
   * function(err, results) {
   *     // results is now equal to ['one', 'two']
   * });
   *
   * async.series({
   *     one: function(callback) {
   *         setTimeout(function() {
   *             callback(null, 1);
   *         }, 200);
   *     },
   *     two: function(callback){
   *         setTimeout(function() {
   *             callback(null, 2);
   *         }, 100);
   *     }
   * }, function(err, results) {
   *     // results is now equal to: {one: 1, two: 2}
   * });
   */
  function series(tasks, callback) {
    _parallel(eachOfSeries, tasks, callback);
  }

  /**
   * The same as [`some`]{@link module:Collections.some} but runs a maximum of `limit` async operations at a time.
   *
   * @name someLimit
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.some]{@link module:Collections.some}
   * @alias anyLimit
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {number} limit - The maximum number of async operations at a time.
   * @param {Function} iteratee - A truth test to apply to each item in the array
   * in parallel. The iteratee is passed a `callback(err, truthValue)` which must
   * be called with a boolean argument once it has completed. Invoked with
   * (item, callback).
   * @param {Function} [callback] - A callback which is called as soon as any
   * iteratee returns `true`, or after all the iteratee functions have finished.
   * Result will be either `true` or `false` depending on the values of the async
   * tests. Invoked with (err, result).
   */
  var someLimit = _createTester(eachOfLimit, Boolean, identity);

  /**
   * Returns `true` if at least one element in the `coll` satisfies an async test.
   * If any iteratee call returns `true`, the main `callback` is immediately
   * called.
   *
   * @name some
   * @static
   * @memberOf module:Collections
   * @method
   * @alias any
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A truth test to apply to each item in the array
   * in parallel. The iteratee is passed a `callback(err, truthValue)` which must
   * be called with a boolean argument once it has completed. Invoked with
   * (item, callback).
   * @param {Function} [callback] - A callback which is called as soon as any
   * iteratee returns `true`, or after all the iteratee functions have finished.
   * Result will be either `true` or `false` depending on the values of the async
   * tests. Invoked with (err, result).
   * @example
   *
   * async.some(['file1','file2','file3'], function(filePath, callback) {
   *     fs.access(filePath, function(err) {
   *         callback(null, !err)
   *     });
   * }, function(err, result) {
   *     // if result is true then at least one of the files exists
   * });
   */
  var some = doLimit(someLimit, Infinity);

  /**
   * The same as [`some`]{@link module:Collections.some} but runs only a single async operation at a time.
   *
   * @name someSeries
   * @static
   * @memberOf module:Collections
   * @method
   * @see [async.some]{@link module:Collections.some}
   * @alias anySeries
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A truth test to apply to each item in the array
   * in parallel. The iteratee is passed a `callback(err, truthValue)` which must
   * be called with a boolean argument once it has completed. Invoked with
   * (item, callback).
   * @param {Function} [callback] - A callback which is called as soon as any
   * iteratee returns `true`, or after all the iteratee functions have finished.
   * Result will be either `true` or `false` depending on the values of the async
   * tests. Invoked with (err, result).
   */
  var someSeries = doLimit(someLimit, 1);

  /**
   * Sorts a list by the results of running each `coll` value through an async
   * `iteratee`.
   *
   * @name sortBy
   * @static
   * @memberOf module:Collections
   * @method
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {Function} iteratee - A function to apply to each item in `coll`.
   * The iteratee is passed a `callback(err, sortValue)` which must be called once
   * it has completed with an error (which can be `null`) and a value to use as
   * the sort criteria. Invoked with (item, callback).
   * @param {Function} callback - A callback which is called after all the
   * `iteratee` functions have finished, or an error occurs. Results is the items
   * from the original `coll` sorted by the values returned by the `iteratee`
   * calls. Invoked with (err, results).
   * @example
   *
   * async.sortBy(['file1','file2','file3'], function(file, callback) {
   *     fs.stat(file, function(err, stats) {
   *         callback(err, stats.mtime);
   *     });
   * }, function(err, results) {
   *     // results is now the original array of files sorted by
   *     // modified date
   * });
   *
   * // By modifying the callback parameter the
   * // sorting order can be influenced:
   *
   * // ascending order
   * async.sortBy([1,9,3,5], function(x, callback) {
   *     callback(null, x);
   * }, function(err,result) {
   *     // result callback
   * });
   *
   * // descending order
   * async.sortBy([1,9,3,5], function(x, callback) {
   *     callback(null, x*-1);    //<- x*-1 instead of x, turns the order around
   * }, function(err,result) {
   *     // result callback
   * });
   */
  function sortBy(coll, iteratee, callback) {
      map(coll, function (x, callback) {
          iteratee(x, function (err, criteria) {
              if (err) return callback(err);
              callback(null, { value: x, criteria: criteria });
          });
      }, function (err, results) {
          if (err) return callback(err);
          callback(null, arrayMap(results.sort(comparator), baseProperty('value')));
      });

      function comparator(left, right) {
          var a = left.criteria,
              b = right.criteria;
          return a < b ? -1 : a > b ? 1 : 0;
      }
  }

  /**
   * Sets a time limit on an asynchronous function. If the function does not call
   * its callback within the specified milliseconds, it will be called with a
   * timeout error. The code property for the error object will be `'ETIMEDOUT'`.
   *
   * @name timeout
   * @static
   * @memberOf module:Utils
   * @method
   * @category Util
   * @param {Function} asyncFn - The asynchronous function you want to set the
   * time limit.
   * @param {number} milliseconds - The specified time limit.
   * @param {*} [info] - Any variable you want attached (`string`, `object`, etc)
   * to timeout Error for more information..
   * @returns {Function} Returns a wrapped function that can be used with any of
   * the control flow functions.
   * @example
   *
   * async.timeout(function(callback) {
   *     doAsyncTask(callback);
   * }, 1000);
   */
  function timeout(asyncFn, milliseconds, info) {
      var originalCallback, timer;
      var timedOut = false;

      function injectedCallback() {
          if (!timedOut) {
              originalCallback.apply(null, arguments);
              clearTimeout(timer);
          }
      }

      function timeoutCallback() {
          var name = asyncFn.name || 'anonymous';
          var error = new Error('Callback function "' + name + '" timed out.');
          error.code = 'ETIMEDOUT';
          if (info) {
              error.info = info;
          }
          timedOut = true;
          originalCallback(error);
      }

      return initialParams(function (args, origCallback) {
          originalCallback = origCallback;
          // setup timer and call original function
          timer = setTimeout(timeoutCallback, milliseconds);
          asyncFn.apply(null, args.concat(injectedCallback));
      });
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeCeil = Math.ceil;
  var nativeMax$1 = Math.max;
  /**
   * The base implementation of `_.range` and `_.rangeRight` which doesn't
   * coerce arguments to numbers.
   *
   * @private
   * @param {number} start The start of the range.
   * @param {number} end The end of the range.
   * @param {number} step The value to increment or decrement by.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Array} Returns the range of numbers.
   */
  function baseRange(start, end, step, fromRight) {
    var index = -1,
        length = nativeMax$1(nativeCeil((end - start) / (step || 1)), 0),
        result = Array(length);

    while (length--) {
      result[fromRight ? length : ++index] = start;
      start += step;
    }
    return result;
  }

  /**
   * The same as [times]{@link module:ControlFlow.times} but runs a maximum of `limit` async operations at a
   * time.
   *
   * @name timesLimit
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.times]{@link module:ControlFlow.times}
   * @category Control Flow
   * @param {number} count - The number of times to run the function.
   * @param {number} limit - The maximum number of async operations at a time.
   * @param {Function} iteratee - The function to call `n` times. Invoked with the
   * iteration index and a callback (n, next).
   * @param {Function} callback - see [async.map]{@link module:Collections.map}.
   */
  function timeLimit(count, limit, iteratee, callback) {
    mapLimit(baseRange(0, count, 1), limit, iteratee, callback);
  }

  /**
   * Calls the `iteratee` function `n` times, and accumulates results in the same
   * manner you would use with [map]{@link module:Collections.map}.
   *
   * @name times
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.map]{@link module:Collections.map}
   * @category Control Flow
   * @param {number} n - The number of times to run the function.
   * @param {Function} iteratee - The function to call `n` times. Invoked with the
   * iteration index and a callback (n, next).
   * @param {Function} callback - see {@link module:Collections.map}.
   * @example
   *
   * // Pretend this is some complicated async factory
   * var createUser = function(id, callback) {
   *     callback(null, {
   *         id: 'user' + id
   *     });
   * };
   *
   * // generate 5 users
   * async.times(5, function(n, next) {
   *     createUser(n, function(err, user) {
   *         next(err, user);
   *     });
   * }, function(err, users) {
   *     // we should now have 5 users
   * });
   */
  var times = doLimit(timeLimit, Infinity);

  /**
   * The same as [times]{@link module:ControlFlow.times} but runs only a single async operation at a time.
   *
   * @name timesSeries
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.times]{@link module:ControlFlow.times}
   * @category Control Flow
   * @param {number} n - The number of times to run the function.
   * @param {Function} iteratee - The function to call `n` times. Invoked with the
   * iteration index and a callback (n, next).
   * @param {Function} callback - see {@link module:Collections.map}.
   */
  var timesSeries = doLimit(timeLimit, 1);

  /**
   * A relative of `reduce`.  Takes an Object or Array, and iterates over each
   * element in series, each step potentially mutating an `accumulator` value.
   * The type of the accumulator defaults to the type of collection passed in.
   *
   * @name transform
   * @static
   * @memberOf module:Collections
   * @method
   * @category Collection
   * @param {Array|Iterable|Object} coll - A collection to iterate over.
   * @param {*} [accumulator] - The initial state of the transform.  If omitted,
   * it will default to an empty Object or Array, depending on the type of `coll`
   * @param {Function} iteratee - A function applied to each item in the
   * collection that potentially modifies the accumulator. The `iteratee` is
   * passed a `callback(err)` which accepts an optional error as its first
   * argument. If an error is passed to the callback, the transform is stopped
   * and the main `callback` is immediately called with the error.
   * Invoked with (accumulator, item, key, callback).
   * @param {Function} [callback] - A callback which is called after all the
   * `iteratee` functions have finished. Result is the transformed accumulator.
   * Invoked with (err, result).
   * @example
   *
   * async.transform([1,2,3], function(acc, item, index, callback) {
   *     // pointless async:
   *     process.nextTick(function() {
   *         acc.push(item * 2)
   *         callback(null)
   *     });
   * }, function(err, result) {
   *     // result is now equal to [2, 4, 6]
   * });
   *
   * @example
   *
   * async.transform({a: 1, b: 2, c: 3}, function (obj, val, key, callback) {
   *     setImmediate(function () {
   *         obj[key] = val * 2;
   *         callback();
   *     })
   * }, function (err, result) {
   *     // result is equal to {a: 2, b: 4, c: 6}
   * })
   */
  function transform(coll, accumulator, iteratee, callback) {
      if (arguments.length === 3) {
          callback = iteratee;
          iteratee = accumulator;
          accumulator = isArray(coll) ? [] : {};
      }
      callback = once(callback || noop);

      eachOf(coll, function (v, k, cb) {
          iteratee(accumulator, v, k, cb);
      }, function (err) {
          callback(err, accumulator);
      });
  }

  /**
   * Undoes a [memoize]{@link module:Utils.memoize}d function, reverting it to the original,
   * unmemoized form. Handy for testing.
   *
   * @name unmemoize
   * @static
   * @memberOf module:Utils
   * @method
   * @see [async.memoize]{@link module:Utils.memoize}
   * @category Util
   * @param {Function} fn - the memoized function
   * @returns {Function} a function that calls the original unmemoized function
   */
  function unmemoize(fn) {
      return function () {
          return (fn.unmemoized || fn).apply(null, arguments);
      };
  }

  /**
   * Repeatedly call `fn`, while `test` returns `true`. Calls `callback` when
   * stopped, or an error occurs.
   *
   * @name whilst
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @category Control Flow
   * @param {Function} test - synchronous truth test to perform before each
   * execution of `fn`. Invoked with ().
   * @param {Function} iteratee - A function which is called each time `test` passes.
   * The function is passed a `callback(err)`, which must be called once it has
   * completed with an optional `err` argument. Invoked with (callback).
   * @param {Function} [callback] - A callback which is called after the test
   * function has failed and repeated execution of `fn` has stopped. `callback`
   * will be passed an error and any arguments passed to the final `fn`'s
   * callback. Invoked with (err, [results]);
   * @returns undefined
   * @example
   *
   * var count = 0;
   * async.whilst(
   *     function() { return count < 5; },
   *     function(callback) {
   *         count++;
   *         setTimeout(function() {
   *             callback(null, count);
   *         }, 1000);
   *     },
   *     function (err, n) {
   *         // 5 seconds have passed, n = 5
   *     }
   * );
   */
  function whilst(test, iteratee, callback) {
      callback = onlyOnce(callback || noop);
      if (!test()) return callback(null);
      var next = rest(function (err, args) {
          if (err) return callback(err);
          if (test()) return iteratee(next);
          callback.apply(null, [null].concat(args));
      });
      iteratee(next);
  }

  /**
   * Repeatedly call `fn` until `test` returns `true`. Calls `callback` when
   * stopped, or an error occurs. `callback` will be passed an error and any
   * arguments passed to the final `fn`'s callback.
   *
   * The inverse of [whilst]{@link module:ControlFlow.whilst}.
   *
   * @name until
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @see [async.whilst]{@link module:ControlFlow.whilst}
   * @category Control Flow
   * @param {Function} test - synchronous truth test to perform before each
   * execution of `fn`. Invoked with ().
   * @param {Function} fn - A function which is called each time `test` fails.
   * The function is passed a `callback(err)`, which must be called once it has
   * completed with an optional `err` argument. Invoked with (callback).
   * @param {Function} [callback] - A callback which is called after the test
   * function has passed and repeated execution of `fn` has stopped. `callback`
   * will be passed an error and any arguments passed to the final `fn`'s
   * callback. Invoked with (err, [results]);
   */
  function until(test, fn, callback) {
      whilst(function () {
          return !test.apply(this, arguments);
      }, fn, callback);
  }

  /**
   * Runs the `tasks` array of functions in series, each passing their results to
   * the next in the array. However, if any of the `tasks` pass an error to their
   * own callback, the next function is not executed, and the main `callback` is
   * immediately called with the error.
   *
   * @name waterfall
   * @static
   * @memberOf module:ControlFlow
   * @method
   * @category Control Flow
   * @param {Array} tasks - An array of functions to run, each function is passed
   * a `callback(err, result1, result2, ...)` it must call on completion. The
   * first argument is an error (which can be `null`) and any further arguments
   * will be passed as arguments in order to the next task.
   * @param {Function} [callback] - An optional callback to run once all the
   * functions have completed. This will be passed the results of the last task's
   * callback. Invoked with (err, [results]).
   * @returns undefined
   * @example
   *
   * async.waterfall([
   *     function(callback) {
   *         callback(null, 'one', 'two');
   *     },
   *     function(arg1, arg2, callback) {
   *         // arg1 now equals 'one' and arg2 now equals 'two'
   *         callback(null, 'three');
   *     },
   *     function(arg1, callback) {
   *         // arg1 now equals 'three'
   *         callback(null, 'done');
   *     }
   * ], function (err, result) {
   *     // result now equals 'done'
   * });
   *
   * // Or, with named functions:
   * async.waterfall([
   *     myFirstFunction,
   *     mySecondFunction,
   *     myLastFunction,
   * ], function (err, result) {
   *     // result now equals 'done'
   * });
   * function myFirstFunction(callback) {
   *     callback(null, 'one', 'two');
   * }
   * function mySecondFunction(arg1, arg2, callback) {
   *     // arg1 now equals 'one' and arg2 now equals 'two'
   *     callback(null, 'three');
   * }
   * function myLastFunction(arg1, callback) {
   *     // arg1 now equals 'three'
   *     callback(null, 'done');
   * }
   */
  function waterfall (tasks, callback) {
      callback = once(callback || noop);
      if (!isArray(tasks)) return callback(new Error('First argument to waterfall must be an array of functions'));
      if (!tasks.length) return callback();
      var taskIndex = 0;

      function nextTask(args) {
          if (taskIndex === tasks.length) {
              return callback.apply(null, [null].concat(args));
          }

          var taskCallback = onlyOnce(rest(function (err, args) {
              if (err) {
                  return callback.apply(null, [err].concat(args));
              }
              nextTask(args);
          }));

          args.push(taskCallback);

          var task = tasks[taskIndex++];
          task.apply(null, args);
      }

      nextTask([]);
  }

  var index = {
    applyEach: applyEach,
    applyEachSeries: applyEachSeries,
    apply: apply$1,
    asyncify: asyncify,
    auto: auto,
    autoInject: autoInject,
    cargo: cargo,
    compose: compose,
    concat: concat,
    concatSeries: concatSeries,
    constant: constant,
    detect: detect,
    detectLimit: detectLimit,
    detectSeries: detectSeries,
    dir: dir,
    doDuring: doDuring,
    doUntil: doUntil,
    doWhilst: doWhilst,
    during: during,
    each: each,
    eachLimit: eachLimit,
    eachOf: eachOf,
    eachOfLimit: eachOfLimit,
    eachOfSeries: eachOfSeries,
    eachSeries: eachSeries,
    ensureAsync: ensureAsync,
    every: every,
    everyLimit: everyLimit,
    everySeries: everySeries,
    filter: filter,
    filterLimit: filterLimit,
    filterSeries: filterSeries,
    forever: forever,
    log: log,
    map: map,
    mapLimit: mapLimit,
    mapSeries: mapSeries,
    mapValues: mapValues,
    mapValuesLimit: mapValuesLimit,
    mapValuesSeries: mapValuesSeries,
    memoize: memoize,
    nextTick: nextTick,
    parallel: parallel,
    parallelLimit: parallelLimit,
    priorityQueue: priorityQueue,
    queue: queue$1,
    race: race,
    reduce: reduce,
    reduceRight: reduceRight,
    reflect: reflect,
    reflectAll: reflectAll,
    reject: reject,
    rejectLimit: rejectLimit,
    rejectSeries: rejectSeries,
    retry: retry,
    retryable: retryable,
    seq: seq,
    series: series,
    setImmediate: setImmediate$1,
    some: some,
    someLimit: someLimit,
    someSeries: someSeries,
    sortBy: sortBy,
    timeout: timeout,
    times: times,
    timesLimit: timeLimit,
    timesSeries: timesSeries,
    transform: transform,
    unmemoize: unmemoize,
    until: until,
    waterfall: waterfall,
    whilst: whilst,

    // aliases
    all: every,
    any: some,
    forEach: each,
    forEachSeries: eachSeries,
    forEachLimit: eachLimit,
    forEachOf: eachOf,
    forEachOfSeries: eachOfSeries,
    forEachOfLimit: eachOfLimit,
    inject: reduce,
    foldl: reduce,
    foldr: reduceRight,
    select: filter,
    selectLimit: filterLimit,
    selectSeries: filterSeries,
    wrapSync: asyncify
  };

  exports['default'] = index;
  exports.applyEach = applyEach;
  exports.applyEachSeries = applyEachSeries;
  exports.apply = apply$1;
  exports.asyncify = asyncify;
  exports.auto = auto;
  exports.autoInject = autoInject;
  exports.cargo = cargo;
  exports.compose = compose;
  exports.concat = concat;
  exports.concatSeries = concatSeries;
  exports.constant = constant;
  exports.detect = detect;
  exports.detectLimit = detectLimit;
  exports.detectSeries = detectSeries;
  exports.dir = dir;
  exports.doDuring = doDuring;
  exports.doUntil = doUntil;
  exports.doWhilst = doWhilst;
  exports.during = during;
  exports.each = each;
  exports.eachLimit = eachLimit;
  exports.eachOf = eachOf;
  exports.eachOfLimit = eachOfLimit;
  exports.eachOfSeries = eachOfSeries;
  exports.eachSeries = eachSeries;
  exports.ensureAsync = ensureAsync;
  exports.every = every;
  exports.everyLimit = everyLimit;
  exports.everySeries = everySeries;
  exports.filter = filter;
  exports.filterLimit = filterLimit;
  exports.filterSeries = filterSeries;
  exports.forever = forever;
  exports.log = log;
  exports.map = map;
  exports.mapLimit = mapLimit;
  exports.mapSeries = mapSeries;
  exports.mapValues = mapValues;
  exports.mapValuesLimit = mapValuesLimit;
  exports.mapValuesSeries = mapValuesSeries;
  exports.memoize = memoize;
  exports.nextTick = nextTick;
  exports.parallel = parallel;
  exports.parallelLimit = parallelLimit;
  exports.priorityQueue = priorityQueue;
  exports.queue = queue$1;
  exports.race = race;
  exports.reduce = reduce;
  exports.reduceRight = reduceRight;
  exports.reflect = reflect;
  exports.reflectAll = reflectAll;
  exports.reject = reject;
  exports.rejectLimit = rejectLimit;
  exports.rejectSeries = rejectSeries;
  exports.retry = retry;
  exports.retryable = retryable;
  exports.seq = seq;
  exports.series = series;
  exports.setImmediate = setImmediate$1;
  exports.some = some;
  exports.someLimit = someLimit;
  exports.someSeries = someSeries;
  exports.sortBy = sortBy;
  exports.timeout = timeout;
  exports.times = times;
  exports.timesLimit = timeLimit;
  exports.timesSeries = timesSeries;
  exports.transform = transform;
  exports.unmemoize = unmemoize;
  exports.until = until;
  exports.waterfall = waterfall;
  exports.whilst = whilst;
  exports.all = every;
  exports.allLimit = everyLimit;
  exports.allSeries = everySeries;
  exports.any = some;
  exports.anyLimit = someLimit;
  exports.anySeries = someSeries;
  exports.find = detect;
  exports.findLimit = detectLimit;
  exports.findSeries = detectSeries;
  exports.forEach = each;
  exports.forEachSeries = eachSeries;
  exports.forEachLimit = eachLimit;
  exports.forEachOf = eachOf;
  exports.forEachOfSeries = eachOfSeries;
  exports.forEachOfLimit = eachOfLimit;
  exports.inject = reduce;
  exports.foldl = reduce;
  exports.foldr = reduceRight;
  exports.select = filter;
  exports.selectLimit = filterLimit;
  exports.selectSeries = filterSeries;
  exports.wrapSync = asyncify;

}));
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":2}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
// Underscore
require('./libs/underscore/settings')();

// BSK Start
var Application     = require('./bsk/App');
var Loader          = require('./bsk/AppLoader');

// jQuery Events
var events          = require('helpers/events/events');

// Custom bootstrap
var Bootstrap       = require('./bootstrap');

$(document).ready(function() {

    // jQuery Events
    $(events);

    // Show loader
    Loader.start();

    // Run application
    window.App  = new Application();

    Bootstrap.init(function() {

        App.Router.dispatch();

        // Hide loader
        Loader.stop();

    });

});

},{"./bootstrap":4,"./bsk/App":5,"./bsk/AppLoader":7,"./libs/underscore/settings":46,"helpers/events/events":18}],4:[function(require,module,exports){
// Load config parameters
const async     = require('async');

module.exports  = {

    init: function(cb) {

        async.parallel([

            // Load custom models
            function(callback) {
                callback();
            }

        ], cb);

    }

};

},{"async":1}],5:[function(require,module,exports){
/**
 * App Bootstrap
 *
 * @type type
 */
var Config          = require('../config/config');
var AppRouter       = require('./AppRouter');
var AppView         = require('./AppView');
var AppModel        = require('./AppModel');

// Helpers
var Flash           = require('helpers/flash/flash');
var Form            = require('helpers/form/form');

// Modals
var Modal           = require('helpers/modal/modal');

// Libs
var Filter          = require('libs/filter/Filter');
var Api             = require('libs/Api');

module.exports = function() {

    var Router      = Backbone.Router.extend(AppRouter);

    var App         =  {

        Config: Config,

        Flash: Flash.init(),

        Router: new Router(),

        Model: new AppModel(),

        View: AppView,

        Filter: Filter,

        Form: Form,

        Modal: Modal,

        Api: Api

    };

    return App;

};
},{"../config/config":11,"./AppModel":8,"./AppRouter":9,"./AppView":10,"helpers/flash/flash":21,"helpers/form/form":27,"helpers/modal/modal":34,"libs/Api":38,"libs/filter/Filter":39}],6:[function(require,module,exports){
/**
 * App Configuration
 *
 * @type type
 */

module.exports = {

    // Default module
    module: 'Dashboard',

    // Callback before execute any controller
    initialize: function() {

    }

};
},{}],7:[function(require,module,exports){

module.exports = {

    start: function() {

    },

    stop: function() {

    }

};
},{}],8:[function(require,module,exports){
/**
 * App Model
 *
 * @type type
 */

var Models  = ({"models":({"Example":require("../models/Example.js")})}).models;

module.exports  = function() {

    var objs    = {};

    _(Models).each(function(model, key) {

        var tmpModel            = Backbone.Model.extend(_({}).extend(model, {

            objCollection: null,

            setCollection: function(data) {
                var _this       = this;
                tmpCollection   = Backbone.Collection.extend({
                    model: Backbone.Model.extend(model)
                });
                _this.objCollection = new tmpCollection(data);
                return true;
            },

            toCollection: function() {
                return this.objCollection;
            }

        }));

        objs[key]       = new tmpModel();

    });

    return objs;

};
},{"../models/Example.js":49}],9:[function(require,module,exports){
/**
 * Router
 *
 * @type type
 */

var Config          = require('../config/config');
var AppController   = require('./AppController');
var Controllers     = ({"controllers":({"BrandsController":require("../controllers/BrandsController.js"),"HomeController":require("../controllers/HomeController.js"),"MarketsController":require("../controllers/MarketsController.js"),"notifications":({"UsersController":require("../controllers/notifications/UsersController.js")})})}).controllers;

module.exports = {

    /**
     * Module Name
     */
    module: '',

    /**
     * Controller Name
     */
    controller: '',

    /**
     * Action Name
     */
    action: '',

    /**
     * Parameters
     */
    parameters: [],

    // Initialize
    initialize: function() {

    },

    // Dispacth current url
    dispatch: function() {

        // Bind Controllers Routes into router
        this._bindExternalRoutes();

        // Start History
        Backbone.history.start({

            pushState: Config.PUSHSTATE,

            root: Config.ROOT

        });

    },

    /**
     * Bind Controller
     * brands:                      BrandsController.list
     * notifications/user/:id:      notifications.UserController.get
     *
     */
    _bindExternalRoutes: function() {

        this.routes     = {};

        // Merge actions for NameController.action or folder.NameController.action
        var mergeAction = function(name, paths) {
            var rs      = _.mapObject(paths || {}, function(action) {

                // NameController.action or folder.NameController.action
                return name +'.'+ action;
            });
            return rs;
        };

        for(name in Controllers) {
            if(!/controller/i.test(name)) {
                for(submodule in Controllers[name]) {

                    var routes      = {};
                    _.each(Controllers[name][submodule].routes, function(source, url) {
                        var tmpUrl  = App.Filter.get(url, 'rtrim', '/');
                        var tmpUrl2 = tmpUrl+'/';
                        routes[tmpUrl]  = source;
                        routes[tmpUrl2] = source;
                    });

                    this.routes  = _.extend(this.routes, mergeAction(name +'.'+ submodule, routes));

                }
            } else {

                var routes      = {};
                _.each(Controllers[name].routes, function(source, url) {
                    var tmpUrl  = App.Filter.get(url, 'rtrim', '/');
                    var tmpUrl2 = tmpUrl+'/';
                    routes[tmpUrl]  = source;
                    routes[tmpUrl2] = source;
                });

                this.routes = _.extend(this.routes, mergeAction(name, routes));
            }
        }

        // bind backbone routes
        this._bindRoutes();

    },

    // Execute
    execute: function(cb, params, route) {

        var source                  = route.split('.');

        var controllerName          = (source.length > 2) ? source[1] : source[0];
        var controllerPath          = 'controllers/'+ ( (source.length > 2) ? source[0]+'/'+source[1] : source[0] );

        this.module                 = (source.length > 2) ? source[0] : '';
        this.controller             = controllerName.toLowerCase().replace('controller', '');
        this.action                 = source.pop();
        this.parameters             = params;

        var filter                  = '_beforeFilter';
        var tmpController;

        if(this.module) {
            tmpController           = Controllers[this.module][controllerName] || {};
        } else {
            tmpController           = Controllers[controllerName] || {};
        }

        // Check if exist
        if(!tmpController) {
            console.error('CONTROLLER "', controllerPath, '" NOT FOUND');
            return false;
        }

        // Find and exec the controller
        var BController             = Backbone.Controller.extend(_({}).extend(AppController, tmpController));

        var ObjController           = new BController();

        if(ObjController[filter] && (ObjController[filter]() === false)) {
            console.log('EXIT FROM BEFORE FILTER INTO "', controllerPath, '"');
            return false;
        }

        // Run Action
        if(!ObjController[this.action]) {
            console.error('ACTION "', this.action, '" NOT FOUND INTO ', controllerPath);
            return false;
        }

        // Run method
        ObjController[this.action].apply(ObjController, params);

        $("html, body").animate({scrollTop: 0}, 500);

    },

    // Redirect to url
    to: function(target, cb) {

        this.navigate(target, {trigger: true});
        if(cb) {
            setTimeout(function() {
                cb();
            }, 200);
        }

    }, 
    
    // Redirect internal url (without change the url)
    internal: function(target, cb) {
        
        Backbone.history.loadUrl(target);
        
        if(cb) {
            setTimeout(function() {
                cb();
            }, 200);
        }
        
    },
    
    // History back
    back: function(index) {
        
        history.back(index || null);
        
    }

};
},{"../config/config":11,"../controllers/BrandsController.js":14,"../controllers/HomeController.js":15,"../controllers/MarketsController.js":16,"../controllers/notifications/UsersController.js":17,"./AppController":6}],10:[function(require,module,exports){
/**
 * App Views
 *
 * @type type
 */

var Views           = ({"views":({"home":(function () {var f = require("../views/home/index.js");f["index"]=require("../views/home/index.js");f["list"]=require("../views/home/list.js");return f;})(),"main":require("../views/main.js"),"notifications":({"users":(function () {var f = require("../views/notifications/users/index.js");f["index"]=require("../views/notifications/users/index.js");return f;})()})})}).views;
var Partials        = ({"views":({"_shared":({"partials":({"folder":({"test3":require("../views/_shared/partials/folder/test3.html")}),"test1":require("../views/_shared/partials/test1.html"),"test2":require("../views/_shared/partials/test2.html"),"test4":require("../views/_shared/partials/test4.html")})})})}).views._shared.partials || {};
var Components      = (Views._shared) ? Views._shared.components : {};

module.exports = {

    /**
     * Curent View to render
     */
    currentView:    {},

    // Views Loaded to delete zombies
    viewsLoaded:    [],

    // Current module
    module:         '',

    // Current controller
    controller:     '',

    // Current action
    action:         '',


    /**
     * Method to run current view
     * @param {type} data
     * @returns {undefined|nm$_AppView.module.exports.Run.Main}
     */
    Run: function() {

        // Check SHELL #app
        if($(App.Config.SHELL_CONTAINER).size() === 0) {
            console.error("THE SHELL ", App.Config.SHELL_CONTAINER, " COULD NOT BE FOUND INTO THE DOCUMENT. PLEASE CHECK YOUT CONFIG FILE");
            return;
        }

        var config = {
            el:     $(App.Config.SHELL_CONTAINER).attr('data-controller', this.controller).attr('data-action', this.action),
            view:   this.currentView
        };

        $('body').attr('data-module', this.module);
        var Main    = Backbone.View.extend(_.extend(config, Views.main));
        return new Main();

    },

    /**
     * Method to render an action into controller
     * @param {type} data
     * @returns {nm$_AppView.module.exports.Run.Main|undefined}
     */
    Render: function() {

        var params      = arguments;
        var data        = {};

        var _this       = this;

        _this.module        = App.Router.module;

        _this.controller    = App.Router.controller;

        _this.action        = App.Router.action;

        if(typeof params[0] === 'string') {
            data        = params[1] ? params[1] : {};
            tmpPath     = App.Filter.get(params[0], 'trim', '/').split('/');
            if(tmpPath.length > 2) {
                _this.module        = tmpPath[0];
                _this.controller    = tmpPath[1];
                _this.action        = tmpPath[2];
            } else {
                _this.module        = null;
                _this.controller    = tmpPath[0];
                _this.action        = tmpPath[1];
            }
        } else {
            data        = params[0];
        }

        // Get Path
        var path        = (_this.module)  ? _this.module +'/'+ _this.controller +'/'+ _this.action : _this.controller +'/'+ _this.action;

        try {
            // View to render
            var toRender    = (_this.module) ? Views[_this.module][_this.controller][_this.action] : Views[_this.controller][_this.action];
            if(!toRender) {
                throw "View not found";
            }
        } catch(e) {
            console.error('VIEW "'+_this.action+'" NOT FOUND INTO "views/'+ path +'"');
            return;
        }

        toRender.viewsLoaded        = [];

        if(!toRender['initialize']) {
            toRender.initialize = function() {
                this.render();
                return this;
            };
        }

        toRender.html           = function(html) {
            this.clean();
            this.$el.html(html);
            if(toRender.events) {
                this.delegateEvents();
            }
        };

        toRender.append         = function(html, selector) {
            if(typeof html === 'string') {
                (selector) ? this.$el.find(selector).append(html) : this.$el.append(html);
            } else {
                this.viewsLoaded.push(html);
                (selector) ? this.$el.find(selector).append(html.el) : this.$el.append(html.el);
            }
        };

        toRender.prepend        = function(html, selector) {
            if(typeof html === 'string') {
                (selector) ? this.$el.find(selector).prepend(html) : this.$el.prepend(html);
            } else {
                this.viewsLoaded.push(html);
                (selector) ? this.$el.find(selector).prepend(html.el) : this.$el.prepend(html.el);
            }
        };

        // Clean view
        toRender.clean      = function() {

            // Remove all views loaded previously
            this.viewsLoaded.forEach(function(view) {
                view.remove();
            });

            // COMPLETELY UNBIND THE VIEW
            this.undelegateEvents();
            this.$el.removeData().unbind();
            this.$el.empty();

        };

        var config          = {
            tagName: 'main',
            className: 'small-11 small-centered large-12',
            data: data
        };

        var View            = Backbone.View.extend(_.extend(config, toRender));
        this.currentView    = new View();

        return _this.Run();

    },

    /**
     * Load a component to append into a view
     * @param {type} name
     * @returns {undefined|nm$_AppView.module.exports.Component.Component}
     */
    Component: function(name, data) {

        // Get Folder - Component
        var toAppendFolder  = Components[name];

        // Get Component
        var toAppend        = !toAppendFolder ? null : toAppendFolder[name];
        if(!toAppend) {
            console.error('COMPONENT "'+name+'" NOT FOUND INTO "views/_shared/components/" TO APPEND INTO MAIN VIEW');
            return;
        }

        if(!toAppend['initialize']) {
            toAppend.initialize = function() {
                this.render();
                return this;
            };
        }

        toAppend.html           = function(html) {
            this.$el.html(html);
        };

        toAppend.append         = function(html) {
            this.$el.append(html);
        };

        toAppend.prepend        = function(html) {
            this.$el.prepend(html);
        };

        var config      = {
            data:       data
        };

        var Component   = Backbone.View.extend(_.extend(config, toAppend));
        return new Component();

    },

    /**
     * Render a partial
     *
     * @param {type} partial
     * @param {type} data
     * @returns {Boolean}
     */
    Partial: function(partial, data) {

        var tmpFolder   = partial.split('/');
        var hasFolder   = tmpFolder.length > 1 ? true : false;

        if(hasFolder) {
            var html    = tmpFolder[1];
            var folder  = tmpFolder[0];
            partial     = Partials[folder][html];
        } else {
            partial     = Partials[partial];
        }
        if(!partial) {
            console.error("PARTIAL", partial, "NOT FOUND INTO views/_shared/partials");
            return false;
        }
        return _.template(partial)(data);

    }

};
},{"../views/_shared/partials/folder/test3.html":50,"../views/_shared/partials/test1.html":51,"../views/_shared/partials/test2.html":52,"../views/_shared/partials/test4.html":53,"../views/home/index.js":54,"../views/home/list.js":55,"../views/main.js":58,"../views/notifications/users/index.js":59}],11:[function(require,module,exports){
/**
 * App Configuration
 *
 * @type type
 */

var connections = require('./connections');

var local       = require('./local') || {};

module.exports = {

    /**
     * APP VERSION
     */
    VERSION: '1.0',

    /**
     * ID OF ELEMENT TO APPEND APP HMTL
     */
    SHELL_CONTAINER: '#app',

    /**
     * LOCAL STORAGE
     */
    BROWSER_STORAGE: '001',

    /**
     * ENABLE PUSHSTATE
     */
    PUSHSTATE: false,

    /**
     * ROOT PATH FOR HISTORY AND PUSHSTATE
     */
    ROOT: '/',

    /**
     * API SERVER
     */
    SERVER: connections[ local.connection || 'production'],

    /**
     * TEMPLATE SETTINGS
     */
    TEMPLATE_SETTINGS: {
        evaluate    : /{{([\s\S]+?)}}/g,
        interpolate : /{{=([\s\S]+?)}}/g,
        escape      : /{{-([\s\S]+?)}}/g
    }

};
},{"./connections":12,"./local":13}],12:[function(require,module,exports){
/**
 * All Connections
 *
 * @type type
 */

module.exports = {

    development: {

        // API
        host:  'http://dev.com/v1/',

        // Custom header to send into request
        headers: {

        }

    },

    production: {

        // API
        host:  'http://prod.com/v1/',

        // Custom header to send into request
        headers: {

        }

    }

};
},{}],13:[function(require,module,exports){
/**
 * Local environment settings
 *
 * This file override the config.js with your custom parameters
 *
 */

module.exports = {

    connection: 'development'

};
},{}],14:[function(require,module,exports){
/**
 * BrandsController
 *
 * @description
 */


module.exports = {

    routes: {

        'brands':                 'index',
        'brands/get/:id':         'get',
        'brands/list':            'list'

    },

    // Callback before to run
    _beforeFilter: function() {

        console.log('before Filter Brands');

    },

    // List all elements
    list: function() {

        console.log('Entró a listar Brands');

    }

};
},{}],15:[function(require,module,exports){
/**
 * HomeController
 *
 * @description
 */


module.exports = {

    // Internal Routes
    routes: {

        'home':                 'index',
        'home/get/:id':         'get',
        'home/list':            'list',
        'home/redirect':        'redirect'

    },

    // Home
    index: function() {

        console.log(App.Model.Example.get('id'));
        App.View.Render();

    },

    // List all elements
    list: function() {

        App.Model.Example.set({id: 000, name: 'Model'});

        App.Model.Example.setCollection([
            {id: 123, name: 'A'},
            {id: 456, name: 'B'},
            {id: 789, name: 'C'},
            App.Model.Example
        ]);

        App.Model.Example.toCollection().each(function (model, index, all) {
            console.log(model.get("name"));
            // A
            // B
            // C
        });

        App.Model.Example.on("change:id", function(model){
            var id = model.get("id");
            console.log("Changed my id to " + id );
        });

        App.Model.Example.set('id', 123);

        console.log(App.Model.Example.get('id'));

        App.View.Render({ data: App.Model.Example.getElements() });

    },

    // Get with Param
    get: function(id) {

        console.log('Entró al get del Home: ', id);

    },

    // Redirect to other url
    redirect: function() {

        App.Router.to('home/list', function() {
            App.Flash.valid('Redirect');
        });

    }

};
},{}],16:[function(require,module,exports){
/**
 * MarketsController
 *
 * @description
 */


module.exports = {

    routes: {

        'markets':                 'index',
        'markets/get/:id':         'get',
        'markets/list':            'list'

    },

    // Callback before run
    _beforeFilter: function() {

        console.log('before Filter Markets');

    },

    // List all elements
    list: function() {

        console.log('Entró a listar Markets');

    }

};
},{}],17:[function(require,module,exports){
/**
 * UsersController
 *
 * @description
 */


module.exports = {

    routes: {

        'notification/users':                 'index',
        'notification/users/get/:id':         'get',
        'notification/users/list':            'list',
        'notification/users/test/:id':         'test'

    },

    // Callback before to run
    _beforeFilter: function() {

        console.log('before Filter Users');

    },

    // Index
    index: function() {

        console.log('Entró a index Users');

        App.View.Render();

    },

    // List all elements
    list: function() {

        console.log('Entró a listar Users');

    },

    // Get with PAram
    get: function(param) {

        console.log('Entró al get del Users: ', param);

    },

    'test:form': function(param) {

        console.log('dispara el test form');

    }

};
},{}],18:[function(require,module,exports){
/**
 * PUSHSTATE
 *
 */

const pushstate = require('./pushstate/pushstate');
const backspace = require('./keypress/backspace');

module.exports = function() {

    $(backspace);

    $(pushstate);

};

},{"./keypress/backspace":19,"./pushstate/pushstate":20}],19:[function(require,module,exports){
/**
 * Keydown
 *
 */

module.exports = function() {

    /*
     * this swallows backspace keys on any non-input element.
     * stops backspace -> back
     */
    var rx = /INPUT|SELECT|TEXTAREA/i;

    $('body').bind("keydown keypress", function(e) {

        var key = e.keyCode || e.which;

        if( key == 8) { // 8 == backspace or ENTER
            if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
                e.preventDefault();
            }
        } else if(key == 13) {
            
        }

    });

};

},{}],20:[function(require,module,exports){
/**
 * PUSHSTATE
 *
 */

module.exports = function() {

    // Pushstate
    $('body').on('click', 'a[data-pushstate]', function(e) {
        e.preventDefault();
        var target  = $(this).attr('href').replace('#', '/');
        App.Router.to(target);
    });

    // History Back
    $('body').on('click', '[data-back]', function(e) {

        var rx = /INPUT|SELECT|TEXTAREA/i;

        if(e.originalEvent && e.originalEvent.explicitOriginalTarget) {
            var originalTarget  = e.originalEvent.explicitOriginalTarget;
            if(rx.test(originalTarget)){
                e.preventDefault();
                return false;
            }
        }

        e.preventDefault();
        App.Router.back();
        
    });

};

},{}],21:[function(require,module,exports){
/**
 *
 * Helper Flash
 *
 * Flash.valid('Hello');
 *
 * Flash.error('Error');
 *
 */

var template    = require('./templates/default.html');

module.exports  = {

    target: '.flash-message',

    /**
     * Initialize
     */
    init: function(element) {
        this.target  = (element) || '.flash-message';
        if($(this.target+':first').size() < 1) {
            $('body').append('<div class="row"><div class="small-11 medium-9 small-centered columns"><div class="'+ this.target.replace('.', '') +'"></div></div></div>');
        }
        this.buffer();
        this.bind();
        return this;
    },

    /**
     * Bind Event
     */
    bind: function() {
        $('body').on('click', '.alert-box .close', function(e) {
            e.preventDefault();
            $(this).parents('.alert-box:first').hide();
        });
    },

    /**
     * Show Valid Message
     *
     * @param String msg
     * @param Mixing cb
     */
    valid: function(msg, cb) {
        this.display('valid', msg, cb);
    },

    /**
     * Show Info Message
     *
     * @param String msg
     * @param Mixing cb
     */
    info: function(msg, cb) {
        this.display('info', msg, cb);
    },

    /**
     * Show Warning Message
     *
     * @param String msg
     * @param Mixing cb
     */
    warning: function(msg, cb) {
        this.display('warning', msg, cb);
    },

    /**
     * Show Error Message
     *
     * @param String msg
     * @param Mixing cb
     */
    error: function(msg, cb) {
        this.display('alert', msg, cb);
    },

    /**
     *
     * @param String type
     * @param String msg
     * @param Mixing cb
     */
    display: function (type, msg, cb) {
        var data    = {
            id:     Math.floor(Math.random()*11),
            type:   type,
            text:   msg,
            delay:  7000
        };
        if(cb!==undefined) {
            if (typeof cb === "function") {
                $.cookie('flash-message', _.template(template)({msg: data}), { path: '/' });
                setTimeout(function() { cb(); }, 100);
                return;
            } else if(parseInt(cb) > 0) {
                data.delay  = cb;
            }
        }
        this.clear();
        $(this.target+':first').append(_.template(template)({msg: data}));
    },

    /**
     * Clear all flash
     */
    clear: function() {
        $(this.target).empty();
    },

    /**
     * Show Buffer Message
     */
    buffer: function() {
        if($.cookie('flash-message')) {
            $(this.target+':first').append($.cookie('flash-message'));
            $.removeCookie('flash-message', { path: '/' });
        }
    }

};
},{"./templates/default.html":22}],22:[function(require,module,exports){
module.exports = "<div id=\"alert-id-{{= msg.id }}\" data-alert class=\"alert-box callout radius {{= msg.type }}\">\n    <a href=\"#\" class=\"close\">&times;</a>\n    <i class=\"mdi mdi-alert-box\"></i>\n    <i class=\"mdi mdi-checkbox-market\"></i>\n    <i class=\"mdi mdi-close-octagon\"></i>\n    <i class=\"mdi mdi-bell\"></i>\n    {{= msg.text }}\n</div>\n<script type=\"text/javascript\">$(\"#alert-id-{{= msg.id }}\").delay('{{= msg.delay }}').fadeOut(500);</script>";

},{}],23:[function(require,module,exports){
/**
 *
 * Form
 *
 */


// Components
var Counter     = require('helpers/form/counter');
var Currency    = require('helpers/form/currency');
var Datepicker  = require('helpers/form/datepicker');
var Password    = require('helpers/form/password');
var Timepicker  = require('helpers/form/timepicker');
var Upload      = require('helpers/form/upload');
var Switch      = require('helpers/form/switch');

module.exports   = {

    /**
     * Init form elements with helpers
     * @param callback cb
     */
    init: function(cb) {

        $(Switch);

        $('body').find('input:visible').not('readonly').not('disabled').first().trigger('focus');

        setTimeout(function() {

            // Bind Counter
            Counter.init('[data-counter]');

            // Bind Currency
            Currency.init('[data-currency], [data-decimal]');

            // Bind datepicker
            Datepicker.init('[data-datepicker]');

            // Bind Password
            Password.init('[type="password"]');

            // Bind timepicker
            Timepicker.init('[type="timepicker"]');

            // Bind Upload
            Upload.init('[type="file"]');

            // Callback
            if(cb) {
                cb();
            }

        }, 500);

    }

};
},{"helpers/form/counter":24,"helpers/form/currency":25,"helpers/form/datepicker":26,"helpers/form/password":28,"helpers/form/switch":29,"helpers/form/timepicker":32,"helpers/form/upload":33}],24:[function(require,module,exports){
/**
 *
 * Counter
 *
 */

module.exports   = {
    
    /**
     * Init
     *
     * @param {string} element class or id to make as component
     */
    init: function(element) {

    }

};
},{}],25:[function(require,module,exports){
/**
 *
 * Password
 *
 * <input data-currency|data-decimal />
 *
 */

module.exports   = {

    /**
     * Init
     *
     * @param {string} element class or id to make as currency
     */
    init: function(element) {
        return this.bind(element);
    },

    /**
     * Bind element class or id to currency
     * @param string element
     */
    bind: function(element) {

        // Bind elements
        $(element).each(function() {
            if($(this).attr('data-currency') !== undefined) {
                $(this).number(true, 2, '.', ',');
            } else {
                $(this).number(true, 2, '.', '');
            }
        });

    }

};
},{}],26:[function(require,module,exports){
/**
 * Datepicker
 */
var templateIcon    = _.template(require('./templates/datepicker.html'));

module.exports  = {

    /**
     * Init
     *
     * @param {string} element class or id to make as datepicker
     */
    init: function(element) {
        return this.bind(element);
    },

    /**
     * Bind element class or id to datepicker
     * @param string element
     */
    bind: function(element) {

        var _this       = this;

        // All inputs into data-datepicker
        var $inputs      = $(element).find('input');

        // Foreach input
        $($inputs).each(function(i) {

            var $input      = $(this);

            // Prepen Icon
            $input.parent().prepend(templateIcon);

            var format      = $input.attr('data-format') || 'yyyy-mm-dd';
            $input.attr('data-format', format);
            var isCheckin   = $input.hasClass('datepicker-checkin');
            var isCheckout  = $input.hasClass('datepicker-checkout');
            var range       = (isCheckin || isCheckout) ? $input.parents('[data-datepicker]:first') : false;
            var placeholder = $input.attr('placeholder');
            var cb          = $input.attr('data-onchange');
            if(placeholder !== undefined && placeholder.length < 1) {
                $input.attr('placeholder', format.toUpperCase());
            }
            var maxToday    = ($input.data('max') !== undefined) ? true : false;
            if(range !== false && range.size() > 0) {
                if(isCheckin) {
                    $input.attr('data-validator', 'datepicker-range');
                }
                if(isCheckout) {
                    $input.attr('data-validator', 'datepicker-range');
                }
                if(range.find('[data-max]').size() > 0) {
                    maxToday    = true;
                }
            }

            var fdp;
            var nowTemp     = new Date();
            var now         = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
            fdp = $($input).fdatepicker({
                format: format.toLowerCase(),
                onRender: function (date) {
                    var este        = $('.datepicker-checkin', $($input).parents('[data-datepicker]:first'));
                    var value       = (este.size() > 0 && este.val()) ? este.val() : moment();
                    var checkin     = moment(value, format.toUpperCase()).subtract(1, 'days').toDate();
                    if(!maxToday) {
                        if(isCheckin) {
                            return '';
                        }
                        return (isCheckout &&  date.valueOf() < checkin.valueOf()) ? 'disabled' : '';
                    }
                    return date.valueOf() > now.valueOf() || (isCheckout &&  date.valueOf() < checkin.valueOf()) ? 'disabled' : '';
                }
            });

            fdp.on('changeDate', function(ev) {

                // Current datepicker
                var datepicker = $(this);

                // If has checkin or checkout (range)
                if (datepicker.hasClass('datepicker-checkin')) {

                } else if (datepicker.hasClass('datepicker-checkout')) {

                }

                if(cb !== undefined) {
                    cb.apply(datepicker);
                }

            });

        });

    }

};

},{"./templates/datepicker.html":30}],27:[function(require,module,exports){
/**
 *
 * Form
 *
 */

module.exports   = {

    /**
     * Method to get form elements
     *
     * @param jQuery $form
     * @param string field
     * @returns Object
     */
    get: function($form, field) {

        var data    = $form.find(':input').filter(function () {
            if($(this).data('currency') !== undefined) {
                return $.number( this.value, 2, '.', ',' );
            }
            if($(this).data('decimal') !== undefined) {
                return $.number( this.value, 2, '.', '' );
            }
            return $.trim(this.value);
        }).serializeJSON({checkboxUncheckedValue: "0"});

        return (field) ? data[field] : data;

    },

    /**
     * Autoload form with a model or values
     *
     * @param String model
     * @param Object attrs
     * @example Form.autoload('user', { name: 'John Doe', email: 'jhondoe@example.com' }
     *
     */
    load: function(attrs, model, form) {

        // Each values
        $.each(attrs, function(key, value) {

            //
            // key: value
            //
            // key: {
            //     id: value (id is required)
            // }
            //
            // Input: name="model[attribute]" value="value"
            //

            if(value === null) {
                value   = '';
            } else if(typeof value === 'object' && value.id) {
                value   = value.id;
            }

            if(form) {
                $input  = (model) ? $('[name="'+ model +'['+ key +']"]', form) : $('[name="'+key+'"]', form);
            } else {
                $input  = (model) ? $('[name="'+ model +'['+ key +']"]') : $('[name="'+key+'"]');
            }

            // If exist
            if($input.size() > 0 ) {

                // is checkbox
                if ($input.is(':checkbox')) {

                    (value && value !== '0') ? $input.prop('checked', true).change() : $input.prop('checked', false).change();

                    var container   = $input.parents('.md-switch__container:first');
                    if(container.size() > 0) {
                        if(!$input.is(':checked')) {
                            container.find(':input').not(':checkbox').attr('disabled', 'disabled');

                            // Only if has class md-switch__display
                            container.find('.md-switch__display').fadeOut().addClass('hide');
                        } else {
                            container.find(':input').not(':checkbox').removeAttr('disabled');

                            // Only if has class md-switch__display
                            container.find('.md-switch__display').fadeIn().removeClass('hide');

                            setTimeout(function() {
                                container.find(':input').not(':checkbox').first().trigger('focus');
                            }, 100);
                        }
                    }

                } else {

                    // if is datepicker
                    if($input.data('datepicker') !== undefined) {
                        var tmpFormat   = $input.attr('data-format') || 'MM/DD/YYYY';
                        if(value.indexOf("Z") > 0) {
                            value           = (value) ? moment(value).format(tmpFormat) : '';
                        } else if(value.length > 10) {
                            value           = (value) ? moment(value, 'YYYY-MM-DD hh:ii:ss').format(tmpFormat) : '';
                        } else {
                            value           = (value) ? moment(value, 'YYYY-MM-DD').format(tmpFormat) : '';
                        }
                    }

                    // if is currency
                    if($input.data('currency') !== undefined) {
                        value               = (value)   ? $.number(value, 2, '.', ',' ) : '0';
                    }

                    // if is decimal
                    if($input.data('decimal') !== undefined) {
                        value               = (value)   ? $.number(value, 2, '.', '' ) : '0';
                    }

                    $input.val(value);

                }
            }

        });
    },

    /**
     * Remove input error
     * @param JQuery Object object
     */
    inputValid: function($input, timeout) {
        var $container  = $input.parents('div:first');
        setTimeout(function() {
            $container.find('label').removeClass('is-invalid-label');
            $container.find('.form-error').removeClass('is-visible');
            $input.removeAttr('data-invalid').removeAttr('aria-invalid').removeClass('is-invalid-input');
        }, (timeout > 0) ? timeout : 500);
    },

    /**
     * Show input error
     * @param JQuery Object object
     */
    inputInvalid: function($input, msg, timeout) {
        var $container  = $input.parents('div:first');
        var $inputError = $container.find('.form-error');
        setTimeout(function() {
            $container.find('label').addClass('is-invalid-label');
            if(msg) {
                $inputError.html(msg);
            }
            $inputError.addClass('is-visible');
            $input.attr('data-invalid', '').attr('aria-invalid', 'true').addClass('is-invalid-input');
            $input.parents('form:first').attr('data-invalid', '');
        }, (timeout > 0) ? timeout : 500);
    },

    /**
     * Return a select populated with the data
     * @param $jquery $input
     * @param array data
     * @param Object fields
     * @returns null
     */
    dbSelect: function($input, data, fields, blank, value) {

        if(!data) {
            return;
        }

        if(!fields) {
            fields  = {value: 'id', option: 'name'};
        }

        var options = '';
        var tmpSelect = blank || 'Select';
        if (blank || blank === undefined) {
            options = '<option value="">' + tmpSelect + '</option>';
        }

        var each = function(items, fEach, cb){
            var total = items.length,
                i     = 0,
                end   =  cb || function(){},
                next  = function(i, items) {
                    setTimeout(function() {
                        fEach(i, items[i]);
                        i++;
                        if(i< total){
                            next(i, items);
                        }else{
                            cb();
                        }
                    }, 0);
                };
            next(i, items);
        };

        $input.empty();
        $input.html('<option value="">Loading...</option>');

        each(data, function(i, j) {
            var row     = data[i];
            var pkValue = row[fields.value] || '';
            var option;

            if(Array.isArray(fields.option)) {
                var tmpOption   = [];
                fields.option.forEach(function(k) {
                    tmpOption.push(row[k] || '');
                });
                option  = tmpOption.join(' ');
            } else if ( /\|/.test(fields.option) ) {
                let parts   = fields.option.split('|');
                let opt     = [];
                parts.forEach(function(i) {
                    if(row[i]) {
                       opt.push(row[i]);
                    }
                });
                option  = opt.join(' | ');
            } else {
                option  = row[fields.option] || '';
            }

            if ((pkValue || pkValue === '0') && option) {
                var selected    = (pkValue === value) ? 'selected="selected"' : '';
                options += '<option value="' + pkValue + '" '+selected+'>' + option + '</option>';
            }
        }, function(){
            $input.empty();
            $input.html(options);
        });

    }


};
},{}],28:[function(require,module,exports){
/**
 *
 * Password
 *
 * <input type="password />
 *
 */

module.exports   = {

    /**
     * Init
     *
     * @param {string} element class or id to make as component
     */
    init: function(element) {

    }

};
},{}],29:[function(require,module,exports){
/**
 *
 * Siwtch
 *
 */

module.exports   = function() {

    // Disable Siwtch Elements
    $('body').on('change', '.md-switch__container [type="checkbox"]', function(e) {
        
        var este        = $(this);
        var container   = este.parents('.md-switch__container:first');

        if(!este.is(':checked')) {
            container.find(':input').not(':checkbox').attr('disabled', 'disabled');

            // Only if has class md-switch__display
            container.find('.md-switch__display').fadeOut().addClass('hide');
        } else {
            container.find(':input').not(':checkbox').removeAttr('disabled');

            // Only if has class md-switch__display
            container.find('.md-switch__display').fadeIn().removeClass('hide');

            setTimeout(function() {
                container.find(':input').not(':checkbox').first().trigger('focus');
            }, 100);
        }

    });

};
},{}],30:[function(require,module,exports){
module.exports = "<div class=\"input-group-float input-group-float__right\">\n    <span class=\"input-group-label input-group-label__icon\">\n        <i class=\"mdi mdi-calendar\"></i>\n    </span>\n</div>";

},{}],31:[function(require,module,exports){
module.exports = "<div class=\"file-upload\">\n    <div class=\"row\">\n        <div class=\"small-12 columns\">\n\n            <label class=\"file-upload__content\" for=\"{{=id}}\">\n                <span class=\"file-upload__placeholder\">\n\n                    <span class=\"file_upload__placeholder__delete\">\n                        <i class=\"mdi mdi-delete\"></i>\n                    </span>\n\n                    <span class=\"file-upload__placeholder__content\">\n                        <i class=\"mdi mdi-cloud-upload\"></i>\n                        <span class=\"file-upload__placeholder__msg\">\n                            Arrastra o selecciona una imagen\n                        </span>\n                    </span>\n\n                </span>\n            </label>\n\n            <div class=\"file-upload__progressbar\">\n                <div class=\"success progress\">\n                    <div class=\"progress-meter\" style=\"width: 0%\">\n                        <div class=\"progress-meter__animation\"></div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>";

},{}],32:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"dup":28}],33:[function(require,module,exports){
/**
 *
 * Upload
 *
 */

var Form        = require('helpers/form/form');
var config      = require('../../config/config');
var template    = _.template(require('./templates/upload.html'));

$('body').on('click', '.file_upload__placeholder__delete', function(e) {
    e.preventDefault();
    var fileUpload  = $(this).parents('.file-upload');
    var inputReset  = fileUpload.parents('div:first').find('input');
    App.Modal.render('confirm', {
        title: 'Eliminar Imagen',
        description: 'Estás seguro de querer eliminar esta imagen cargada?',
        onAccept: function() {
            inputReset.val('');
            fileUpload.find('.file-upload__content:first').css({'background-image': 'none', 'height': 'auto'}).removeClass('has-image');
        }
    });
    return false;
});

module.exports   = {

    dropZone: '',

    accepted: '',

    maxSize: 5000000,

    humanSize: '',

    /**
     * Init
     *
     * @param {string} element class or id to make as component
     */
    init: function(element) {
        return this.bind(element);
    },

    bind: function(element) {

        var _this           = this;
        $(element).not('.file-upload-initialized').each(function() {

            $input          = $(this);
            if($input.attr('id') === undefined) {
                $input.attr('id', 'file-upload__input-'+ Date.now());
            };

            $input.addClass('hide file-upload-initialized');
            $input.after(template({id: $input.attr('id') }));

            var $inputTarget= $('[name="'+ $input.attr('data-target') +'"]', $input.parents('div:first'));
            if($inputTarget.val()) {
                _this._loadImageToBackground($inputTarget.val(), $input.parent());
            }

            _this.dropZone  = $input.parent().find('.file-upload:first');
            _this.accepted  = $input.attr('accept');
            if($input.attr('data-maxsize') !== undefined) {
                _this.maxSize   = _this._sizeToBytes($input.attr('data-maxsize'), true);
            }
            _this.humanSize = _this._bytesToSize(_this.maxSize, true);

            $input.fileupload({

                dataType:           'html',
                acceptFileTypes:    /(\.|\/)(gif|jpe?g|png)$/i,
                maxFileSize:        _this.maxSize,
                dropZone:           _this.dropZone,
                url:                App.Filter.get(config.SERVER.host, 'rtrim', '/') + '/upload/?name='+ $input.attr('name'),
                singleFileUploads:  true,
                beforeSend: function(req) {
                    if(config.SERVER.headers) {
                        for(i in config.SERVER.headers) {
                            req.setRequestHeader(i, config.SERVER.headers[i]);
                        }
                    }
                }

            }).bind('fileuploadadd', function (e, data) {

                // Validate file
                if(!_this._validate($input, data)) {
                    return false;
                }

                // Start Transmition
                _this.start($(this));

                data.submit();

            }).bind('fileuploadprogressall', function (e, data) {

                //Progress
                var progress = parseInt(data.loaded / data.total * 100, 10);
                _this.updateProgressBar($(this), progress);


            }).bind('fileuploadprocessalways', function (e, data) {

                // Append Preview

            }).bind('fileuploaddone', function(e, data) {

                _this.endProgressBar($(this));

                //Result
                try {
                    var tmp     = data.result.replace('<pre>', '').replace('</pre>', '');
                    var r       = JSON.parse(tmp);
                    if (r.success === true) {

                        $inputTarget.val(r.data.url);

                        _this._loadImageToBackground(r.data.url, $(this).parent());

                        return r;
                    } else {
                        App.Flash.error((r.msg !== undefined) ? r.msg : 'El archivo no se pudo subir al sevidor. Intenta nuevamente.');
                    }
                } catch (e) {
                    console.log(e);
                    App.Flash.error('El archivo no se pudo subir al sevidor. Intenta nuevamente.');
                    return {};
                }

            }).bind('fileuploadfail', function (e, data) {

                //Show error
                App.Flash.error('El archivo no pudo ser subido al servidor.\nIntenta nuevamente.');
                _this.endProgressBar($(this));

            });

        });

        // Bind Drag Zone
        _this._bindDrag();

    },

    /**
     * Start transmition
     * @param {type} input
     * @returns {undefined}
     */
    start: function (input) {

        // Disable submit button
        var $form    = input.parents('form').first();
        $form.find(':submit').attr('disabled', 'disabled');

        // Reset proggres barr
        var container   = input.parent();
        var msg         = container.find('.file-upload__placeholder__msg');
        msg.text('Subiendo');
        container.find('.progress').removeClass('alert');
        container.find('.progress-meter:first').css('width', '0%');
        input.prop('disabled', true);

    },

    /**
     * Update proggres bar
     * @param {type} input
     * @param {type} progress
     * @returns {undefined}
     */
    updateProgressBar: function (input, progress) {

        var bar     = input.parent().find('.file-upload__progressbar');
        bar.find('.progress-meter:first').css('width', progress + '%');

    },

    //End Progress bar
    endProgressBar: function (input, alert) {

        // Remove attr disable
        var $form    = input.parents('form').first();
        $form .find(':submit').removeAttr('disabled');

        var container   = input.parent();
        var msg         = container.find('.file-upload__placeholder__msg');
        msg.text('Arrastra o selecciona una imagen');

        var bar     = container.find('.file-upload__progressbar');
        bar.find('.progress-meter:first').fadeOut(700).css('width', '0%');

        input.prop('disabled', false);

    },

    /**
     * Load image
     * @param {type} image
     * @param {type} scope
     * @returns {undefined}
     */
    _loadImageToBackground: function(image, scope) {

        loadImage(image, function(img) {
            var height  = $(img).attr('height');
            if(height > 200) {
                height  = 200;
            }
            var container   = $('.file-upload__content', scope);
            container.css({'background-image': 'url('+ image +')', 'height': height+'px'});
            container.addClass('has-image');
        });

    },

    /**
     * Convert size to bytes.
     * @param string size
     * @param boolean decimals
     * @returns number
     */
    _sizeToBytes: function (size, decimals) {
        var bytes = decimals ? {'B': 1, 'KB': 1000, 'MB': (1000 * 1000), 'GB': (1000 * 1000 * 1000), 'TB': (1000 * 1000 * 1000 * 1000), 'PB': (1000 * 1000 * 1000 * 1000 * 1000)} : {'B': 1, 'KB': 1024, 'MB': (1024 * 1024), 'GB': (1024 * 1024 * 1024), 'TB': (1024 * 1024 * 1024 * 1024), 'PB': (1024 * 1024 * 1024 * 1024 * 1024)};
        var matches = size.match(/([KMGTP]?B)/);
        size = parseFloat(size) * bytes[matches[1]];
        return size.toFixed(0);
    },

    /**
     * Convert bytes to human size
     * @param int bytes
     * @param boolean decimals
     * @returns string
     */
    _bytesToSize: function (bytes, decimals) {
        var thresh = decimals ? 1000 : 1024;
        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        var units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (Math.abs(bytes) >= thresh && u < units.length - 1);
        return (decimals) ? bytes.toFixed(0) + ' ' + units[u] : bytes.toFixed(1) + ' ' + units[u];
    },

    /*
     * Get extensions
     */
    _extension: function (name) {
        var pattern = /^.+\.([^.]+)$/;
        var ext = pattern.exec(name);
        return ext === null ? "" : ext[1];
    },

    /*
     * Validate Type
     *
     * //TODO migreate to abide validation pattern="image, video, file"
     * @returns boolean
     */
    _validate: function($input, data) {

        var _this           = this;

        var acceptFileTypes = /(\.|\/)(gif|jpe?g|png)$/i;

        //Validate Video
        var acceptVideoTypes = /(\.|\/)?(mkv|flv|ogg|ogv|avi|mov|wmv|mp4|mpeg|mpg|3gp?p|m4v|x-msvideo|quicktime)$/i;

        //Validate Input
        if (data.originalFiles[0]['type'] !== undefined) {
            var dataType = data.originalFiles[0]['type'];
            if (dataType.length === 0) {
                dataType = _this._extension(data.originalFiles[0]['name']);
            }
            if (_this.accepted === 'video/*') {
                if (!acceptVideoTypes.test(dataType)) {
                    Form.inputInvalid($input, 'El video no es válido (.' + dataType + ')');
                    return false;
                }
            } else if (_this.accepted === 'image/*') {
                if (!acceptFileTypes.test(dataType)) {
                    Form.inputInvalid($input, 'El tipo de archio no es válido.');
                    return false;
                }
            }
            //Validate Size
            var size = data.originalFiles[0]['size'];
            if (size > _this.maxSize) {
                Form.inputInvalid($input, 'El tamaño del archivo supera el permitido ' + _this.humanSize + '.');
                return false;
            }
        }

        return true;

    },


    /**
     * Bind drag
     */
    _bindDrag: function () {

        $(document).bind('drop dragover', function (e) {
            e.preventDefault();
        });

        $(document).bind('dragover', function (e) {

            var dropZone = $('.file-upload'), foundDropzone, timeout = window.dropZoneTimeout;
            if (!timeout) {
                dropZone.addClass('in');
            } else {
                clearTimeout(timeout);
            }
            var found = false, node = e.target;
            do {
                if ($(node).hasClass('file-upload')) {
                    found = true;
                    foundDropzone = $(node);
                    break;
                }
                node = node.parentNode;
            } while (node !== null);
            dropZone.removeClass('in hover');
            if (found) {
                foundDropzone.addClass('hover');
            }
            window.dropZoneTimeout = setTimeout(function () {
                window.dropZoneTimeout = null;
                dropZone.removeClass('in hover');
            }, 100);

        });

    }

};
},{"../../config/config":11,"./templates/upload.html":31,"helpers/form/form":27}],34:[function(require,module,exports){
/**
 * Utility functions to create interactive ui components for the application in
 * general.
 */

var templateBasic       = _.template(require('./templates/basic.html'));
var templateConfirm     = _.template(require('./templates/confirm.html'));
var templateDate        = _.template(require('./templates/filter-date.html'));

var Form                = require('helpers/form/form');

module.exports = {

    /**
     * Create a modal.
     *
     * @param  {String} type
     * @param  {Object} opts
     *
     * @return {jQuery}
     */
    render: function (type, opts) {

        var attrs   = _({}).extend({
            id:             'modal-' + Date.now(),
            title:          '',
            description:    '',
            data:           {},
            iconClose:      false,
            iconCloseLink:  false,
            button:         false,
            buttonText:     '',
            buttonLink:     false,
            buttonAccept:   'Aceptar',
            buttonCancel:   'Cancelar',
            onAccept:       null,
            onCancel:       null,
            onSubmit:       null,
            template:       null
        }, opts);

        var $el;

        switch (type) {
            case 'confirm':
                $el = $(templateConfirm(attrs));
                break;
            case 'basic':
                $el = $(templateBasic(attrs));
                break;
            case 'date':
                $el = $(templateDate(attrs));
                break;
            case 'custom':
                $el = $(attrs.template(attrs));
                break;
        }

        $($el).appendTo('body');

        $el.foundation();

        if (attrs.onAccept) {
            $el.find('.btn-confirm').on('click', attrs.onAccept);
        }
        if (attrs.onCancel) {
            $el.find('.btn-cancel').on('click', attrs.onCancel);
        }
        if (attrs.onSubmit) {
            $('body').on('submit', $el.find('form:first'), function(e) {
                e.preventDefault();
                attrs.onSubmit();
                return false;
            });
        }

        $el.foundation('open');

        $el.on('closed.zf.reveal', function(e) {

            $el.remove();

        });

        return $el;

    }

};

},{"./templates/basic.html":35,"./templates/confirm.html":36,"./templates/filter-date.html":37,"helpers/form/form":27}],35:[function(require,module,exports){
module.exports = "<div class=\"reveal reveal-modal\" id=\"{{=id}}\" data-reveal data-options=\"closeOnClick: false; closeOnEsc: false;\">\n\n    <div class=\"reveal-modal-header\">\n        <div class=\"row\">\n            <div class=\"small-12 columns\">\n                <button class=\"close-button\" data-close aria-label=\"Close modal\" type=\"button\">\n                    <span aria-hidden=\"true\"><i class=\"mdi mdi-close\"></i></span>\n                </button>\n                <h2>{{= title }}</h2>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"reveal-modal-body\">\n        <div class=\"large-12 columns\">\n            <p class=\"reveal-modal-body__text\">{{=description}}</p>\n        </div>\n    </div>\n\n    <div class=\"reveal-modal-actions\">\n        {{ if (buttonText || buttonLink) { }}\n            <div class=\"small-12 columns text-right\">\n            {{ if (buttonLink) { }}\n                <a class=\"md-button md-button__flat\" data-close href=\"{{=buttonLink}}\">{{=buttonText}}</a>\n            {{ } else { }}\n                <button class=\"md-button md-button__flat\" data-close type=\"button\">{{=buttonText}}</button>\n            {{ } }}\n            </div>\n        {{ } }}\n    </div>\n\n</div>\n";

},{}],36:[function(require,module,exports){
module.exports = "<div id=\"{{=id}}\" class=\"reveal reveal-modal\" data-reveal data-options=\"closeOnClick: false; closeOnEsc: false;\">\n\n    <div class=\"reveal-modal-header\">\n        <div class=\"row\">\n            <div class=\"small-12 columns\">\n                <button class=\"close-button btn-cancel\" data-close aria-label=\"Close modal\" type=\"button\">\n                    <span aria-hidden=\"true\"><i class=\"mdi mdi-close\"></i></span>\n                </button>\n                <h2>{{= title }}</h2>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"reveal-modal-body\">\n        <div class=\"row\">\n            <div class=\"small-12 columns\">\n                <p class=\"reveal-modal-body__text text-left\">{{=description}}</p>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"reveal-modal-actions\">\n        <div class=\"small-12 columns\">\n            <div class=\"button-group float-right\">\n                <button class=\"btn-cancel   md-button md-button__flat md-ripple\" data-close>{{=buttonCancel}}</button>\n                <button class=\"btn-confirm  md-button md-button__flat md-ripple\" data-close>{{=buttonAccept}}</button>\n            </div>\n        </div>\n    </div>\n\n</div>\n";

},{}],37:[function(require,module,exports){
module.exports = "<div class=\"reveal reveal-modal\" id=\"{{=id}}\" data-reveal data-options=\"closeOnClick: false; closeOnEsc: false;\">\n\n    <div class=\"reveal-modal-header\">\n        <div class=\"row\">\n            <div class=\"small-12 columns\">\n                <button class=\"close-button\" data-close aria-label=\"Close modal\" type=\"button\">\n                    <span aria-hidden=\"true\"><i class=\"mdi mdi-close\"></i></span>\n                </button>\n                <h2>{{= title }}</h2>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"reveal-modal-body\">\n\n        <div class=\"row\">\n            <div class=\"small-12 columns\">\n\n                <form id=\"form-{{=id}}\" method=\"post\" data-abide novalidate data-options=\"liveValidate: false;\">\n\n                    <div class=\"row\" data-datepicker>\n                        <div class=\"small-6 columns\">\n                            <div class=\"row collapse\">\n                                <div class=\"small-12 columns\">\n                                    <input type=\"text\" value=\"\" class=\"datepicker-checkin\" required data-max=\"today\" />\n                                    <label>Desde</label>\n                                    <span class=\"form-error\">La fecha inicial debe ser válida y menor que la fecha final.</span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"small-6 columns\">\n                            <div class=\"row collapse\">\n                                <div class=\"small-12 columns\">\n                                    <label>Hasta\n                                        <input type=\"text\" value=\"\" class=\"datepicker-checkout\" required />\n                                        <span class=\"form-error\">La fecha final debe ser mayor a la fecha incial.</span>\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"reveal-modal-actions\" style=\"margin-top: 1rem\">\n                        <div class=\"row\">\n                            <div class=\"small-12 columns text-right\">\n                                <button class=\"md-button md-button__flat\" type=\"submit\">{{=buttonAccept}}</button>\n                            </div>\n                        </div>\n                    </div>\n\n                </form>\n\n            </div>\n        </div>\n\n    </div>\n\n</div>\n";

},{}],38:[function(require,module,exports){
/**
 * API Connection
 *
 * host: see config/connections.js
 *
 * GET:
 *
 * Api.get('endpoint).done(function(rs) {
 *
 * }).fail(function() {
 *
 * }).always(function() {
 *
 * });
 *
 *
 * POST:
 *
 * Api.post('endpoint', { data }).done(function(rs) {
 *
 * }).fail(function() {
 *
 * }).always(function() {
 *
 * });
 *
 */

const Config = require('../config/config');

// Support cors
$.support.cors = true;

module.exports = {

    lastError: {

    },

    get: function (endpoint) {

        return this._send(endpoint, 'GET');

    },

    post: function (endpoint, data) {

        return this._send(endpoint, 'POST', data);

    },

    put: function (endpoint, data) {

        return this._send(endpoint, 'PUT', data);

    },

    destroy: function (endpoint) {

       return this._send(endpoint, 'DELETE');

    },

    setError: function (endpoint, xhr, text) {

        let data = {
            'statusCode':   xhr.statusCode().status,
            'error':        text,
            'endpoint':     endpoint
        };

        let error = (!xhr.responseJSON) ? data : $.extend(data, xhr.responseJSON);
        if(error.error === 'error') {
            error.error  = 'Se ha producido un error en la comunicación con el servidor. Por favor intenta más tarde.';
        }

        this.lastError  = error;

        return this.lastError;

    },

    _send: function(endpoint, type, params) {

        var _this       = this;

        _this.lastError = {};

        //Url
        var url         = App.Filter.get(Config.SERVER.host, 'rtrim', '/') +'/'+ App.Filter.get(endpoint, 'trim', '/');
        var headers     = Config.SERVER.headers;

        // Config
        var prop        = {
            'url':          url,
            'async':        true,
            'dataType':     'json',
            'type':         type.toUpperCase(),
            'data':         (type === 'GET') ? undefined : params,
            beforeSend: function(req) {
                if(headers) {
                    let i;
                    for(i in headers) {
                        req.setRequestHeader(i, headers[i]);
                    }
                }
            }
        };

        //Request
        const request = $.ajax(prop);

        request.done(function () {

        }).fail(function (xhr, text) {

            // Set error
            _this.setError(endpoint, xhr, text);
        }).always(function () {

        });

        return request;

    }

};
},{"../config/config":11}],39:[function(require,module,exports){
/**
 * Filter
 *
 * Filter.get(' custom string', 'trim');
 * return 'custom
 *
 */

var Filters     = ({"ltrimFilter":require("./filters/ltrimFilter.js"),"prefixFilter":require("./filters/prefixFilter.js"),"rtrimFilter":require("./filters/rtrimFilter.js"),"suffixFilter":require("./filters/suffixFilter.js"),"trimFilter":require("./filters/trimFilter.js")});

module.exports  = {

    get: function(str, filters, opts) {

        var _this       = this;

        if(Array.isArray(filters)) {
            filters.forEach(function(filter) {
                var f   = _this.load(filter);
                str     = f.exec(str, opts);
            });
            return str;
        } else {
            var f       = _this.load(filters);
            return f.exec(str, opts);
        }

    },

    load: function(filter) {
        if(!Filters[filter+'Filter']) {
            console.error("FILTER", filter, "NOT FOUND INTO /libs/filter/filters");
        }
        return Filters[filter+'Filter'];
    }



};
},{"./filters/ltrimFilter.js":40,"./filters/prefixFilter.js":41,"./filters/rtrimFilter.js":42,"./filters/suffixFilter.js":43,"./filters/trimFilter.js":44}],40:[function(require,module,exports){
/**
 * Filter ltrim
 *
 * Filter.get('custom string', 'ltrim', 'cus');
 * return 'tom string'
 *
 */
module.exports   = {

    exec: function(str, opt) {
        if (opt) {
            while (str.charAt(0) == opt)
                str = str.substr(1, str.length - 1);
        } else {
            while (str.charAt(0) == " ")
                str = str.substr(1, str.length - 1);
        }
        return str;
    }

};
},{}],41:[function(require,module,exports){
/**
 * Filter prefix
 *
 * Filter.get('custom string', 'prefix', '/');
 * return '/custom string'
 *
 */
module.exports   = {

    exec: function(str, opt) {

        if (str.indexOf(opt) === 0) {
            return str;
        } else {
            return opt + str;
        }

    }

};
},{}],42:[function(require,module,exports){
/**
 * Filter ltrim
 *
 * Filter.get('custom string', 'ltrim', 'cus');
 * return 'tom string'
 *
 */
module.exports   = {

    exec: function(str, opt) {
        if (opt) {
            while (str.charAt(str.length - 1) == opt)
                str = str.substr(0, str.length - 1);
        } else {
            while (str.charAt(str.length - 1) == " ")
                str = str.substr(0, str.length - 1);
        }
        return str;
    }

};
},{}],43:[function(require,module,exports){
/**
 * Filter suffix
 *
 * Filter.get('custom string', 'suffix', '/');
 * return 'custom string/'
 *
 */
module.exports   = {

    exec: function(str, opt) {

        if (str.endsWith(opt))  {
            return str;
        } else {
            return str + opt;
        }

    }

};
},{}],44:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],45:[function(require,module,exports){
module.exports  = {

    // Convert an objecto to query string
    'toQueryString': function (parameters) {
        var queryString = _.reduce(parameters, function (components, value, key) {
            if(value !== undefined) {
                components.push( key + '=' + encodeURIComponent( value ) );
            }
            return components;
        },[]).join( '&' );
        if (queryString.length > 0) {
            queryString = '?' + queryString;
        }
        return queryString;
    }

};
},{}],46:[function(require,module,exports){
var Config      = require('../../config/config');
var mixing      = require('./mixing');


module.exports = function() {
   
    // Underscore Templates
    _.templateSettings  = Config.TEMPLATE_SETTINGS;

    // Underscore Mixing
    _.mixin(mixing || {});

};

},{"../../config/config":11,"./mixing":45}],47:[function(require,module,exports){
/**
 * Utility for fundation
 *
 */

var Abide       = require('libs/zurb/components/abide');

module.exports  = {

    /**
     * Init
     */
    init: function() {

        $(document).foundation();

        // Abide
        this.abide();

        // Sticky
        this.sticky();

        // Tabs
        this.tabs();


    },

    reflow: function() {

        // Foundation.reInit() ?
        Foundation.reflow();

    },

    /**
     * Custom utility for abide
     */
    abide: function() {

        // Merged
        Foundation.Abide.defaults.patterns      = _.extend(Foundation.Abide.defaults.patterns,      Abide.patterns);
        Foundation.Abide.defaults.validators    = _.extend(Foundation.Abide.defaults.validators,    Abide.validators);

        $('form[data-abide]').attr('novalidate', 'novalidate');

    },

    /**
     * Custom utility for sticky
     */
    sticky: function() {

        $('.md-topbar__sticky').unstick();
        $('.md-topbar__sticky').sticky({topSpacing: 0});

    },

    /**
     * Custom utility for tabs
     */
    tabs: function() {

        $('body').on('change.zf.tabs', '[data-tabs]', function(e) {

        });

    }

};
},{"libs/zurb/components/abide":48}],48:[function(require,module,exports){
/**
 *
 * Abide
 *
 * <form data-abide novalidate>
 *
 * </form>
 *
 */
module.exports   = {

    /*
     * CUSTOM PATTERNS
     *
     * Example
     * <input type="text" pattern="year" />
     */
    patterns: {

        // Only positives number
        'pint': /^[0-9]+$/,
        
        // Decimal number
        'decimal': /^(?!0\d|$)\d*(\.\d{1,4})?$/,

        // Year format
        'year': /^(19|20)\d\d/,

        // Month format
        'month': /^(0[1-9]|1[012])/,

        // Day format
        'day': /^(0[1-9]|[12][0-9]|3[01])/,

        // Currency format 1.00
        'currency': /^((\d+)|(\d{1,3})(\,\d{3}|)*)(\.\d{2}|)$/
    },

    /*
     * CUSTOM VALIDATORS
     *
     * Example:
     * <input type="text" data-validator="multi-email" />
     */
    validators: {

        // Datepicker Checkin
        'datepicker-range': function($el, required, parent) {

            if(!$el.val()) { // If not has val but is required
                return (required) ? false : true;
            }

            var container   = $el.parents('[data-datepicker]:first');
            var format      = ($el.attr('data-format') || 'YYYY-MM-DD').toUpperCase();

            // Checkin and checkout input
            var checkin     = ($el.hasClass('datepicker-checkin'))  ? $el   :   container.find('.datepicker-checkin:first');
            var checkout    = ($el.hasClass('datepicker-checkout')) ? $el   :   container.find('.datepicker-checkout:first');

            // Values
            var valCheckin  = checkin.val()     ? moment(checkin.val(), format)     : '';
            var valCheckout = checkout.val()    ? moment(checkout.val(), format)    : '';

            // Boolean Valid
            var valid       = true;

            if($el.hasClass('datepicker-checkin')) {

                if(container.size() > 0 && checkout.size() === 0) { // If not exist
                    console.log("Missing the datepicker-checkout class into data-datepicker");
                    return false;
                }

                // If has checkout
                if (checkout.size() > 0 && valCheckout) {
                    if( valCheckin > valCheckout ) {
                        valid   = false;
                    } else if(!valCheckout) {
                        setTimeout(function() {
                            container.find('.datepicker-checkout:first').trigger('focus');
                        }, 500);
                    }
                }

            } else {

                if(container.size() > 0 && checkin.size() === 0) { // If not exist
                    console.log("Missing the datepicker-checkin class into datepicker-range");
                    valid   = false;
                }

                // If has checkout
                if (checkin.size() > 0 && valCheckin && (valCheckin > valCheckout) ) {
                    valid   = false;
                }

            }

            return valid;

        },

        // Validator for input with multiple email: a@b.com, c@d.com, e@f.com
        'multi-email': function($el, required, parent) {

            if(!$el.val()) { // $el is jQuery selector
                return (required) ? false : true; // If not has val but is required
            }

            var valid   = true;

            if($el.val()) {
                var emails  = $el.val().split(',');
                var pattern = Foundation.Abide.defaults.patterns.email;
                $.each(emails, function(i, j) {
                    if(!pattern.test( $.trim(emails[i]) )) {
                        valid   = false;
                        return false;
                    }
                });
            }

            return valid;

        }
    }

};
},{}],49:[function(require,module,exports){
/**
 * Example model
 *
 * @description
 */

module.exports = {

    defaults: {
        id: '',
        name: ''
    },

    // Method constuctor
    initialize: function() {

    },

    getElements: function() {
        return ['red', 'blue', 'orange', 'black', 'white', 'yellow'];
    }

};
},{}],50:[function(require,module,exports){
module.exports = "<h2>Test 1: {{= hola }}</h2>";

},{}],51:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],52:[function(require,module,exports){
module.exports = "<h2>Test 2: {{= hola }}</h2>";

},{}],53:[function(require,module,exports){
module.exports = "<h2>Test 4 without data</h2>";

},{}],54:[function(require,module,exports){
var view        = _.template(require('./templates/index.html'));

module.exports  = {

    render: function() {

        // Load the compiled HTML into the Backbone "el"
        this.html( view );

    }

};
},{"./templates/index.html":56}],55:[function(require,module,exports){
var view        = _.template(require('./templates/list.html'));

module.exports  = {

    render: function() {

        // Load the compiled HTML into the Backbone "el"
        this.html( view(this.data) );

    }

};
},{"./templates/list.html":57}],56:[function(require,module,exports){
module.exports = "{{= App.View.Partial('test1', {hola: 'hola'}) }}\n\n<h1>Index</h1>\n\n{{= App.View.Partial('test2', {hola: 'mundo'}) }}\n\n<h1>More Partials</h1>\n\n{{= App.View.Partial('test2', {hola: 'mundo 2 repetido'}) }}\n\n{{= App.View.Partial('folder/test3', {hola: 'folder 3'}) }}\n\n{{= App.View.Partial('test4') }}";

},{}],57:[function(require,module,exports){
module.exports = "<h1>List {{= data }}</h1>";

},{}],58:[function(require,module,exports){

/**
 * MAIN VIEW
 */
var Zurb        = require('libs/zurb/Zurb');
var Bind        = require('helpers/form/bind');

module.exports  = {

    // Array with views loaded
    viewsLoaded: [],

    //
    // Initialize
    //
    initialize: function() {

        this.render();

    },

    //
    // Render
    //
    render: function() {

        this.clean();

        // Load Header
        //this.header     = App.View.Component('header');

        // Push to views loaded
        //this.viewsLoaded.push(this.header);
        this.viewsLoaded.push(this.view);


        // Append Header
        //this.$el.append(this.header.el);

        // Append view
        this.$el.append(this.view.el);

        // Foundation Start
        Zurb.init();

        // Bind Form components
        Bind.init();

        return this;

    },

    //
    // Clean View
    //
    clean: function() {

        // Remove all views loaded previously
        this.viewsLoaded.forEach(function(view) {
            view.remove();
        });

        // COMPLETELY UNBIND THE VIEW
        this.undelegateEvents();
        this.$el.removeData().unbind();
        this.$el.empty();

    }

};

},{"helpers/form/bind":23,"libs/zurb/Zurb":47}],59:[function(require,module,exports){
var view        = _.template(require('./templates/index.html'));

module.exports  = {

    events: {
        'submit form': 'test'
    },

    render: function() {

        // Load the compiled HTML into the Backbone "el"
        this.html( view );

        // Load subviews
        //this.assign('subview', '.wrapper-user');

    },

    test: function(e) {
        e.preventDefault();
        console.log('Trigger event test');
        return false;
    }

};
},{"./templates/index.html":60}],60:[function(require,module,exports){
module.exports = "\n<div class=\"row\">\n    <div class=\"small-12 columns\">\n        <h1>Users hola</h1>\n        <form data-abide>\n\n            <div class=\"row\">\n                <div class=\"small-12 columns\">\n\n                    <label>Input\n                        <input type=\"text\" required name=\"model[field]\">\n                        <span class=\"form-error\">This input is required</span>\n                    </label>\n\n                </div>\n            </div>\n\n            <div class=\"row\">\n                <div class=\"small-12 columns\">\n                    <button type=\"submit\" class=\"button primary\">SAVE</button>\n                </div>\n            </div>\n\n        </form>\n\n        <div class=\"wrapper-user\"></div>\n    </div>\n</div>\n";

},{}]},{},[3]);
