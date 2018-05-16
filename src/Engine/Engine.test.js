import Engine from 'Engine';
import Entity from 'Entity';
import System from 'System';

describe('constructor', () => {
  test('throws if entity object anything but an object', () => {
    expect(() => {
      const engine = new Engine();
    }).not.toThrow();

    expect(() => {
      const engine = new Engine({});
    }).not.toThrow();

    expect(() => {
      const engine = new Engine([]);
    }).toThrow();

    expect(() => {
      const engine = new Engine(false);
    }).toThrow();

    expect(() => {
      const engine = new Engine(1234);
    }).toThrow();

    expect(() => {
      const engine = new Engine('1234');
    }).toThrow();
  });

  test('only retains valid entities', () => {
    const entityA = new Entity();
    const entityB = new Entity();
    const entityC = {};
    const entityContainer = {};
    entityContainer[entityA.id] = entityA;
    entityContainer[entityB.id] = entityB;
    entityContainer['1234-1234-1234-1234'] = entityC;
    const engine = new Engine(entityContainer);
    expect(Object.keys(engine.entities).length).toBe(2);
  });

  test('throws if systems is anything but an array', () => {
    expect(() => {
      const engine = new Engine(undefined, 'hello');
    }).toThrow();

    expect(() => {
      const engine = new Engine(undefined, 1234);
    }).toThrow();

    expect(() => {
      const engine = new Engine(undefined, {});
    }).toThrow();

    expect(() => {
      const engine = new Engine(undefined, []);
    }).not.toThrow();
  });

  test('only retains instances of System class in systems array', () => {
    const systemsArray = [new System(), {}, 1234, '1234', false, () => {}];
    const engine = new Engine(undefined, systemsArray);
    expect(engine.systems.length).toBe(1);
  });
});

describe('createEntity', () => {
  test('creates a new entity', () => {
    const engine = new Engine();
    const entity = engine.createEntity();
    expect(entity).toBeDefined();
    expect(Entity.isValidEntity(entity)).toBe(true);
    expect(entity instanceof Entity).toBe(true);
  });

  test('created entity is added to entity map', () => {
    const engine = new Engine();
    expect(Object.keys(engine.entities).length).toBe(0);
    const entity = engine.createEntity();
    expect(Object.keys(engine.entities).length).toBe(1);
    expect(engine.entities[entity.id]).toBe(entity);
  });

  test('systems are alerted of the created entity', () => {
    const system = new System();
    const engine = new Engine(undefined, [system]);
    const entity = engine.createEntity();
    expect(system.entities.size).toBe(1);
  });

  test('only alerts systems which entity has components required for', () => {

  })
});