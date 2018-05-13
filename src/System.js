import Entity from './Entity';

class System {
  constructor(requiredComponentTypes, onUpdate) {
    this.entities = new Map();
    this.required = requiredComponentTypes || [];
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
