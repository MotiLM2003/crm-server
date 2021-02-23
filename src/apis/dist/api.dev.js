"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _universalCookie = _interopRequireDefault(require("universal-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cookie = new _universalCookie["default"]();
var token = cookie.get('token');

var _default = _axios["default"].create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Authorization': "Bearer ".concat(cookie.get('token'))
  },
  withCredentials: true
});

exports["default"] = _default;