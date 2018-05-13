import Entity from 'Entity';
import Component from 'Component';

describe('constructor', () => {
  test('accepts preexisting id', () => {
    const testId = 'aaaa-dddd-bbbb-cccc';
    const entity = new Entity(testId);
    expect(entity.id).toEqual(testId);
  });

  test('generates id if none specified', () => {
    const entity = new Entity();
    expect(entity.id).toBeDefined();
    expect(typeof entity.id).toBe('string');
    expect(entity.id.length).toBeGreaterThan(0);
  });

  test('generated ids are reasonably unique', () => {
    let entities = new Array(100);
    entities.fill(0);
    entities = entities.map(() => new Entity());
    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        expect(entities[i].id).not.toEqual(entities[j].id);
      }
    }
  });

  test('accepts preexisting components', () => {
    const testComponent = new Component('testComponent');
    const testComponents = { testComponent };
    const entity = new Entity(false, testComponents);
    expect(entity.components).toBe(testComponents);
  });

  test('throws if invalid id of non-string type is given', () => {
    const invalidId = 1234;
    expect(() => new Entity(invalidId)).toThrow();

    const anotherInvalidId = {};
    expect(() => new Entity(anotherInvalidId)).toThrow();
  })
});

describe('isValidEntity', () => {
  const validEntity = new Entity();
  const invalidEntity = {};
  const anotherInvalidEntity = { id: '' };

  test('valid entity is valid', () => {
    expect(Entity.isValidEntity(validEntity)).toBe(true);
  });

  test('invalid entity is invalid', () => {
    expect(Entity.isValidEntity(invalidEntity)).toBe(false);
    expect(Entity.isValidEntity(anotherInvalidEntity)).toBe(false);
  });
});


describe('addComponent', () => {
  test('valid component is added', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    entity.addComponent(component);
    expect(entity.components[component.type]).toBeDefined();
  });

  test('invalid component is not added', () => {
    const entity = new Entity();
    const component = false;
    const lengthBefore = Object.keys(entity.components).length;
    entity.addComponent(component);
    const lengthAfter = Object.keys(entity.components).length;
    expect(lengthAfter).toEqual(lengthBefore);
  });

  test('only one component of a type can be added', () => {
    const entity = new Entity();
    const component = new Component('testComponent', { real: true });
    const otherComponent = new Component('testComponent', { real: false });
    entity.addComponent(component);
    entity.addComponent(otherComponent);
    expect(entity.components['testComponent']).toEqual(component);
    expect(entity.components['testComponent']).not.toEqual(otherComponent);
  });
});

describe('addComponents', () => {
  test('only accepts an array of components', () => {
    const entity = new Entity();
    const invalidComponentsArray = { a: 'a', b: 'b' };
    const numComponentsBefore = Object.keys(entity.components).length;
    entity.addComponents(invalidComponentsArray);
    const numComponentsAfter = Object.keys(entity.components).length;
    expect(numComponentsBefore).toEqual(numComponentsAfter);
  });

  test('does not add invalid components', () => {
    const entity = new Entity();
    const invalidComponents = [{}, {}, {}];
    const numComponentsBefore = Object.keys(entity.components).length;
    entity.addComponents(invalidComponents);
    const numComponentsAfter = Object.keys(entity.components).length;
    expect(numComponentsBefore).toEqual(numComponentsAfter);
  });

  test('adds all valid components', () => {
    const entity = new Entity();
    const validComponentA = new Component('testComponentA', {});
    const validComponentB = new Component('testComponentB', {});
    entity.addComponents([validComponentA, validComponentB]);
    expect(entity.hasComponents([validComponentA, validComponentB])).toBe(true);
  });
});

describe('hasComponent', () => {
  test('returns true if entity has component', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    entity.addComponent(component);
    expect(entity.hasComponent(component)).toBe(true);
  });

  test('returns false if entity does not have component', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    expect(entity.hasComponent(component)).toBe(false);
  });

  test('returns false if component is invalid', () => {
    const entity = new Entity();
    const component = {};
    expect(entity.hasComponent(component)).toBe(false);
  });
});

describe('hasComponents', () => {
  test('returns false if passed anything other than array', () => {
    const entity = new Entity();
    const invalidComponentArrayA = {};
    const invalidComponentArrayB = false;
    entity.addComponents(invalidComponentArrayA);
    entity.addComponents(invalidComponentArrayB);
    expect(entity.hasComponents(invalidComponentArrayA)).toBe(false);
    expect(entity.hasComponents(invalidComponentArrayB)).toBe(false);
  });

  test('returns false if array contains anything other than valid components', () => {
    const entity = new Entity();
    const invalidComponent = {};
    expect(entity.hasComponents([invalidComponent])).toBe(false);
  });

  test('returns false if entity does not have every component', () => {
    const entity = new Entity();
    const componentA = new Component('testComponentA', {});
    const componentB = new Component('testComponentB', {});
    entity.addComponent(componentA);
    expect(entity.hasComponents([componentA, componentB])).toBe(false);
  });

  test('returns true if entity has every component', () => {
    const entity = new Entity();
    const componentA = new Component('testComponentA', {});
    const componentB = new Component('testComponentB', {});
    entity.addComponents([componentA, componentB]);
    expect(entity.hasComponents([componentA, componentB])).toBe(true);
  });
});

