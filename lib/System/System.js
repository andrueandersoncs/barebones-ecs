'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity = require('../Entity');

var _Entity2 = _interopRequireDefault(_Entity);

var _Component = require('../Component');

var _Component2 = _interopRequireDefault(_Component);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
A System is a class that handles a specific set of Events.
Events must have a Type and a set of required Components.
To construct an Event, a list of Entities is passed as the subject.
Each Entity in the list must have the required Components.

| 
| that is no longer necessary, as systems become event processors
V 
An Engine alerts all Systems when an Entity is created or destroyed.
*/
var System = function (_Observable) {
  _inherits(System, _Observable);

  function System(requiredComponentTypes, eventHandlers) {
    _classCallCheck(this, System);

    var _this = _possibleConstructorReturn(this, (System.__proto__ || Object.getPrototypeOf(System)).call(this));

    _this.entities = new Map();

    _this.required = requiredComponentTypes || [];

    if (!System.isValidComponentTypesArray(requiredComponentTypes)) throw 'System constructed with invalid requiredComponentTypes!';

    _this.on('entityCreated', _this.onEntityCreated.bind(_this));
    _this.on('entityDestroyed', _this.onEntityDestroyed.bind(_this));
    _this.on('engineConstructed', _this.onEngineConstructed.bind(_this));

    eventHandlers = eventHandlers || {};

    if (!System.isValidEventHandlersMap(eventHandlers)) throw 'System constructed with invalid eventHandlers map!';

    for (var type in eventHandlers) {
      _this.on(type, eventHandlers[type]);
    }
    return _this;
  }

  _createClass(System, [{
    key: 'onEntityCreated',
    value: function onEntityCreated(entity) {
      if (!_Entity2.default.isValidEntity(entity)) throw 'Invalid entity passed in entityCreated event!';

      if (entity.hasComponentsOfTypes(this.required)) this.entities.set(entity.id, entity);
    }
  }, {
    key: 'onEntityDestroyed',
    value: function onEntityDestroyed(entity) {
      if (!_Entity2.default.isValidEntity(entity)) throw 'Invalid entity passed in entityDestroyed event!';

      this.entities.delete(entity.id);
    }
  }, {
    key: 'onEngineConstructed',
    value: function onEngineConstructed(engine) {
      this.engine = engine;
    }
  }], [{
    key: 'isValidComponentTypesArray',
    value: function isValidComponentTypesArray(typesArray) {
      return Array.isArray(typesArray) && typesArray.every(function (type) {
        return _Component2.default.isValidComponentType(type);
      });
    }
  }, {
    key: 'isValidEventHandlersMap',
    value: function isValidEventHandlersMap(eventHandlers) {
      return !Array.isArray(eventHandlers) && (typeof eventHandlers === 'undefined' ? 'undefined' : _typeof(eventHandlers)) === 'object' && Object.keys(eventHandlers).every(function (key) {
        return typeof eventHandlers[key] === 'function';
      });
    }
  }]);

  return System;
}(_Observable3.default);

exports.default = System;