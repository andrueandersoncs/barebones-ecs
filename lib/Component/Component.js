'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
  function Component(type, properties) {
    _classCallCheck(this, Component);

    this.type = type;

    for (var key in properties) {
      this[key] = properties[key];
    }
  }

  _createClass(Component, null, [{
    key: 'isValidComponent',
    value: function isValidComponent(candidate) {
      return typeof candidate.type === 'string';
    }
  }]);

  return Component;
}();

exports.default = Component;