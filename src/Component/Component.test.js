import Component from './Component';

describe('constructor', () => {
  const properties = { a: 'a', b: 'b', c: 'c' };
  const component = new Component('testComponent', properties);

  test('copies properties', () => {
    for (let key in properties) {
      expect(component[key] === properties[key]).toBe(true);
    }
  });

  /* Maybe only allow primitives as properties to a component?
  // Pro: no memory leaks
  // Pro: no dangling references
  // Con: components could not hold references to other components
  // Con: components could not hold references to objects / complex types
  test('allows only primitives as properties', () => {
    for (let key in properties) {
      expect(typeof component[key] !== 'object').toBe(true);
    }
  }); */
});

describe('isValidComponent', () => {
  const validComponent = new Component('testComponent', {});
  const invalidComponent = {};

  test('identifies valid components', () => {
    expect(Component.isValidComponent(validComponent)).toBe(true);
  });
  
  test('identifies invalid components', () => {
    expect(Component.isValidComponent(invalidComponent)).toBe(false);
  });
});

