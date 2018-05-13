'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity = require('./Entity');

var _Entity2 = _interopRequireDefault(_Entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = function () {
  function Engine(entities, systems) {
    _classCallCheck(this, Engine);

    this.entities = entities || {};
    this.systems = systems || [];
  }

  _createClass(Engine, [{
    key: 'createEntity',
    value: function createEntity() {
      var entity = new _Entity2.default();
      this.entities[entity.id] = entity;
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
      if (!this.entityIdExists(id)) return;
      this.entities[id] = undefined;
    }
  }, {
    key: 'entityExists',
    value: function entityExists(entity) {
      if (!_Entity2.default.isValidEntity(entity)) return false;
      return this.entityIdExists(entity.id);
    }
  }, {
    key: 'entityIdExists',
    value: function entityIdExists(id) {
      return typeof this.entities[id] !== 'undefined';
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