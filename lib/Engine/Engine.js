'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity = require('../Entity');

var _Entity2 = _interopRequireDefault(_Entity);

var _System = require('../System');

var _System2 = _interopRequireDefault(_System);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = function () {
  function Engine(entities, systems) {
    var _this = this;

    _classCallCheck(this, Engine);

    if (systems && !Engine.isValidSystemsArray(systems)) throw 'Invalid systems array passed to engine constructor!';

    if (entities && !Engine.isValidEntitiesMap(entities)) throw 'Invalid entities object passed to engine constructor!';

    this.systems = systems || [];
    this.systems.forEach(function (system) {
      return system.emit('engineConstructed', _this);
    });

    this.entities = entities || {};
    Object.keys(this.entities).forEach(function (id) {
      return _this.systems.forEach(function (system) {
        return system.emit('entityCreated', _this.entities[id]);
      });
    });
  }

  _createClass(Engine, [{
    key: 'createEntity',
    value: function createEntity(components) {
      if (!_Entity2.default.isValidComponentsMap(components)) throw 'Invalid components map was passed to createEntity!';

      var entity = new _Entity2.default(false, components);
      this.entities[entity.id] = entity;
      this.systems.forEach(function (system) {
        return system.emit('entityCreated', entity);
      });
      return entity;
    }
  }, {
    key: 'destroyEntity',
    value: function destroyEntity(entity) {
      if (!_Entity2.default.isValidEntity(entity)) throw 'Invalid entity was passed to destroyEntity!';

      this.destroyEntityById(entity.id);
    }
  }, {
    key: 'destroyEntityById',
    value: function destroyEntityById(id) {
      if (!_Entity2.default.isValidEntityId(id)) throw 'Invalid entity id was passed to destroyEntityById!';

      if (!this.hasEntityById(id)) return;

      var entity = this.entities[id];
      this.systems.forEach(function (system) {
        return system.emit('entityDestroyed', entity);
      });
      this.entities[id] = undefined;
    }
  }, {
    key: 'hasEntity',
    value: function hasEntity(entity) {
      if (!_Entity2.default.isValidEntity(entity)) throw 'Invalid entity was passed to hasEntity!';

      return this.hasEntityById(entity.id);
    }
  }, {
    key: 'hasEntityById',
    value: function hasEntityById(id) {
      if (!_Entity2.default.isValidEntityId(id)) throw 'Invalid entity id was passed to hasEntityById!';

      return typeof this.entities[id] !== 'undefined';
    }
  }], [{
    key: 'isValidEntitiesMap',
    value: function isValidEntitiesMap(entities) {
      return !Array.isArray(entities) && (typeof entities === 'undefined' ? 'undefined' : _typeof(entities)) === 'object' && Object.keys(entities).every(function (id) {
        return _Entity2.default.isValidEntity(entities[id]);
      });
    }
  }, {
    key: 'isValidSystemsArray',
    value: function isValidSystemsArray(systems) {
      return Array.isArray(systems);
    }
  }]);

  return Engine;
}();

exports.default = Engine;