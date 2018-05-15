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
      var e = new _index2.default();
    }).not.toThrow();

    expect(function () {
      var e = new _index2.default({});
    }).not.toThrow();

    expect(function () {
      var e = new _index2.default([]);
    }).toThrow();

    expect(function () {
      var e = new _index2.default(false);
    }).toThrow();

    expect(function () {
      var e = new _index2.default(1234);
    }).toThrow();

    expect(function () {
      var e = new _index2.default('1234');
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
    var e = new _index2.default(entityContainer);
    expect(Object.keys(e.entities).length).toBe(2);
  });

  test('throws if systems is anything but an array', function () {
    expect(function () {
      var e = new _index2.default(undefined, 'hello');
    }).toThrow();

    expect(function () {
      var e = new _index2.default(undefined, 1234);
    }).toThrow();

    expect(function () {
      var e = new _index2.default(undefined, {});
    }).toThrow();

    expect(function () {
      var e = new _index2.default(undefined, []);
    }).not.toThrow();
  });

  test('only retains instances of System class in systems array', function () {
    var systemsArray = [new _System2.default(), {}, 1234, '1234', false, function () {}];
    var e = new _index2.default(undefined, systemsArray);
    expect(e.systems.length).toBe(1);
  });
});