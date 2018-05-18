'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('../uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _Component = require('../Component');

var _Component2 = _interopRequireDefault(_Component);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entity = function (_Observable) {
  _inherits(Entity, _Observable);

  function Entity(id, components) {
    _classCallCheck(this, Entity);

    var _this = _possibleConstructorReturn(this, (Entity.__proto__ || Object.getPrototypeOf(Entity)).call(this));

    if (id && !Entity.isValidEntityId(id)) throw 'Invalid entity id passed to entity constructor!';

    if (components && !Entity.isValidComponentsMap(components)) throw 'Invalid components map passed to entity constructor!';

    _this.id = id || (0, _uuid2.default)();
    _this.components = components || {};
    return _this;
  }

  _createClass(Entity, [{
    key: 'addComponent',
    value: function addComponent(component) {
      if (!_Component2.default.isValidComponent(component)) throw 'Invalid component passed to addComponent!';

      if (this.hasComponent(component)) return;
      this.components[component.type] = component;
      this.emit('componentAdded', component);
    }
  }, {
    key: 'addComponents',
    value: function addComponents(components) {
      var _this2 = this;

      if (!Array.isArray(components)) throw 'addComponents must be passed an array!';

      components.forEach(function (component) {
        return _this2.addComponent(component);
      });
    }
  }, {
    key: 'hasComponent',
    value: function hasComponent(component) {
      if (!_Component2.default.isValidComponent(component)) throw 'Invalid component passed to hasComponent!';

      return this.hasComponentOfType(component.type);
    }
  }, {
    key: 'hasComponents',
    value: function hasComponents(components) {
      var _this3 = this;

      if (!Array.isArray(components)) throw 'hasComponents must be passed an array!';

      return components.every(function (component) {
        return _this3.hasComponent(component);
      });
    }
  }, {
    key: 'hasComponentOfType',
    value: function hasComponentOfType(type) {
      if (!_Component2.default.isValidComponentType(type)) throw 'Invalid component type was passed to hasComponentOfType!';

      return typeof type === 'string' && typeof this.components[type] !== 'undefined';
    }
  }, {
    key: 'hasComponentsOfTypes',
    value: function hasComponentsOfTypes(types) {
      var _this4 = this;

      if (!Array.isArray(types)) throw 'hasComponentsOfTypes must be passed an array!';

      return types.every(function (type) {
        return _this4.hasComponentOfType(type);
      });
    }
  }, {
    key: 'getComponentOfType',
    value: function getComponentOfType(type) {
      if (!_Component2.default.isValidComponentType(type)) throw 'Invalid component type was passed to getComponentOfType!';

      if (!this.hasComponentOfType(type)) throw 'getComponentOfType was attempted on a type that was not had!';

      return this.components[type];
    }
  }, {
    key: 'getComponentsOfTypes',
    value: function getComponentsOfTypes(types) {
      var _this5 = this;

      if (!Array.isArray(types)) throw 'getComponentsOfTypes must be passed an array!';

      return types.map(function (type) {
        return _this5.getComponentOfType(type);
      });
    }
  }, {
    key: 'removeComponent',
    value: function removeComponent(component) {
      if (!_Component2.default.isValidComponent(component)) throw 'removeComponent was passed an invalid component!';

      if (!this.hasComponent(component)) throw 'Attempted to a component that was not had!';

      this.components[component.type] = undefined;
      this.emit('componentRemoved', component);
    }
  }, {
    key: 'removeComponents',
    value: function removeComponents(components) {
      var _this6 = this;

      if (!Array.isArray(components)) throw 'removeComponents must be passed an array!';

      components.forEach(function (component) {
        return _this6.removeComponent(component);
      });
    }
  }, {
    key: 'removeComponentOfType',
    value: function removeComponentOfType(type) {
      if (!_Component2.default.isValidComponentType(type)) throw 'removeComponentOfType was passed an invalid type!';

      if (!this.hasComponentOfType(type)) throw 'Attempted to remove a component of type that was not had!';

      var component = this.getComponentOfType(type);
      this.components[type] = undefined;
      this.emit('componentRemoved', component);
    }
  }, {
    key: 'removeComponentsOfTypes',
    value: function removeComponentsOfTypes(types) {
      var _this7 = this;

      if (!Array.isArray(types)) throw 'removeComponentsOfTypes must be passed an array!';

      var components = this.getComponentsOfTypes(types);
      types.forEach(function (type) {
        return _this7.removeComponentOfType(type);
      });
    }
  }], [{
    key: 'isValidEntity',
    value: function isValidEntity(entity) {
      return Entity.isValidEntityId(entity.id);
    }
  }, {
    key: 'isValidEntityId',
    value: function isValidEntityId(id) {
      return typeof id === 'string' && id.length > 0;
    }
  }, {
    key: 'isValidComponentsMap',
    value: function isValidComponentsMap(components) {
      return Object.keys(components).every(function (type) {
        return _Component2.default.isValidComponent(components[type]);
      });
    }
  }]);

  return Entity;
}(_Observable3.default);

exports.default = Entity;