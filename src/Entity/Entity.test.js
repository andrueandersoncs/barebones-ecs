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
  
  test('returns false if component does not have entity of type', () => {
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
