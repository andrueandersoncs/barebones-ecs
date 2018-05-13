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

  test('generated ids are reasonably unique', function () {
    var entities = new Array(100);
    entities.fill(0);
    entities = entities.map(function () {
      return new _index2.default();
    });
    for (var i = 0; i < entities.length; i++) {
      for (var j = i + 1; j < entities.length; j++) {
        expect(entities[i].id).not.toEqual(entities[j].id);
      }
    }
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

describe('hasComponents', function () {
  test('returns false if passed anything other than array', function () {
    var entity = new _index2.default();
    var invalidComponentArrayA = {};
    var invalidComponentArrayB = false;
    entity.addComponents(invalidComponentArrayA);
    entity.addComponents(invalidComponentArrayB);
    expect(entity.hasComponents(invalidComponentArrayA)).toBe(false);
    expect(entity.hasComponents(invalidComponentArrayB)).toBe(false);
  });

  test('returns false if array contains anything other than valid components', function () {
    var entity = new _index2.default();
    var invalidComponent = {};
    expect(entity.hasComponents([invalidComponent])).toBe(false);
  });

  test('returns false if entity does not have every component', function () {
    var entity = new _index2.default();
    var componentA = new _Component2.default('testComponentA', {});
    var componentB = new _Component2.default('testComponentB', {});
    entity.addComponent(componentA);
    expect(entity.hasComponents([componentA, componentB])).toBe(false);
  });

  test('returns true if entity has every component', function () {
    var entity = new _index2.default();
    var componentA = new _Component2.default('testComponentA', {});
    var componentB = new _Component2.default('testComponentB', {});
    entity.addComponents([componentA, componentB]);
    expect(entity.hasComponents([componentA, componentB])).toBe(true);
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

  test('returns false if entity does not have component of type', function () {
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

describe('getComponentOfType', function () {
  test('returns null if invalid type', function () {
    var entity = new _index2.default();
    var invalidType = false;
    expect(entity.getComponentOfType(invalidType)).toBeNull();
  });

  test('returns null if does not have component of type', function () {
    var entity = new _index2.default();
    var validType = 'testComponent';
    expect(entity.getComponentOfType(validType)).toBeNull();
  });

  test('returns component of type if has component of type', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    entity.addComponent(component);
    expect(entity.getComponentOfType('testComponent')).toBe(component);
  });
});

describe('getComponentsOfTypes', function () {
  test('returns empty array if passed anything but an array', function () {
    var entity = new _index2.default();
    var invalidComponentTypeArray = { a: 'a', b: 'b' };
    expect(entity.getComponentsOfTypes(invalidComponentTypeArray)).toEqual([]);
  });

  test('returns null for each type it does not have', function () {
    var entity = new _index2.default();
    var componentTypeArray = ['validTypeA', 'validTypeB', 'validTypeC'];
    var expectedResult = [null, null, null];
    expect(entity.getComponentsOfTypes(componentTypeArray)).toEqual(expectedResult);
  });

  test('returns components with matching types for types it does have', function () {
    var entity = new _index2.default();
    var componentA = new _Component2.default('testComponentA', {});
    var componentB = new _Component2.default('testComponentB', {});
    var componentC = new _Component2.default('testComponentC', {});
    var validComponentsArray = [componentA, componentB, componentC];
    var componentTypesArray = ['testComponentA', 'testComponentB', 'testComponentC'];
    entity.addComponents(validComponentsArray);
    expect(entity.getComponentsOfTypes(componentTypesArray)).toEqual(validComponentsArray);
  });
});

describe('removeComponent', function () {
  test('removes component that it has', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    entity.addComponent(component);
    expect(entity.hasComponent(component)).toBe(true);
    entity.removeComponent(component);
    expect(entity.hasComponent(component)).toBe(false);
  });

  test('does not remove components that are not passed', function () {
    var entity = new _index2.default();
    var componentA = new _Component2.default('testComponentA', {});
    var componentB = new _Component2.default('testComponentB', {});
    entity.addComponents([componentA, componentB]);
    expect(entity.hasComponents([componentA, componentB])).toBe(true);
    entity.removeComponent(componentA);
    expect(entity.hasComponent(componentA)).toBe(false);
    expect(entity.hasComponent(componentB)).toBe(true);
  });

  test('does nothing when passed invalid component', function () {
    var entity = new _index2.default();
    var invalidComponent = {};
    entity.addComponent(invalidComponent);
    expect(entity.hasComponent(invalidComponent)).toBe(false);
    entity.removeComponent(invalidComponent);
    expect(entity.hasComponent(invalidComponent)).toBe(false);
  });

  test('does nothing for component it does not have', function () {
    var entity = new _index2.default();
    var componentA = new _Component2.default('testComponentA', {});
    var componentB = new _Component2.default('testComponentB', {});
    entity.addComponent(componentA);
    expect(entity.hasComponent(componentA)).toBe(true);
    entity.removeComponent(componentB);
    expect(entity.hasComponent(componentA)).toBe(true);
    expect(entity.hasComponent(componentB)).toBe(false);
  });
});

describe('removeComponents', function () {
  test('does nothing for non-arrays', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    var invalidComponentArray = { a: 'a', b: 'b' };
    entity.addComponent(component);
    entity.removeComponents(invalidComponentArray);
    expect(entity.hasComponent(component)).toBe(true);
  });

  test('does nothing for invalid components', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    var invalidComponent = {};
    entity.addComponent(component);
    entity.removeComponents([invalidComponent]);
    expect(entity.hasComponent(component)).toBe(true);
    expect(entity.hasComponent(invalidComponent)).toBe(false);
  });

  test('removes valid components it contains', function () {
    var entity = new _index2.default();
    var componentA = new _Component2.default('testComponentA', {});
    var componentB = new _Component2.default('testComponentB', {});
    var invalidComponent = {};
    entity.addComponents([componentA, componentB, invalidComponent]);
    expect(entity.hasComponents([componentA, componentB])).toBe(true);
    expect(entity.hasComponent(invalidComponent)).toBe(false);
    entity.removeComponents([componentA, componentB, invalidComponent]);
    expect(entity.hasComponents([componentA, componentB])).toBe(false);
    expect(entity.hasComponent(invalidComponent)).toBe(false);
  });
});

describe('removeComponentOfType', function () {
  test('does nothing for invalid component type', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    var invalidComponentType = 1234;
    entity.addComponent(component);
    expect(entity.hasComponent(component)).toBe(true);
    entity.removeComponentOfType(invalidComponentType);
    expect(entity.hasComponent(component)).toBe(true);
  });

  test('removes component of type if it has component of type', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    entity.addComponent(component);
    expect(entity.hasComponent(component)).toBe(true);
    entity.removeComponentOfType('testComponent');
    expect(entity.hasComponent(component)).toBe(false);
  });

  test('does not remove components of type other than passed type', function () {
    var entity = new _index2.default();
    var componentA = new _Component2.default('testComponentA', {});
    var componentB = new _Component2.default('testComponentB', {});
    entity.addComponents([componentA, componentB]);
    expect(entity.hasComponents([componentA, componentB])).toBe(true);
    entity.removeComponentOfType('testComponentB');
    expect(entity.hasComponentOfType('testComponentB')).toBe(false);
    expect(entity.hasComponent(componentA)).toBe(true);
  });
});

describe('removeComponentsOfTypes', function () {
  test('does nothing for non-arrays', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    var nonArray = { a: 'a', b: 'b' };
    entity.addComponent(component);
    expect(entity.hasComponent(component)).toBe(true);
    entity.removeComponentsOfTypes(nonArray);
    expect(entity.hasComponent(component)).toBe(true);
  });

  test('does nothing for invalid component types in array', function () {
    var entity = new _index2.default();
    var component = new _Component2.default('testComponent', {});
    var invalidTypesArray = [1234, false, {}];
    entity.addComponent(component);
    expect(entity.hasComponent(component)).toBe(true);
    entity.removeComponentsOfTypes(invalidTypesArray);
    expect(entity.hasComponent(component)).toBe(true);
  });

  test('removes all components for valid component types in array', function () {
    var entity = new _index2.default();
    var componentA = new _Component2.default('testComponentA', {});
    var componentB = new _Component2.default('testComponentB', {});
    var componentC = new _Component2.default('testComponentC', {});
    var typesArray = ['testComponentA', 'testComponentB', 'testComponentC'];
    entity.addComponents([componentA, componentB, componentC]);
    expect(entity.hasComponents([componentA, componentB, componentC])).toBe(true);
    entity.removeComponentsOfTypes(typesArray);
    expect(entity.hasComponents([componentA, componentB, componentC])).toBe(false);
  });

  test('does not remove components of types not passed in array', function () {
    var entity = new _index2.default();
    var componentA = new _Component2.default('testComponentA', {});
    var componentB = new _Component2.default('testComponentB', {});
    var componentC = new _Component2.default('testComponentC', {});
    var typesArray = ['testComponentA', 'testComponentB'];
    entity.addComponents([componentA, componentB, componentC]);
    expect(entity.hasComponents([componentA, componentB, componentC])).toBe(true);
    entity.removeComponentsOfTypes(typesArray);
    expect(entity.hasComponents([componentA, componentB])).toBe(false);
    expect(entity.hasComponent(componentC)).toBe(true);
  });
});