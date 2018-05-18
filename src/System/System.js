import Entity from 'Entity';
import Component from 'Component';
import Observable from 'Observable';

/*
Emits: (None)

Handles:
- entityCreated -> possibly cache entity for event handling?
  : this could be a bad way to do it, instead pass all relevant entities
  : with the event. then systems become basically just event handlers
- entityDestroyed
- engineConstructed
*/
class System extends Observable {
  constructor(requiredComponentTypes, eventHandlers) {
    super();

    this.entities = new Map();

    this.required = requiredComponentTypes || [];

    if (!System.isValidComponentTypesArray(requiredComponentTypes))
      throw 'System constructed with invalid requiredComponentTypes!';
    
    this.on('entityCreated', this.onEntityCreated.bind(this));
    this.on('entityDestroyed', this.onEntityDestroyed.bind(this));
    this.on('engineConstructed', this.onEngineConstructed.bind(this));

    eventHandlers = eventHandlers || {};

    if (!System.isValidEventHandlersMap(eventHandlers))
      throw 'System constructed with invalid eventHandlers map!';

    for (let type in eventHandlers) {
      this.on(type, eventHandlers[type]);
    }
  }

  static isValidComponentTypesArray(typesArray) {
    return Array.isArray(typesArray) &&
      typesArray.every(type => Component.isValidComponentType(type));
  }

  static isValidEventHandlersMap(eventHandlers) {
    return !Array.isArray(eventHandlers) &&
      typeof eventHandlers === 'object' &&
      Object.keys(eventHandlers).every(key => typeof eventHandlers[key] === 'function');
  }

  onEntityCreated(entity) {
    if (!Entity.isValidEntity(entity))
      throw 'Invalid entity passed in entityCreated event!';

    if (entity.hasComponentsOfTypes(this.required))
      this.entities.set(entity.id, entity);
  }

  onEntityDestroyed(entity) {
    if (!Entity.isValidEntity(entity))
      throw 'Invalid entity passed in entityDestroyed event!';

    this.entities.delete(entity.id);
  }

  onEngineConstructed(engine) {
    this.engine = engine;
  }
}

export default System;
