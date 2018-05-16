'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _Entity = require('../Entity');

var _Entity2 = _interopRequireDefault(_Entity);

var _System = require('../System');

var _System2 = _interopRequireDefault(_System);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('constructor', function () {
  test('throws if entity object anything but an object', function () {
    expect(function () {
      var engine = new _index2.default();
    }).not.toThrow();

    expect(function () {
      var engine = new _index2.default({});
    }).not.toThrow();

    expect(function () {
      var engine = new _index2.default([]);
    }).toThrow();

    expect(function () {
      var engine = new _index2.default(false);
    }).toThrow();

    expect(function () {
      var engine = new _index2.default(1234);
    }).toThrow();

    expect(function () {
      var engine = new _index2.default('1234');
    }).toThrow();
  });

  test('only retains valid entities', function () {
    var entityA = new _Entity2.default();
    var entityB = new _Entity2.default();
    var entityC = {};
    var entityContainer = {};
    entityContainer[entityA.id] = entityA;
    entityContainer[entityB.id] = entityB;
    entityContainer['1234-1234-1234-1234'] = entityC;
    var engine = new _index2.default(entityContainer);
    expect(Object.keys(engine.entities).length).toBe(2);
  });

  test('throws if systems is anything but an array', function () {
    expect(function () {
      var engine = new _index2.default(undefined, 'hello');
    }).toThrow();

    expect(function () {
      var engine = new _index2.default(undefined, 1234);
    }).toThrow();

    expect(function () {
      var engine = new _index2.default(undefined, {});
    }).toThrow();

    expect(function () {
      var engine = new _index2.default(undefined, []);
    }).not.toThrow();
  });

  test('only retains instances of System class in systems array', function () {
    var systemsArray = [new _System2.default(), {}, 1234, '1234', false, function () {}];
    var engine = new _index2.default(undefined, systemsArray);
    expect(engine.systems.length).toBe(1);
  });
});

describe('createEntity', function () {
  test('creates a new entity', function () {
    var engine = new _index2.default();
    var entity = engine.createEntity();
    expect(entity).toBeDefined();
    expect(_Entity2.default.isValidEntity(entity)).toBe(true);
    expect(entity instanceof _Entity2.default).toBe(true);
  });

  test('created entity is added to entity map', function () {
    var engine = new _index2.default();
    expect(Object.keys(engine.entities).length).toBe(0);
    var entity = engine.createEntity();
    expect(Object.keys(engine.entities).length).toBe(1);
    expect(engine.entities[entity.id]).toBe(entity);
  });

  test('systems are alerted of the created entity', function () {
    var system = new _System2.default();
    var engine = new _index2.default(undefined, [system]);
    var entity = engine.createEntity();
    expect(system.entities.size).toBe(1);
  });

  test('only alerts systems which entity has components required for', function () {});
});