describe('hasComponentOfType', () => {
  test('returns true if entity has component of that type', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    entity.addComponent(component);
    expect(entity.hasComponentOfType('testComponent')).toBe(true);
  });

  test('returns false if type is not a valid type', () => {
    const entity = new Entity();
    const invalidType = false;
    expect(entity.hasComponentOfType(invalidType)).toBe(false);
  })
  
  test('returns false if entity does not have component of type', () => {
    const entity = new Entity();
    expect(entity.hasComponentOfType('testComponent')).toBe(false);
  });
});

describe('hasComponentsOfTypes', () => {
  test('only accepts array of types', () => {
    const entity = new Entity();
    const invalidTypesNonArray = { a: 'a', b: 'b' };
    expect(entity.hasComponentsOfTypes(invalidTypesNonArray)).toBe(false);
  });

  test('returns true if entity has all types', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    const otherComponent = new Component('otherTestComponent', {});
    const validTypes = ['testComponent', 'otherTestComponent'];
    entity.addComponents([component, otherComponent]);
    expect(entity.hasComponentsOfTypes(validTypes)).toBe(true);
  });

  test('returns false if entity does not have every type', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    const validTypes = ['testComponent', 'otherTestComponent'];
    entity.addComponent(component);
    expect(entity.hasComponentsOfTypes(validTypes)).toBe(false);
  });

  test('returns false if any types are invalid', () => {
    const entity = new Entity();
    const invalidTypes = [false, true, {}, 1234];
    expect(entity.hasComponentsOfTypes(invalidTypes)).toBe(false);
  });
});

describe('getComponentOfType', () => {
  test('returns null if invalid type', () => {
    const entity = new Entity();
    const invalidType = false;
    expect(entity.getComponentOfType(invalidType)).toBeNull();
  });

  test('returns null if does not have component of type', () => {
    const entity = new Entity();
    const validType = 'testComponent';
    expect(entity.getComponentOfType(validType)).toBeNull();
  });
  
  test('returns component of type if has component of type', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    entity.addComponent(component);
    expect(entity.getComponentOfType('testComponent')).toBe(component);
  });
});

describe('getComponentsOfTypes', () => {
  test('returns empty array if passed anything but an array', () => {
    const entity = new Entity();
    const invalidComponentTypeArray = { a: 'a', b: 'b' };
    expect(entity.getComponentsOfTypes(invalidComponentTypeArray)).toEqual([]);
  });

  test('returns null for each type it does not have', () => {
    const entity = new Entity();
    const componentTypeArray = ['validTypeA', 'validTypeB', 'validTypeC'];
    const expectedResult = [null, null, null];
    expect(entity.getComponentsOfTypes(componentTypeArray)).toEqual(expectedResult);
  });

  test('returns components with matching types for types it does have', () => {
    const entity = new Entity();
    const componentA = new Component('testComponentA', {});
    const componentB = new Component('testComponentB', {});
    const componentC = new Component('testComponentC', {});
    const validComponentsArray = [componentA, componentB, componentC];
    const componentTypesArray = ['testComponentA', 'testComponentB', 'testComponentC'];
    entity.addComponents(validComponentsArray);
    expect(entity.getComponentsOfTypes(componentTypesArray)).toEqual(validComponentsArray);
  })
});

describe('removeComponent', () => {
  test('removes component that it has', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    entity.addComponent(component);
    expect(entity.hasComponent(component)).toBe(true);
    entity.removeComponent(component);
    expect(entity.hasComponent(component)).toBe(false);
  });

  test('does not remove components that are not passed', () => {
    const entity = new Entity();
    const componentA = new Component('testComponentA', {});
    const componentB = new Component('testComponentB', {});
    entity.addComponents([componentA, componentB]);
    expect(entity.hasComponents([componentA, componentB])).toBe(true);
    entity.removeComponent(componentA);
    expect(entity.hasComponent(componentA)).toBe(false);
    expect(entity.hasComponent(componentB)).toBe(true);
  });
  
  test('does nothing when passed invalid component', () => {
    const entity = new Entity();
    const invalidComponent = {};
    entity.addComponent(invalidComponent);
    expect(entity.hasComponent(invalidComponent)).toBe(false);
    entity.removeComponent(invalidComponent);
    expect(entity.hasComponent(invalidComponent)).toBe(false);
  });

  test('does nothing for component it does not have', () => {
    const entity = new Entity();
    const componentA = new Component('testComponentA', {});
    const componentB = new Component('testComponentB', {});
    entity.addComponent(componentA);
    expect(entity.hasComponent(componentA)).toBe(true);
    entity.removeComponent(componentB);
    expect(entity.hasComponent(componentA)).toBe(true);
    expect(entity.hasComponent(componentB)).toBe(false);
  });
});

