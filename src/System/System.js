import Entity from 'Entity';
import Component from 'Component';

class System {
  constructor(requiredComponentTypes, onUpdate) {
    this.entities = new Map();

    if (typeof requiredComponentTypes !== 'undefined' && !Array.isArray(requiredComponentTypes))
      throw 'System constructed with requiredComponentTypes that is not an array!';
    this.required = requiredComponentTypes || [];
    this.required = this.required.filter(required => Component.isValidComponentType(required));
    
    if (typeof onUpdate !== 'undefined' && typeof onUpdate !== 'function')
      throw 'System constructed with onUpdate that is not a function!';
    this.onUpdate = onUpdate || function() {};
  }

  onEntityCreated(entity) {
    if (!Entity.isValidEntity(entity)) return;
    if (!entity.hasComponentsOfTypes(this.required)) return;
    this.entities.set(entity.id, entity);
  }

  onEntityDestroyed(entity) {
    if (!Entity.isValidEntity(entity)) return;
    this.entities.delete(entity.id);
  }

  update() {
    this.entities.forEach(entity => {
      const components = entity.getComponentsOfTypes(this.required);
      this.onUpdate(components);
    });
  }
}

export default System;
