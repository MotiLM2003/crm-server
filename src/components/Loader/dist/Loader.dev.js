"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Loader = function Loader() {
  return _reactDom["default"].createPortal('Hello world', document.getElementById('loader'));
};

var _default = Loader;
exports["default"] = _default;