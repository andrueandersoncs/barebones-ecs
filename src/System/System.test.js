import System from 'System';
import Engine from 'Engine';
import Entity from 'Entity';
import Component from 'Component';

describe('constructor', () => {
  test('throws when given a non-array as componentTypes', () => {
    expect(() => {
      const invalidSystem = new System({ a: 'a', b: 'b' });
    }).toThrow();
  });

  test('only accepts valid required component types', () => {
    const invalidComponentTypes = [1234, false, {}, 'validType'];
    const system = new System(invalidComponentTypes);
    expect(system.required).toEqual(['validType']);
  });

  test('throws when given non-function as onUpdate callback', () => {
    expect(() => {
      const invalidOnUpdate = {};
      const system = new System(false, invalidOnUpdate);
    }).toThrow();
  });

  test('registers all passed event handlers', () => {
    const eventHandlers = {
      engineConstructed: jest.fn(),
      testEvent: jest.fn()
    };
    const system = new System(undefined, eventHandlers);
    const engine = new Engine(undefined, [system]);
    expect(eventHandlers.engineConstructed).toHaveBeenCalled();
    system.emit('testEvent');
    expect(eventHandlers.testEvent).toHaveBeenCalled();
  });
});

describe('onEntityCreated', () => {
  test('does not add invalid entities', () => {
    const system = new System();
    const invalidEntity = {};
    system.onEntityCreated(invalidEntity);
    expect(system.entities.size).toBe(0);
  });

  test('does not add entities missing required component types', () => {
    const system = new System(['testComponent']);
    const entityMissingComponent = new Entity();
    system.onEntityCreated(entityMissingComponent);
    expect(system.entities.size).toBe(0);
  });

  test('adds valid entities containing required components', () => {
    const system = new System(['testComponentA', 'testComponentB']);
    const testComponentA = new Component('testComponentA');
    const testComponentB = new Component('testComponentB');
    const entityA = new Entity(false, { testComponentA, testComponentB });
    const entityB = new Entity(false, { testComponentA });
    const entityC = new Entity(false, { testComponentB });
    system.onEntityCreated(entityA);
    system.onEntityCreated(entityB);
    system.onEntityCreated(entityC);
    expect(system.entities.size).toBe(1);
  });

  test('adds any valid entity if has no requirements', () => {
    const system = new System();
    const entity = new Entity();
    system.onEntityCreated(entity);
    expect(system.entities.size).toBe(1);
  });
});

describe('onEntityDestroyed', () => {
  test('does not attempt to remove anything if passed entity is invalid', () => {
    const system = new System();
    const entity = new Entity();
    const invalidEntity = {};
    system.onEntityCreated(entity);
    system.onEntityCreated(invalidEntity);
    system.onEntityDestroyed(invalidEntity);
    expect(system.entities.size).toBe(1);
  });

  test('does not remove entities other than the one passed', () => {
    const system = new System();
    const entityA = new Entity();
    const entityB = new Entity();
    system.onEntityCreated(entityA);
    system.onEntityCreated(entityB);
    system.onEntityDestroyed(entityA);
    expect(system.entities.size).toBe(1);
    expect(system.entities.get(entityB.id)).toBeDefined();
  });
});

describe('onEngineConstructed', () => {
  test('engine is registered', () => {
    const system = new System();
    const engine = new Engine(undefined, [system]);
    expect(system.engine).toBeDefined();
  });

  test('cannot be registered to two engines simultaneously', () => {
    expect(() => {
      const system = new System();
      const engineA = new Engine(undefined, [system]);
      const engineB = new Engine(undefined, [system]);
    }).toThrow();
  });
});