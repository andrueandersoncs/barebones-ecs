'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('../uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _Component = require('../Component');

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
  function Entity(id, components) {
    _classCallCheck(this, Entity);

    this.id = id || (0, _uuid2.default)();

    if (!Entity.isValidEntity(this)) throw 'Invalid entity constructed!';

    this.components = components || {};

    for (var key in this.components) {
      if (!_Component2.default.isValidComponent(this.components[key])) throw 'Invalid component in entity constructor!';
    }
  }

  _createClass(Entity, [{
    key: 'addComponent',
    value: function addComponent(component) {
      if (!_Component2.default.isValidComponent(component)) return;
      if (this.hasComponent(component)) return;
      this.components[component.type] = component;
    }
  }, {
    key: 'addComponents',
    value: function addComponents(components) {
      var _this = this;

      if (!Array.isArray(components)) return;
      components.forEach(function (component) {
        return _this.addComponent(component);
      });
    }
  }, {
    key: 'hasComponent',
    value: function hasComponent(component) {
      if (!_Component2.default.isValidComponent(component)) return false;
      return this.hasComponentOfType(component.type);
    }
  }, {
    key: 'hasComponents',
    value: function hasComponents(components) {
      var _this2 = this;

      if (!Array.isArray(components)) return false;
      return components.every(function (component) {
        return _this2.hasComponent(component);
      });
    }
  }, {
    key: 'hasComponentOfType',
    value: function hasComponentOfType(type) {
      return typeof type === 'string' && typeof this.components[type] !== 'undefined';
    }
  }, {
    key: 'hasComponentsOfTypes',
    value: function hasComponentsOfTypes(types) {
      var _this3 = this;

      if (!Array.isArray(types)) return false;
      return types.every(function (type) {
        return _this3.hasComponentOfType(type);
      });
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
      var _this4 = this;

      if (!Array.isArray(types)) return [];
      return types.map(function (type) {
        return _this4.getComponentOfType(type);
      });
    }
  }, {
    key: 'removeComponent',
    value: function removeComponent(component) {
      if (!this.hasComponent(component)) return;
      this.components[component.type] = undefined;
    }
  }, {
    key: 'removeComponents',
    value: function removeComponents(components) {
      var _this5 = this;

      if (!Array.isArray(components)) return;
      components.forEach(function (component) {
        return _this5.removeComponent(component);
      });
    }
  }, {
    key: 'removeComponentOfType',
    value: function removeComponentOfType(type) {
      if (!this.hasComponentOfType(type)) return;
      this.components[type] = undefined;
    }
  }, {
    key: 'removeComponentsOfTypes',
    value: function removeComponentsOfTypes(types) {
      var _this6 = this;

      if (!Array.isArray(types)) return;
      types.forEach(function (type) {
        return _this6.removeComponentOfType(type);
      });
    }
  }], [{
    key: 'isValidEntity',
    value: function isValidEntity(entity) {
      return typeof entity.id === 'string' && entity.id.length > 0;
    }
  }]);

  return Entity;
}();

exports.default = Entity;