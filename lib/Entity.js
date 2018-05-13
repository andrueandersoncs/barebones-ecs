'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('./uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
  function Entity(id, components) {
    _classCallCheck(this, Entity);

    this.id = id || (0, _uuid2.default)();
    this.components = components || {};
  }

  _createClass(Entity, [{
    key: 'addComponent',
    value: function addComponent(component) {
      if (!_Component2.default.isValidComponent(component)) return;
      if (this.hasComponent(component)) return;
      this.components[component.type] = component;
    }
  }, {
    key: 'hasComponent',
    value: function hasComponent(component) {
      if (!_Component2.default.isValidComponent(component)) return false;
      return this.hasComponentOfType(component.type);
    }
  }, {
    key: 'hasComponentOfType',
    value: function hasComponentOfType(type) {
      return typeof this.components[type] !== 'undefined';
    }
  }, {
    key: 'hasComponentsOfTypes',
    value: function hasComponentsOfTypes(types) {
      var _this = this;

      if (!Array.isArray(types)) return false;
      return types.reduce(function (result, type) {
        return result && _this.hasComponentOfType(type);
      }, true);
    }
  }, {
    key: 'getComponentOfType',
    value: function getComponentOfType(type) {
      if (!this.hasComponentOfType(type)) return null;
      return this.components[type];
    }
  }, {
    key: 'getComponentsOfTypes',
    value: function getComponentsOfTypes(types) {
      var _this2 = this;

      if (!Array.isArray(types)) return [];
      return types.map(function (type) {
        return _this2.getComponentOfType(type);
      });
    }
  }, {
    key: 'removeComponent',
    value: function removeComponent(component) {
      if (!this.hasComponent(component)) return;
      this.components[component.type] = undefined;
    }
  }, {
    key: 'removeComponentOfType',
    value: function removeComponentOfType(type) {
      if (!this.hasComponentOfType(type)) return;
      this.components[type] = undefined;
    }
  }], [{
    key: 'isValidEntity',
    value: function isValidEntity(entity) {
      return typeof entity.id === 'string';
    }
  }]);

  return Entity;
}();

exports.default = Entity;