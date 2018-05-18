'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function (_Observable) {
  _inherits(Component, _Observable);

  function Component(type, properties) {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

    if (!Component.isValidComponentType(type)) throw 'Invalid component type passed to Component constructor!';

    if (properties && !Component.isValidPropertiesMap(properties)) throw 'Invalid properties map passed to Component constructor!';

    _this.type = type;

    if (properties) Object.keys(properties).forEach(function (name) {
      return _this[name] = properties[name];
    });
    return _this;
  }

  _createClass(Component, null, [{
    key: 'fromObject',
    value: function fromObject(obj) {
      if (!Component.isValidComponent(obj)) throw 'Invalid object passed to Component.fromObject!';

      var properties = Object.keys(obj).filter(function (name) {
        return name !== 'type';
      }).reduce(function (total, current) {
        total[current] = obj[current];
        return total;
      }, {});

      return new Component(obj.type, properties);
    }
  }, {
    key: 'isValidPropertiesMap',
    value: function isValidPropertiesMap(properties) {
      return !Array.isArray(properties) && (typeof properties === 'undefined' ? 'undefined' : _typeof(properties)) === 'object';
    }
  }, {
    key: 'isValidComponent',
    value: function isValidComponent(component) {
      return Component.isValidComponentType(component.type);
    }
  }, {
    key: 'isValidComponentType',
    value: function isValidComponentType(type) {
      return typeof type === 'string' && type.length > 0;
    }
  }]);

  return Component;
}(_Observable3.default);

exports.default = Component;