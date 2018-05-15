import Engine from 'Engine';
import Entity from 'Entity';
import System from 'System';

describe('constructor', () => {
  test('throws if entity object anything but an object', () => {
    expect(() => {
      const e = new Engine();
    }).not.toThrow();

    expect(() => {
      const e = new Engine({});
    }).not.toThrow();

    expect(() => {
      const e = new Engine([]);
    }).toThrow();

    expect(() => {
      const e = new Engine(false);
    }).toThrow();

    expect(() => {
      const e = new Engine(1234);
    }).toThrow();

    expect(() => {
      const e = new Engine('1234');
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
    const e = new Engine(entityContainer);
    expect(Object.keys(e.entities).length).toBe(2);
  });

  test('throws if systems is anything but an array', () => {
    expect(() => {
      const e = new Engine(undefined, 'hello');
    }).toThrow();

    expect(() => {
      const e = new Engine(undefined, 1234);
    }).toThrow();

    expect(() => {
      const e = new Engine(undefined, {});
    }).toThrow();

    expect(() => {
      const e = new Engine(undefined, []);
    }).not.toThrow();
  });

  test('only retains instances of System class in systems array', () => {
    const systemsArray = [new System(), {}, 1234, '1234', false, () => {}];
    const e = new Engine(undefined, systemsArray);
    expect(e.systems.length).toBe(1);
  });
});
