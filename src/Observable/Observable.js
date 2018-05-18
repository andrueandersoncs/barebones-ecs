class Observable {
  constructor() {
    this.handlers = new Map();
  }

  static isValidEventType(type) {
    return typeof type === 'string' && type.length > 0;
  }

  static isValidEventHandler(handler) {
    return typeof handler === 'function';
  }
  
  on(type, handler) {
    if (!Observable.isValidEventType(type))
      throw 'Attempted to register invalid event type!';

    if (!Observable.isValidEventHandler(handler))
      throw 'Attempted to register invalid event handler!';

    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }

    const typeHandlers = this.handlers.get(type);
    typeHandlers.add(handler);
  }

  off(type, handler) {
    if (!Observable.isValidEventType(type))
      throw 'Attempted to unregister invalid event type!';

    if (!Observable.isValidEventHandler(handler))
      throw 'Attempted to unregister invalid event handler!';

    if (!this.handlers.has(type)) return;

    const typeHandlers = this.handlers.get(type);
    typeHandlers.delete(handler);
  }

  emit(type, data) {
    if (!Observable.isValidEventType(type))
      throw 'Attempted to emit invalid event type!';

    if (!this.handlers.has(type)) return;

    const typeHandlers = this.handlers.get(type);
    typeHandlers.forEach(typeHandler => typeHandler(data));
  }
}

export default Observable;
