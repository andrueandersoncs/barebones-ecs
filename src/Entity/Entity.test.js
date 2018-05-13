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
});

describe('isValidEntity', () => {
  const validEntity = new Entity();
  const invalidEntity = {};

  test('valid entity is valid', () => {
    expect(Entity.isValidEntity(validEntity)).toBe(true);
  });

  test('invalid entity is invalid', () => {
    expect(Entity.isValidEntity(invalidEntity)).toBe(false);
  });
});


describe('addComponent', () => {
  const entity = new Entity();
  const component = new Component('testComponent', {});
  entity.addComponent(component);

  test('component is added', () => {
    expect(entity.components[component.type]).toBeDefined();
  });
});

test('hasComponentOfType', () => {
  const entity = new Entity();
  const component = new Component('testComponent', {});
  entity.addComponent(component);
  expect(entity.hasComponentOfType('testComponent')).toBe(true);
  expect(entity.hasComponentOfType('invalidType')).toBe(false);
});

