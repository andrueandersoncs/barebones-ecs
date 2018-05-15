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
    _classCallCheck(this, Engine);

    if (Array.isArray(entities) || (typeof entities === 'undefined' ? 'undefined' : _typeof(entities)) !== 'object' && typeof entities !== 'undefined') throw 'Entities object passed into Engine constructor as non-object!';

    this.entities = entities || {};

    for (var id in this.entities) {
      if (!_Entity2.default.isValidEntity(this.entities[id])) delete this.entities[id];
    }

    if (!Array.isArray(systems) && typeof systems !== 'undefined') throw 'Systems passed into Engine constructor must be an array!';

    this.systems = systems || [];
    this.systems = this.systems.filter(function (system) {
      return system instanceof _System2.default;
    });
  }

  _createClass(Engine, [{
    key: 'createEntity',
    value: function createEntity() {
      var entity = new _Entity2.default();
      this.entities[entity.id] = entity;
      this.systems.forEach(function (system) {
        return system.onEntityCreated(entity);
      });
      return entity;
    }
  }, {
    key: 'destroyEntity',
    value: function destroyEntity(entity) {
      if (!_Entity2.default.isValidEntity(entity)) return;
      this.destroyEntityById(entity.id);
    }
  }, {
    key: 'destroyEntityById',
    value: function destroyEntityById(id) {
      if (!this.hasEntityById(id)) return;
      var entity = this.entities[id];
      this.systems.forEach(function (system) {
        return system.onEntityDestroyed(entity);
      });
      this.entities[id] = undefined;
    }
  }, {
    key: 'hasEntity',
    value: function hasEntity(entity) {
      if (!_Entity2.default.isValidEntity(entity)) return false;
      return this.hasEntityById(entity.id);
    }
  }, {
    key: 'hasEntityById',
    value: function hasEntityById(id) {
      return _Entity2.default.isValidEntityId(id) && typeof this.entities[id] !== 'undefined';
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      var _loop = function _loop(id) {
        var entity = _this.entities[id];
        _this.systems.forEach(function (system) {
          system.onEntityCreated(entity);
        });
      };

      for (var id in this.entities) {
        _loop(id);
      }
    }
  }, {
    key: 'update',
    value: function update() {
      window.requestAnimationFrame(this.update.bind(this));
      this.systems.forEach(function (system) {
        return system.update();
      });
    }
  }]);

  return Engine;
}();

exports.default = Engine;