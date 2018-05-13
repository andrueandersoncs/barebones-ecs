'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _Engine = require('../Engine');

var _Engine2 = _interopRequireDefault(_Engine);

var _Entity = require('../Entity');

var _Entity2 = _interopRequireDefault(_Entity);

var _Component = require('../Component');

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('constructor', function () {
  test('throws when given a non-array as componentTypes', function () {
    expect(function () {
      var invalidSystem = new _index2.default({ a: 'a', b: 'b' });
    }).toThrow();
  });

  test('only accepts valid required component types', function () {
    var invalidComponentTypes = [1234, false, {}, 'validType'];
    var system = new _index2.default(invalidComponentTypes);
    expect(system.required).toEqual(['validType']);
  });

  test('throws when given non-function as onUpdate callback', function () {
    expect(function () {
      var invalidOnUpdate = {};
      var system = new _index2.default(false, invalidOnUpdate);
    }).toThrow();
  });
});

describe('onEntityCreated', function () {
  test('does not add invalid entities', function () {
    var system = new _index2.default();
    var invalidEntity = {};
    system.onEntityCreated(invalidEntity);
    expect(system.entities.size).toBe(0);
  });

  test('does not add entities missing required component types', function () {
    var system = new _index2.default(['testComponent']);
    var entityMissingComponent = new _Entity2.default();
    system.onEntityCreated(entityMissingComponent);
    expect(system.entities.size).toBe(0);
  });

  test('adds valid entities containing required components', function () {
    var system = new _index2.default(['testComponentA', 'testComponentB']);
    var testComponentA = new _Component2.default('testComponentA');
    var testComponentB = new _Component2.default('testComponentB');
    var entityA = new _Entity2.default(false, { testComponentA: testComponentA, testComponentB: testComponentB });
    var entityB = new _Entity2.default(false, { testComponentA: testComponentA });
    var entityC = new _Entity2.default(false, { testComponentB: testComponentB });
    system.onEntityCreated(entityA);
    system.onEntityCreated(entityB);
    system.onEntityCreated(entityC);
    expect(system.entities.size).toBe(1);
  });

  test('adds any valid entity if has no requirements', function () {
    var system = new _index2.default();
    var entity = new _Entity2.default();
    system.onEntityCreated(entity);
    expect(system.entities.size).toBe(1);
  });
});

describe('onEntityDestroyed', function () {
  test('does not attempt to remove anything if passed entity is invalid', function () {
    var system = new _index2.default();
    var entity = new _Entity2.default();
    var invalidEntity = {};
    system.onEntityCreated(entity);
    system.onEntityCreated(invalidEntity);
    system.onEntityDestroyed(invalidEntity);
    expect(system.entities.size).toBe(1);
  });

  test('does not remove entities other than the one passed', function () {
    var system = new _index2.default();
    var entityA = new _Entity2.default();
    var entityB = new _Entity2.default();
    system.onEntityCreated(entityA);
    system.onEntityCreated(entityB);
    system.onEntityDestroyed(entityA);
    expect(system.entities.size).toBe(1);
    expect(system.entities.get(entityB.id)).toBeDefined();
  });
});