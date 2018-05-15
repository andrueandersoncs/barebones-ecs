import Entity from 'Entity';
import System from 'System';

class Engine {
  constructor(entities, systems) {
    if (Array.isArray(entities) || (typeof entities !== 'object' && typeof entities !== 'undefined'))
      throw 'Entities object passed into Engine constructor as non-object!';

    this.entities = entities || {};
    
    for (let id in this.entities) {
      if (!Entity.isValidEntity(this.entities[id]))
        delete this.entities[id];
    }

    if (!Array.isArray(systems) && typeof systems !== 'undefined')
      throw 'Systems passed into Engine constructor must be an array!';

    this.systems = systems || [];
    this.systems = this.systems.filter(system => system instanceof System);
  }

  createEntity() {
    const entity = new Entity();
    this.entities[entity.id] = entity;
    this.systems.forEach(system => system.onEntityCreated(entity));
    return entity;
  }

  destroyEntity(entity) {
    if (!Entity.isValidEntity(entity)) return;
    this.destroyEntityById(entity.id);
  }

  destroyEntityById(id) {
    if (!this.entityIdExists(id)) return;
    const entity = this.entities[id];
    this.systems.forEach(system => system.onEntityDestroyed(entity));
    this.entities[id] = undefined;
  }

  entityExists(entity) {
    if (!Entity.isValidEntity(entity)) return false;
    return this.entityIdExists(entity.id);
  }

  entityIdExists(id) {
    return typeof this.entities[id] !== 'undefined';
  }

  start() {
    for (let id in this.entities) {
      let entity = this.entities[id];
      this.systems.forEach(system => {
        system.onEntityCreated(entity);
      });
    }
  }

  update() {
    window.requestAnimationFrame(this.update.bind(this));
    this.systems.forEach(system => system.update());
  }
}

export default Engine;
