import Entity from 'Entity';
import System from 'System';

class Engine {
  constructor(entities, systems) {
    if (systems && !Engine.isValidSystemsArray(systems))
      throw 'Invalid systems array passed to engine constructor!';

    if (entities && !Engine.isValidEntitiesMap(entities))
      throw 'Invalid entities object passed to engine constructor!';

    this.systems = systems || [];
    this.systems.forEach(system => system.emit('engineConstructed', this));

    this.entities = entities || {};
    Object.keys(this.entities)
      .forEach(id => this.systems
        .forEach(system => system.emit('entityCreated', this.entities[id])))
  }

  static isValidEntitiesMap(entities) {
    return !Array.isArray(entities) &&
      typeof entities === 'object' &&
      Object.keys(entities).every(id => Entity.isValidEntity(entities[id]));
  }

  static isValidSystemsArray(systems) {
    return Array.isArray(systems);
  }

  createEntity(components) {
    if (!Entity.isValidComponentsMap(components))
      throw 'Invalid components map was passed to createEntity!';

    const entity = new Entity(false, components);
    this.entities[entity.id] = entity;
    this.systems.forEach(system => system.emit('entityCreated', entity));
    return entity;
  }

  destroyEntity(entity) {
    if (!Entity.isValidEntity(entity))
      throw 'Invalid entity was passed to destroyEntity!';

    this.destroyEntityById(entity.id);
  }

  destroyEntityById(id) {
    if (!Entity.isValidEntityId(id))
      throw 'Invalid entity id was passed to destroyEntityById!';

    if (!this.hasEntityById(id)) return;

    const entity = this.entities[id];
    this.systems.forEach(system => system.emit('entityDestroyed', entity));
    this.entities[id] = undefined;
  }

  hasEntity(entity) {
    if (!Entity.isValidEntity(entity))
      throw 'Invalid entity was passed to hasEntity!';

    return this.hasEntityById(entity.id);
  }

  hasEntityById(id) {
    if (!Entity.isValidEntityId(id))
      throw 'Invalid entity id was passed to hasEntityById!';

    return typeof this.entities[id] !== 'undefined';
  }
}

export default Engine;
