'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity = require('../Entity');

var _Entity2 = _interopRequireDefault(_Entity);

var _Component = require('../Component');

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// maybe refactor this as a map of messages to handlers?
var System = function () {
  function System(requiredComponentTypes, onUpdate) {
    _classCallCheck(this, System);

    this.entities = new Map();

    if (typeof requiredComponentTypes !== 'undefined' && !Array.isArray(requiredComponentTypes)) throw 'System constructed with requiredComponentTypes that is not an array!';

    this.required = requiredComponentTypes || [];
    this.required = this.required.filter(function (required) {
      return _Component2.default.isValidComponentType(required);
    });

    if (typeof onUpdate !== 'undefined' && typeof onUpdate !== 'function') throw 'System constructed with onUpdate that is not a function!';

    this.onUpdate = onUpdate || function () {};
  }

  // maybe allow callbacks when an entity is created for initialization?


  _createClass(System, [{
    key: 'onEntityCreated',
    value: function onEntityCreated(entity) {
      if (!_Entity2.default.isValidEntity(entity)) return;
      if (!entity.hasComponentsOfTypes(this.required)) return;
      this.entities.set(entity.id, entity);
    }

    // maybe allow callbacks when an entity is destroyed for cleanup?

  }, {
    key: 'onEntityDestroyed',
    value: function onEntityDestroyed(entity) {
      if (!_Entity2.default.isValidEntity(entity)) return;
      this.entities.delete(entity.id);
    }

    // maybe allow multiple callbacks when update is called?

  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      this.entities.forEach(function (entity) {

        if (!entity.hasComponentsOfTypes(_this.required)) {
          _this.entities.delete(entity.id);
        }

        var components = entity.getComponentsOfTypes(_this.required);
        _this.onUpdate(components);
      });
    }
  }]);

  return System;
}();

exports.default = System;