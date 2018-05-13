'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _Component = require('../Component');

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('constructor', function () {
  test('accepts preexisting id', function () {
    var testId = 'aaaa-dddd-bbbb-cccc';
    var entity = new _index2.default(testId);
    expect(entity.id).toEqual(testId);
  });

  test('generates id if none specified', function () {
    var entity = new _index2.default();
    expect(entity.id).toBeDefined();
    expect(_typeof(entity.id)).toBe('string');
    expect(entity.id.length).toBeGreaterThan(0);
  });

  test('accepts preexisting components', function () {
    var testComponent = new _Component2.default('testComponent');
    var testComponents = { testComponent: testComponent };
    var entity = new _index2.default(false, testComponents);
    expect(entity.components).toBe(testComponents);
  });
});

describe('isValidEntity', function () {
  var validEntity = new _index2.default();
  var invalidEntity = {};

  test('valid entity is valid', function () {
    expect(_index2.default.isValidEntity(validEntity)).toBe(true);
  });

  test('invalid entity is invalid', function () {
    expect(_index2.default.isValidEntity(invalidEntity)).toBe(false);
  });
});

describe('addComponent', function () {
  var entity = new _index2.default();
  var component = new _Component2.default('testComponent', {});
  entity.addComponent(component);

  test('component is added', function () {
    expect(entity.components[component.type]).toBeDefined();
  });
});

test('hasComponentOfType', function () {
  var entity = new _index2.default();
  var component = new _Component2.default('testComponent', {});
  entity.addComponent(component);
  expect(entity.hasComponentOfType('testComponent')).toBe(true);
  expect(entity.hasComponentOfType('invalidType')).toBe(false);
});