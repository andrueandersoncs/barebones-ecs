'use strict';

var _Observable = require('./Observable');

var _Observable2 = _interopRequireDefault(_Observable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('constructor', function () {
  test('creates a new handlers map', function () {
    var observable = new _Observable2.default();
    expect(observable.handlers).toBeDefined();
  });
});

describe('isValidEventType', function () {
  test('returns true for strings with length greater than 0', function () {
    expect(_Observable2.default.isValidEventType('hello')).toBe(true);
  });

  test('returns false for all non-strings', function () {
    expect(_Observable2.default.isValidEventType(true)).toBe(false);
    expect(_Observable2.default.isValidEventType(1234)).toBe(false);
    expect(_Observable2.default.isValidEventType(null)).toBe(false);
    expect(_Observable2.default.isValidEventType(undefined)).toBe(false);
    expect(_Observable2.default.isValidEventType({})).toBe(false);
  });
});

describe('isValidEventHandler', function () {
  test('returns true for functions', function () {
    expect(_Observable2.default.isValidEventHandler(function () {})).toBe(true);
  });

  test('returns false for all non-functions', function () {
    expect(_Observable2.default.isValidEventHandler(true)).toBe(false);
    expect(_Observable2.default.isValidEventHandler('12')).toBe(false);
    expect(_Observable2.default.isValidEventHandler(1234)).toBe(false);
    expect(_Observable2.default.isValidEventHandler(null)).toBe(false);
    expect(_Observable2.default.isValidEventHandler(undefined)).toBe(false);
    expect(_Observable2.default.isValidEventHandler({})).toBe(false);
  });
});

describe('on', function () {
  test('only allows valid event types', function () {
    expect(function () {
      var o = new _Observable2.default();
      o.on(1234, function () {});
    }).toThrow();

    expect(function () {
      var o = new _Observable2.default();
      o.on('1234', function () {});
    }).not.toThrow();
  });

  test('only allows valid event handlers', function () {
    expect(function () {
      var o = new _Observable2.default();
      o.on('1234', false);
    }).toThrow();

    expect(function () {
      var o = new _Observable2.default();
      o.on('1234', function () {});
    }).not.toThrow();
  });

  test('creates new event type set if one does not exist', function () {
    var o = new _Observable2.default();
    o.on('1234', function () {});
    expect(o.handlers.has('1234'));
  });

  test('adds passed handler to the set of handlers for its event type', function () {
    var handler = function handler() {};
    var o = new _Observable2.default();
    o.on('1234', handler);
    expect(o.handlers.get('1234').has(handler)).toBe(true);
  });
});

describe('off', function () {
  test('only allows valid event types', function () {
    expect(function () {
      var o = new _Observable2.default();
      o.off(1234, function () {});
    }).toThrow();

    expect(function () {
      var o = new _Observable2.default();
      o.off('1234', function () {});
    }).not.toThrow();
  });

  test('only allows valid event handlers', function () {
    expect(function () {
      var o = new _Observable2.default();
      o.off('1234', false);
    }).toThrow();

    expect(function () {
      var o = new _Observable2.default();
      o.off('1234', function () {});
    }).not.toThrow();
  });

  test('does nothing if there are no handlers of type', function () {
    var o = new _Observable2.default();
    o.on('4321', function () {});
    expect(o.handlers.size).toBe(1);
    o.off('1234', function () {});
    expect(o.handlers.size).toBe(1);
  });

  test('removes only the passed handler', function () {
    var o = new _Observable2.default();
    var handlerA = function handlerA() {};
    var handlerB = function handlerB() {};
    o.on('1234', handlerA);
    o.on('1234', handlerB);
    expect(o.handlers.get('1234').size).toBe(2);
    expect(o.handlers.get('1234').has(handlerA)).toBe(true);
    expect(o.handlers.get('1234').has(handlerB)).toBe(true);
    o.off('1234', handlerA);
    expect(o.handlers.get('1234').size).toBe(1);
    expect(o.handlers.get('1234').has(handlerA)).toBe(false);
    expect(o.handlers.get('1234').has(handlerB)).toBe(true);
  });
});

describe('emit', function () {
  test('only allows valid event types', function () {
    expect(function () {
      var o = new _Observable2.default();
      o.emit(1234, function () {});
    }).toThrow();

    expect(function () {
      var o = new _Observable2.default();
      o.emit('1234', function () {});
    }).not.toThrow();
  });

  test('does nothing if type has no handler', function () {
    var o = new _Observable2.default();
    var handler = jest.fn();
    o.on('1234', handler);
    o.emit('4321', {});
    expect(handler).not.toHaveBeenCalled();
  });

  test('calls each handler registered to the passed type', function () {
    var o = new _Observable2.default();
    var handlerA = jest.fn();
    var handlerB = jest.fn();
    o.on('1234', handlerA);
    o.on('1234', handlerB);
    o.emit('1234', {});
    expect(handlerA).toHaveBeenCalled();
    expect(handlerB).toHaveBeenCalled();
  });

  test('passes the event data to the handler', function () {
    var o = new _Observable2.default();
    var handlerA = jest.fn();
    var data = {};
    o.on('1234', handlerA);
    o.emit('1234', data);
    expect(handlerA).toHaveBeenCalledWith(data);
  });
});