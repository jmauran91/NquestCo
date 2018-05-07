webpackHotUpdate(0,{

/***/ 884:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Fetch = __webpack_require__(26);\n\nvar _Fetch2 = _interopRequireDefault(_Fetch);\n\nvar _Auth = __webpack_require__(18);\n\nvar _Auth2 = _interopRequireDefault(_Auth);\n\nvar _propTypes = __webpack_require__(1);\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar AdminPage = function (_React$Component) {\n  _inherits(AdminPage, _React$Component);\n\n  function AdminPage(props) {\n    _classCallCheck(this, AdminPage);\n\n    var _this = _possibleConstructorReturn(this, (AdminPage.__proto__ || Object.getPrototypeOf(AdminPage)).call(this, props));\n\n    _this.state = {\n      message: ''\n    };\n\n    _this.deleteNotes = _Fetch2.default.deleteNotes.bind(_this);\n    _this.deleteFiles = _Fetch2.default.deleteFiles.bind(_this);\n    _this.deleteProjects = _Fetch2.default.deleteProjects.bind(_this);\n    _this.deleteUsers = _Fetch2.default.deleteUsers.bind(_this);\n    _this.deleteConvos = _Fetch2.default.deleteConvos.bind(_this);\n    _this.deletePings = _Fetch2.default.deletePings.bind(_this);\n    _this.deleteMessages = _Fetch2.default.deleteMessages.bind(_this);\n\n    return _this;\n  }\n\n  _createClass(AdminPage, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      if (!_Auth2.default.authorizeAdmin()) {\n        this.context.router.history.push('/');\n      }\n    }\n  }, {\n    key: 'componentWillUpdate',\n    value: function componentWillUpdate() {\n      if (!_Auth2.default.authorizeAdmin()) {\n        this.context.router.history.push('/');\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      if (this.state.message !== '') {\n        var msgStyle = {\n          backgroundColor: 'green',\n          color: 'white',\n          width: '20vw',\n          height: '10vh',\n          fontSize: '3em',\n          position: 'absolute',\n          bottom: '20%',\n          left: '40%'\n        };\n      } else {\n        var msgStyle = {\n          display: 'none'\n        };\n      }\n      return _react2.default.createElement(\n        'div',\n        { className: 'admin-master' },\n        _react2.default.createElement(\n          'h1',\n          null,\n          ' Hello there! This is the admin page '\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'admin-control-holder' },\n          _react2.default.createElement(\n            'h2',\n            null,\n            ' Danger!!! '\n          ),\n          _react2.default.createElement(\n            'ul',\n            null,\n            _react2.default.createElement(\n              'li',\n              { className: 'admin-control' },\n              _react2.default.createElement(\n                'span',\n                { onClick: this.deleteNotes },\n                'Delete Notes'\n              )\n            ),\n            _react2.default.createElement(\n              'li',\n              { className: 'admin-control' },\n              _react2.default.createElement(\n                'span',\n                { onClick: this.deleteFiles },\n                'Delete Files'\n              )\n            ),\n            _react2.default.createElement(\n              'li',\n              { className: 'admin-control' },\n              _react2.default.createElement(\n                'span',\n                { onClick: this.deleteProjects },\n                'Delete Projects'\n              )\n            ),\n            _react2.default.createElement(\n              'li',\n              { className: 'admin-control' },\n              _react2.default.createElement(\n                'span',\n                { onClick: this.deleteUsers },\n                'Delete Users'\n              )\n            ),\n            _react2.default.createElement(\n              'li',\n              { className: 'admin-control' },\n              _react2.default.createElement(\n                'span',\n                { onClick: this.deleteConvos },\n                'Delete Convos'\n              )\n            ),\n            _react2.default.createElement(\n              'li',\n              { className: 'admin-control' },\n              _react2.default.createElement(\n                'span',\n                { onClick: this.deletePings },\n                'Delete Pings'\n              )\n            ),\n            _react2.default.createElement(\n              'li',\n              { className: 'admin-control' },\n              _react2.default.createElement(\n                'span',\n                { onClick: this.deleteMessages },\n                'Delete Messages'\n              )\n            )\n          )\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'admin-response-msg', style: msgStyle },\n          this.state.message\n        )\n      );\n    }\n  }]);\n\n  return AdminPage;\n}(_react2.default.Component);\n\nAdminPage.contextTypes = {\n  router: _propTypes2.default.object.isRequired\n};\n\nvar _default = AdminPage;\nexports.default = _default;\n;\n\nvar _temp = function () {\n  if (typeof __REACT_HOT_LOADER__ === 'undefined') {\n    return;\n  }\n\n  __REACT_HOT_LOADER__.register(AdminPage, 'AdminPage', '/Users/johnmauran/Challenges/webpack3_react/app/components/AdminPage.js');\n\n  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/johnmauran/Challenges/webpack3_react/app/components/AdminPage.js');\n}();\n\n;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODg0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL0FkbWluUGFnZS5qcz9hZWZjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmV0Y2ggZnJvbSAnLi4vbW9kdWxlcy9GZXRjaCc7XG5pbXBvcnQgQXV0aCBmcm9tICcuLi9tb2R1bGVzL0F1dGgnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgQWRtaW5QYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1lc3NhZ2U6ICcnXG4gICAgfVxuXG4gICAgdGhpcy5kZWxldGVOb3RlcyA9IEZldGNoLmRlbGV0ZU5vdGVzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5kZWxldGVGaWxlcyA9IEZldGNoLmRlbGV0ZUZpbGVzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5kZWxldGVQcm9qZWN0cyA9IEZldGNoLmRlbGV0ZVByb2plY3RzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5kZWxldGVVc2VycyA9IEZldGNoLmRlbGV0ZVVzZXJzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5kZWxldGVDb252b3MgPSBGZXRjaC5kZWxldGVDb252b3MuYmluZCh0aGlzKTtcbiAgICB0aGlzLmRlbGV0ZVBpbmdzID0gRmV0Y2guZGVsZXRlUGluZ3MuYmluZCh0aGlzKTtcbiAgICB0aGlzLmRlbGV0ZU1lc3NhZ2VzID0gRmV0Y2guZGVsZXRlTWVzc2FnZXMuYmluZCh0aGlzKTtcblxuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgaWYoIUF1dGguYXV0aG9yaXplQWRtaW4oKSl7XG4gICAgICB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkucHVzaCgnLycpXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVwZGF0ZSgpe1xuICAgIGlmKCFBdXRoLmF1dGhvcml6ZUFkbWluKCkpe1xuICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5LnB1c2goJy8nKVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIGlmKHRoaXMuc3RhdGUubWVzc2FnZSAhPT0gJycpe1xuICAgICAgdmFyIG1zZ1N0eWxlID0ge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdncmVlbicsXG4gICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICB3aWR0aDogJzIwdncnLFxuICAgICAgICBoZWlnaHQ6ICcxMHZoJyxcbiAgICAgICAgZm9udFNpemU6ICczZW0nLFxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgYm90dG9tOiAnMjAlJyxcbiAgICAgICAgbGVmdDogJzQwJSdcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgbXNnU3R5bGUgPSB7XG4gICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1hc3RlclwiPlxuICAgICAgICA8aDE+IEhlbGxvIHRoZXJlISBUaGlzIGlzIHRoZSBhZG1pbiBwYWdlIDwvaDE+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tY29udHJvbC1ob2xkZXJcIj5cbiAgICAgICAgICA8aDI+IERhbmdlciEhISA8L2gyPlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJhZG1pbi1jb250cm9sXCIgPlxuICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLmRlbGV0ZU5vdGVzfT5EZWxldGUgTm90ZXM8L3NwYW4+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImFkbWluLWNvbnRyb2xcIiA+XG4gICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e3RoaXMuZGVsZXRlRmlsZXN9PkRlbGV0ZSBGaWxlczwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiYWRtaW4tY29udHJvbFwiID5cbiAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17dGhpcy5kZWxldGVQcm9qZWN0c30+RGVsZXRlIFByb2plY3RzPC9zcGFuPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJhZG1pbi1jb250cm9sXCIgPlxuICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLmRlbGV0ZVVzZXJzfT5EZWxldGUgVXNlcnM8L3NwYW4+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImFkbWluLWNvbnRyb2xcIiA+XG4gICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e3RoaXMuZGVsZXRlQ29udm9zfT5EZWxldGUgQ29udm9zPC9zcGFuPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJhZG1pbi1jb250cm9sXCIgPlxuICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLmRlbGV0ZVBpbmdzfT5EZWxldGUgUGluZ3M8L3NwYW4+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImFkbWluLWNvbnRyb2xcIiA+XG4gICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e3RoaXMuZGVsZXRlTWVzc2FnZXN9PkRlbGV0ZSBNZXNzYWdlczwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVzcG9uc2UtbXNnXCIgc3R5bGU9e21zZ1N0eWxlfT5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5tZXNzYWdlfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5cbkFkbWluUGFnZS5jb250ZXh0VHlwZXMgPSB7XG4gIHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRtaW5QYWdlXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gYXBwL2NvbXBvbmVudHMvQWRtaW5QYWdlLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFiQTtBQWNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVVBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQW5CQTtBQUZBO0FBMEJBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUE1QkE7QUFpQ0E7Ozs7QUFqRkE7QUFDQTtBQW9GQTtBQUNBO0FBREE7QUFDQTtBQUlBOzs7Ozs7Ozs7QUExRkE7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///884\n");

/***/ })

})