describe('removeComponents', () => {
  test('does nothing for non-arrays', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    const invalidComponentArray = { a: 'a', b: 'b' };
    entity.addComponent(component);
    entity.removeComponents(invalidComponentArray);
    expect(entity.hasComponent(component)).toBe(true);
  });

  test('does nothing for invalid components', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    const invalidComponent = {};
    entity.addComponent(component);
    entity.removeComponents([invalidComponent]);
    expect(entity.hasComponent(component)).toBe(true);
    expect(entity.hasComponent(invalidComponent)).toBe(false);
  });

  test('removes valid components it contains', () => {
    const entity = new Entity();
    const componentA = new Component('testComponentA', {});
    const componentB = new Component('testComponentB', {});
    const invalidComponent = {};
    entity.addComponents([componentA, componentB, invalidComponent]);
    expect(entity.hasComponents([componentA, componentB])).toBe(true);
    expect(entity.hasComponent(invalidComponent)).toBe(false);
    entity.removeComponents([componentA, componentB, invalidComponent]);
    expect(entity.hasComponents([componentA, componentB])).toBe(false);
    expect(entity.hasComponent(invalidComponent)).toBe(false);
  });
});

describe('removeComponentOfType', () => {
  test('does nothing for invalid component type', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    const invalidComponentType = 1234;
    entity.addComponent(component);
    expect(entity.hasComponent(component)).toBe(true);
    entity.removeComponentOfType(invalidComponentType);
    expect(entity.hasComponent(component)).toBe(true);
  });

  test('removes component of type if it has component of type', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    entity.addComponent(component);
    expect(entity.hasComponent(component)).toBe(true);
    entity.removeComponentOfType('testComponent');
    expect(entity.hasComponent(component)).toBe(false);
  });

  test('does not remove components of type other than passed type', () => {
    const entity = new Entity();
    const componentA = new Component('testComponentA', {});
    const componentB = new Component('testComponentB', {});
    entity.addComponents([componentA, componentB]);
    expect(entity.hasComponents([componentA, componentB])).toBe(true);
    entity.removeComponentOfType('testComponentB');
    expect(entity.hasComponentOfType('testComponentB')).toBe(false);
    expect(entity.hasComponent(componentA)).toBe(true);
  });
});

describe('removeComponentsOfTypes', () => {
  test('does nothing for non-arrays', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    const nonArray = { a: 'a', b: 'b' };
    entity.addComponent(component);
    expect(entity.hasComponent(component)).toBe(true);
    entity.removeComponentsOfTypes(nonArray);
    expect(entity.hasComponent(component)).toBe(true);
  });

  test('does nothing for invalid component types in array', () => {
    const entity = new Entity();
    const component = new Component('testComponent', {});
    const invalidTypesArray = [1234, false, {}];
    entity.addComponent(component);
    expect(entity.hasComponent(component)).toBe(true);
    entity.removeComponentsOfTypes(invalidTypesArray);
    expect(entity.hasComponent(component)).toBe(true);
  });

  test('removes all components for valid component types in array', () => {
    const entity = new Entity();
    const componentA = new Component('testComponentA', {});
    const componentB = new Component('testComponentB', {});
    const componentC = new Component('testComponentC', {});
    const typesArray = ['testComponentA', 'testComponentB', 'testComponentC'];
    entity.addComponents([componentA, componentB, componentC]);
    expect(entity.hasComponents([componentA, componentB, componentC])).toBe(true);
    entity.removeComponentsOfTypes(typesArray);
    expect(entity.hasComponents([componentA, componentB, componentC])).toBe(false);
  });

  test('does not remove components of types not passed in array', () => {
    const entity = new Entity();
    const componentA = new Component('testComponentA', {});
    const componentB = new Component('testComponentB', {});
    const componentC = new Component('testComponentC', {});
    const typesArray = ['testComponentA', 'testComponentB'];
    entity.addComponents([componentA, componentB, componentC]);
    expect(entity.hasComponents([componentA, componentB, componentC])).toBe(true);
    entity.removeComponentsOfTypes(typesArray);
    expect(entity.hasComponents([componentA, componentB])).toBe(false);
    expect(entity.hasComponent(componentC)).toBe(true);
  });
});
