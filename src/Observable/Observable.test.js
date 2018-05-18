import Observable from "./Observable";

describe('constructor', () => {
  test('creates a new handlers map', () => {
    const observable = new Observable();
    expect(observable.handlers).toBeDefined();
  });
});

describe('isValidEventType', () => {
  test('returns true for strings with length greater than 0', () => {
    expect(Observable.isValidEventType('hello')).toBe(true);
  });

  test('returns false for all non-strings', () => {
    expect(Observable.isValidEventType(true)).toBe(false);
    expect(Observable.isValidEventType(1234)).toBe(false);
    expect(Observable.isValidEventType(null)).toBe(false);
    expect(Observable.isValidEventType(undefined)).toBe(false);
    expect(Observable.isValidEventType({})).toBe(false);
  });
});

describe('isValidEventHandler', () => {
  test('returns true for functions', () => {
    expect(Observable.isValidEventHandler(() => {})).toBe(true);
  });

  test('returns false for all non-functions', () => {
    expect(Observable.isValidEventHandler(true)).toBe(false);
    expect(Observable.isValidEventHandler('12')).toBe(false);
    expect(Observable.isValidEventHandler(1234)).toBe(false);
    expect(Observable.isValidEventHandler(null)).toBe(false);
    expect(Observable.isValidEventHandler(undefined)).toBe(false);
    expect(Observable.isValidEventHandler({})).toBe(false);
  });
});

describe('on', () => {
  test('only allows valid event types', () => {
    expect(() => {
      const o = new Observable();
      o.on(1234, () => {});
    }).toThrow();

    expect(() => {
      const o = new Observable();
      o.on('1234', () => {});
    }).not.toThrow();
  });

  test('only allows valid event handlers', () => {
    expect(() => {
      const o = new Observable();
      o.on('1234', false);
    }).toThrow();

    expect(() => {
      const o = new Observable();
      o.on('1234', () => {});
    }).not.toThrow();
  });

  test('creates new event type set if one does not exist', () => {
    const o = new Observable();
    o.on('1234', () => {});
    expect(o.handlers.has('1234'));
  });

  test('adds passed handler to the set of handlers for its event type', () => {
    const handler = () => {};
    const o = new Observable();
    o.on('1234', handler);
    expect(o.handlers.get('1234').has(handler)).toBe(true);
  })
});

describe('off', () => {
  test('only allows valid event types', () => {
    expect(() => {
      const o = new Observable();
      o.off(1234, () => {});
    }).toThrow();

    expect(() => {
      const o = new Observable();
      o.off('1234', () => {});
    }).not.toThrow();
  });

  test('only allows valid event handlers', () => {
    expect(() => {
      const o = new Observable();
      o.off('1234', false);
    }).toThrow();

    expect(() => {
      const o = new Observable();
      o.off('1234', () => {});
    }).not.toThrow();
  });

  test('does nothing if there are no handlers of type', () => {
    const o = new Observable();
    o.on('4321', () => {});
    expect(o.handlers.size).toBe(1);
    o.off('1234', () => {});
    expect(o.handlers.size).toBe(1);
  });

  test('removes only the passed handler', () => {
    const o = new Observable();
    const handlerA = () => {};
    const handlerB = () => {};
    o.on('1234', handlerA);
    o.on('1234', handlerB);
    expect(o.handlers.get('1234').size).toBe(2);
    expect(o.handlers.get('1234').has(handlerA)).toBe(true);
    expect(o.handlers.get('1234').has(handlerB)).toBe(true);
    o.off('1234', handlerA);
    expect(o.handlers.get('1234').size).toBe(1);
    expect(o.handlers.get('1234').has(handlerA)).toBe(false);
    expect(o.handlers.get('1234').has(handlerB)).toBe(true);
  })
});

describe('emit', () => {
  test('only allows valid event types', () => {
    expect(() => {
      const o = new Observable();
      o.emit(1234, () => {});
    }).toThrow();

    expect(() => {
      const o = new Observable();
      o.emit('1234', () => {});
    }).not.toThrow();
  });

  test('does nothing if type has no handler', () => {
    const o = new Observable();
    const handler = jest.fn();
    o.on('1234', handler);
    o.emit('4321', {});
    expect(handler).not.toHaveBeenCalled();
  });

  test('calls each handler registered to the passed type', () => {
    const o = new Observable();
    const handlerA = jest.fn();
    const handlerB = jest.fn();
    o.on('1234', handlerA);
    o.on('1234', handlerB);
    o.emit('1234', {});
    expect(handlerA).toHaveBeenCalled();
    expect(handlerB).toHaveBeenCalled();
  });

  test('passes the event data to the handler', () => {
    const o = new Observable();
    const handlerA = jest.fn();
    const data = {};
    o.on('1234', handlerA);
    o.emit('1234', data);
    expect(handlerA).toHaveBeenCalledWith(data);
  });
});