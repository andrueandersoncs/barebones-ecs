import Observable from 'Observable';

/*
Emits: (None)

Handles: (None)
*/

class Component extends Observable {
  constructor(type, properties) {
    super();

    if (!Component.isValidComponentType(type))
      throw 'Invalid component type passed to Component constructor!';

    if (!Component.isValidPropertiesArray(properties))
      throw 'Invalid properties array passed to Component constructor!';

    this.type = type;

    properties.forEach(property => this[property.name] = property.value);
  }

  static fromObject(obj) {
    if (!Component.isValidComponent(obj))
      throw 'Invalid object passed to Component.fromObject!';

    const properties = Object.keys(obj)
      .filter(name => name !== 'type')
      .map(name => ({ name, value: obj[name] }));

    return new Component(obj.type, properties);
  }
  
  static isValidPropertiesArray(properties) {
    return Array.isArray(properties);
  }

  static isValidComponent(component) {
    return Component.isValidComponentType(component.type);
  }

  static isValidComponentType(type) {
    return typeof type === 'string' && type.length > 0;
  }
}

export default Component;
