import uuid from 'uuid';
import Component from 'Component';

class Entity {
  constructor(id, components) {
    this.id = id || uuid();
    this.components = components || {};
  }

  static isValidEntity(entity) {
    return typeof entity.id === 'string';
  }

  addComponent(component) {
    if (!Component.isValidComponent(component)) return;
    if (this.hasComponent(component)) return;
    this.components[component.type] = component;
  }

  hasComponent(component) {
    if (!Component.isValidComponent(component)) return false;
    return this.hasComponentOfType(component.type);
  }

  hasComponentOfType(type) {
    return typeof this.components[type] !== 'undefined';
  }

  hasComponentsOfTypes(types) {
    if (!Array.isArray(types)) return false;
    return types.reduce((result, type) => result && this.hasComponentOfType(type), true);
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

  removeComponentOfType(type) {
    if (!this.hasComponentOfType(type)) return;
    this.components[type] = undefined;
  }
}

export default Entity;