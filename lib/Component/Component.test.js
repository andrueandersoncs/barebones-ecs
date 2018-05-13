'use strict';

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('constructor', function () {
  var properties = { a: 'a', b: 'b', c: 'c' };
  var component = new _Component2.default('testComponent', properties);

  test('copies properties', function () {
    for (var key in properties) {
      expect(component[key] === properties[key]).toBe(true);
    }
  });

  /* Maybe only allow primitives as properties to a component?
  // Pro: no memory leaks
  // Pro: no dangling references
  // Con: components could not hold references to other components
  // Con: components could not hold references to objects / complex types
  test('allows only primitives as properties', () => {
    for (let key in properties) {
      expect(typeof component[key] !== 'object').toBe(true);
    }
  }); */
});

describe('isValidComponent', function () {
  var validComponent = new _Component2.default('testComponent', {});
  var invalidComponent = {};

  test('identifies valid components', function () {
    expect(_Component2.default.isValidComponent(validComponent)).toBe(true);
  });

  test('identifies invalid components', function () {
    expect(_Component2.default.isValidComponent(invalidComponent)).toBe(false);
  });
});