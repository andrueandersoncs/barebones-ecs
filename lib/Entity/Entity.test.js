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

  test('throws if invalid id of non-string type is given', function () {
    var invalidId = 1234;
    expect(function () {
      return new _index2.default(invalidId);
    }).toThrow();

    var anotherInvalidId = {};
    expect(function () {
      return new _index2.default(anotherInvalidId);
    }).toThrow();
  });
});

describe('isValidEntity', function () {
  var validEntity = new _index2.default();
  var invalidEntity = {};
  var anotherInvalidEntity = { id: '' };

  test('valid entity is valid', function () {
    expect(_index2.default.isValidEntity(validEntity)).toBe(true);
  });

  test('invalid entity is invalid', function () {
    expect(_index2.default.isValidEntity(invalidEntity)).toBe(false);
    expect(_index2.default.isValidEntity(anotherInvalidEntity)).toBe(false);
  });
});

describe('addComponent', function () {
  test('valid component is added', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    entity.addComponent(component);
    expect(entity.components[component.type]).toBeDefined();
  });

  test('invalid component is not added', function () {
    var entity = new _index2.default();
    var component = false;
    var lengthBefore = Object.keys(entity.components).length;
    entity.addComponent(component);
    var lengthAfter = Object.keys(entity.components).length;
    expect(lengthAfter).toEqual(lengthBefore);
  });

  test('only one component of a type can be added', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', { real: true });
    var otherComponent = new _Component2.default('testComponent', { real: false });
    entity.addComponent(component);
    entity.addComponent(otherComponent);
    expect(entity.components['testComponent']).toEqual(component);
    expect(entity.components['testComponent']).not.toEqual(otherComponent);
  });
});

describe('addComponents', function () {
  test('only accepts an array of components', function () {
    var entity = new _index2.default();
    var invalidComponentsArray = { a: 'a', b: 'b' };
    var numComponentsBefore = Object.keys(entity.components).length;
    entity.addComponents(invalidComponentsArray);
    var numComponentsAfter = Object.keys(entity.components).length;
    expect(numComponentsBefore).toEqual(numComponentsAfter);
  });

  test('does not add invalid components', function () {
    var entity = new _index2.default();
    var invalidComponents = [{}, {}, {}];
    var numComponentsBefore = Object.keys(entity.components).length;
    entity.addComponents(invalidComponents);
    var numComponentsAfter = Object.keys(entity.components).length;
    expect(numComponentsBefore).toEqual(numComponentsAfter);
  });

  test('adds all valid components', function () {
    var entity = new _index2.default();
    var validComponentA = new _Component2.default('testComponentA', {});
    var validComponentB = new _Component2.default('testComponentB', {});
    entity.addComponents([validComponentA, validComponentB]);
    expect(entity.hasComponents([validComponentA, validComponentB])).toBe(true);
  });
});

describe('hasComponent', function () {
  test('returns true if entity has component', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    entity.addComponent(component);
    expect(entity.hasComponent(component)).toBe(true);
  });

  test('returns false if entity does not have component', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    expect(entity.hasComponent(component)).toBe(false);
  });

  test('returns false if component is invalid', function () {
    var entity = new _index2.default();
    var component = {};
    expect(entity.hasComponent(component)).toBe(false);
  });
});

describe('hasComponentOfType', function () {
  test('returns true if entity has component of that type', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    entity.addComponent(component);
    expect(entity.hasComponentOfType('testComponent')).toBe(true);
  });

  test('returns false if type is not a valid type', function () {
    var entity = new _index2.default();
    var invalidType = false;
    expect(entity.hasComponentOfType(invalidType)).toBe(false);
  });

  test('returns false if component does not have entity of type', function () {
    var entity = new _index2.default();
    expect(entity.hasComponentOfType('testComponent')).toBe(false);
  });
});

describe('hasComponentsOfTypes', function () {
  test('only accepts array of types', function () {
    var entity = new _index2.default();
    var invalidTypesNonArray = { a: 'a', b: 'b' };
    expect(entity.hasComponentsOfTypes(invalidTypesNonArray)).toBe(false);
  });

  test('returns true if entity has all types', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    var otherComponent = new _Component2.default('otherTestComponent', {});
    var validTypes = ['testComponent', 'otherTestComponent'];
    entity.addComponents([component, otherComponent]);
    expect(entity.hasComponentsOfTypes(validTypes)).toBe(true);
  });

  test('returns false if entity does not have every type', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    var validTypes = ['testComponent', 'otherTestComponent'];
    entity.addComponent(component);
    expect(entity.hasComponentsOfTypes(validTypes)).toBe(false);
  });

  test('returns false if any types are invalid', function () {
    var entity = new _index2.default();
    var invalidTypes = [false, true, {}, 1234];
    expect(entity.hasComponentsOfTypes(invalidTypes)).toBe(false);
  });
});