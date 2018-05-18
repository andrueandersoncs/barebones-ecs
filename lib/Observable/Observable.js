'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observable = function () {
  function Observable() {
    _classCallCheck(this, Observable);

    this.handlers = new Map();
  }

  _createClass(Observable, [{
    key: 'on',
    value: function on(type, handler) {
      if (!Observable.isValidEventType(type)) throw 'Attempted to register invalid event type!';

      if (!Observable.isValidEventHandler(handler)) throw 'Attempted to register invalid event handler!';

      if (!this.handlers.has(type)) {
        this.handlers.set(type, new Set());
      }

      var typeHandlers = this.handlers.get(type);
      typeHandlers.add(handler);
    }
  }, {
    key: 'off',
    value: function off(type, handler) {
      if (!Observable.isValidEventType(type)) throw 'Attempted to unregister invalid event type!';

      if (!Observable.isValidEventHandler(handler)) throw 'Attempted to unregister invalid event handler!';

      if (!this.handlers.has(type)) return;

      var typeHandlers = this.handlers.get(type);
      typeHandlers.delete(handler);
    }
  }, {
    key: 'emit',
    value: function emit(type, data) {
      if (!Observable.isValidEventType(type)) throw 'Attempted to emit invalid event type!';

      if (!this.handlers.has(type)) return;

      var typeHandlers = this.handlers.get(type);
      typeHandlers.forEach(function (typeHandler) {
        return typeHandler(data);
      });
    }
  }], [{
    key: 'isValidEventType',
    value: function isValidEventType(type) {
      return typeof type === 'string' && type.length > 0;
    }
  }, {
    key: 'isValidEventHandler',
    value: function isValidEventHandler(handler) {
      return typeof handler === 'function';
    }
  }]);

  return Observable;
}();

exports.default = Observable;