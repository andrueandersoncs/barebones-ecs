import uuid from 'uuid';
import Component from 'Component';
import Observable from 'Observable';

/*
Emits:
- componentAdded
- componentRemoved

Handles: (None)
*/

class Entity extends Observable {
  constructor(id, components) {
    super();

    if (id && !Entity.isValidEntityId(id))
      throw 'Invalid entity id passed to entity constructor!';

    if (components && !Entity.isValidComponentsMap(components))
      throw 'Invalid components map passed to entity constructor!';

    this.id = id || uuid();
    this.components = components || {};
  }

  static isValidEntity(entity) {
    return Entity.isValidEntityId(entity.id);
  }

  static isValidEntityId(id) {
    return typeof id === 'string' && id.length > 0;
  }

  static isValidComponentsMap(components) {
    return Object.keys(components)
      .every(type => Component.isValidComponent(components[type]));
  }

  addComponent(component) {
    if (!Component.isValidComponent(component))
      throw 'Invalid component passed to addComponent!';

    if (this.hasComponent(component)) return;
    this.components[component.type] = component;
    this.emit('componentAdded', component);
  }

  addComponents(components) {
    if (!Array.isArray(components))
      throw 'addComponents must be passed an array!';

    components.forEach(component => this.addComponent(component));
  }

  hasComponent(component) {
    if (!Component.isValidComponent(component))
      throw 'Invalid component passed to hasComponent!';

    return this.hasComponentOfType(component.type);
  }

  hasComponents(components) {
    if (!Array.isArray(components))
      throw 'hasComponents must be passed an array!';

    return components.every(component => this.hasComponent(component));
  }

  hasComponentOfType(type) {
    if (!Component.isValidComponentType(type))
      throw 'Invalid component type was passed to hasComponentOfType!';
  
    return typeof this.components[type] !== 'undefined';
  }

  hasComponentsOfTypes(types) {
    if (!Array.isArray(types))
      throw 'hasComponentsOfTypes must be passed an array!';

    return types.every(type => this.hasComponentOfType(type));
  }

  getComponentOfType(type) {
    if (!Component.isValidComponentType(type))
      throw 'Invalid component type was passed to getComponentOfType!';

    if (!this.hasComponentOfType(type))
      throw 'getComponentOfType was attempted on a type that was not had!';

    return this.components[type];
  }

  getComponentsOfTypes(types) {
    if (!Array.isArray(types))
      throw 'getComponentsOfTypes must be passed an array!';

    return types.map(type => this.getComponentOfType(type));
  }

  removeComponent(component) {
    if (!Component.isValidComponent(component))
      throw 'removeComponent was passed an invalid component!';

    this.removeComponentOfType(component.type);
  }

  removeComponents(components) {
    if (!Array.isArray(components))
      throw 'removeComponents must be passed an array!';

    components.forEach(component => this.removeComponent(component));
  }

  removeComponentOfType(type) {
    if (!Component.isValidComponentType(type))
      throw 'removeComponentOfType was passed an invalid type!';

    if (!this.hasComponentOfType(type))
      throw 'Attempted to remove a component of type that was not had!';

    const component = this.getComponentOfType(type);
    this.components[type] = undefined;
    this.emit('componentRemoved', component);
  }

  removeComponentsOfTypes(types) {
    if (!Array.isArray(types))
      throw 'removeComponentsOfTypes must be passed an array!';

    types.forEach(type => this.removeComponentOfType(type));
  }
}

export default Entity;
