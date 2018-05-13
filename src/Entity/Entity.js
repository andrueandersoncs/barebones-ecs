import uuid from 'uuid';
import Component from 'Component';

class Entity {
  constructor(id, components) {
    this.id = id || uuid();

    if (!Entity.isValidEntity(this))
      throw 'Invalid entity constructed!';

    this.components = components || {};

    for (let key in this.components) {
      if (!Component.isValidComponent(this.components[key]))
        throw 'Invalid component in entity constructor!';
    }
  }

  static isValidEntity(entity) {
    return typeof entity.id === 'string' && entity.id.length > 0;
  }

  addComponent(component) {
    if (!Component.isValidComponent(component)) return;
    if (this.hasComponent(component)) return;
    this.components[component.type] = component;
  }

  addComponents(components) {
    if (!Array.isArray(components)) return;
    components.forEach(component => this.addComponent(component));
  }

  hasComponent(component) {
    if (!Component.isValidComponent(component)) return false;
    return this.hasComponentOfType(component.type);
  }

  hasComponents(components) {
    if (!Array.isArray(components)) return false;
    return components.every(component => this.hasComponent(component));
  }

  hasComponentOfType(type) {
    return typeof type === 'string' && typeof this.components[type] !== 'undefined';
  }

  hasComponentsOfTypes(types) {
    if (!Array.isArray(types)) return false;
    return types.every(type => this.hasComponentOfType(type));
  }

  getComponentOfType(type) {
    if (!this.hasComponentOfType(type)) return null;
    return this.components[type];
  }

  getComponentsOfTypes(types) {
    if (!Array.isArray(types)) return [];
    return types.map(type => this.getComponentOfType(type));
  }

  removeComponent(component) {
    if (!this.hasComponent(component)) return;
    this.components[component.type] = undefined;
  }

  removeComponents(components) {
    if (!Array.isArray(components)) return;
    components.forEach(component => this.removeComponent(component));
  }

  removeComponentOfType(type) {
    if (!this.hasComponentOfType(type)) return;
    this.components[type] = undefined;
  }

  removeComponentsOfTypes(types) {
    if (!Array.isArray(types)) return;
    types.forEach(type => this.removeComponentOfType(type));
  }
}

export default Entity;
