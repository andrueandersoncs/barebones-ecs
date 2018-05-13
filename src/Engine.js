import Entity from './Entity';

class Engine {
  constructor(entities, systems) {
    this.entities = entities || {};
    this.systems = systems || [];
  }

  createEntity() {
    const entity = new Entity();
    this.entities[entity.id] = entity;
    return entity;
  }

  destroyEntity(entity) {
    if (!Entity.isValidEntity(entity)) return;
    this.destroyEntityById(entity.id);
  }

  destroyEntityById(id) {
    if (!this.entityIdExists(id)) return;
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
