webpackHotUpdate(0,{

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _socket = __webpack_require__(242);\n\nvar _socket2 = _interopRequireDefault(_socket);\n\nvar _Auth = __webpack_require__(22);\n\nvar _Auth2 = _interopRequireDefault(_Auth);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ChatList = function (_React$Component) {\n  _inherits(ChatList, _React$Component);\n\n  function ChatList(props) {\n    _classCallCheck(this, ChatList);\n\n    var _this = _possibleConstructorReturn(this, (ChatList.__proto__ || Object.getPrototypeOf(ChatList)).call(this, props));\n\n    _this.socket = _this.props.socket;\n\n    _this.state = {\n      conversations: [],\n      response_msg: ''\n    };\n    return _this;\n  }\n\n  _createClass(ChatList, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      var _this2 = this;\n\n      var _id = this.props.current_user._id;\n      var url = 'http://localhost:3000/chat/users/' + _id + '/conversations';\n      if (this.state.conversations.length == 0 || this.state.response_msg == '') {\n        fetch(url, {\n          method: 'GET',\n          headers: {\n            Authorization: 'bearer ' + _Auth2.default.getToken()\n          }\n        }).then(function (response) {\n          return response.json();\n        }).then(function (response) {\n          if (response.message) {\n            console.log(response.message);\n            _this2.setState({ response_msg: response.message });\n          } else {\n            _this2.setState({ conversations: response.conversations_array });\n            console.log(response.conversations_array);\n            console.log(response.conversations_array[0]);\n          }\n        }).catch(function (err) {\n          console.log(err);\n        });\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this3 = this;\n\n      if (this.state.conversations.length != 0) {\n        this.state.conversations.forEach(function (conversation) {\n          if (conversation.recipients) {\n            var conv_recipients = \"\";\n            conversation.recipients.map(function (recip) {\n              conv_recipients + (recip + ', ');\n            });\n          } else if (conversation.recipient) {\n            var conv_recipients = conversation.recipient;\n          }\n        });\n\n        var renderConvos = this.state.conversations.map(function (conversation, i) {\n          if (conversation.recipients) {\n            var conv_recipients = '';\n            conversation.recipients.map(function (recip) {\n              conv_recipients + (recip + ', ');\n            });\n          }\n          return _react2.default.createElement(\n            'li',\n            {\n              key: i + 1,\n              className: 'convo-tile',\n              onClick: _this3.props.convoSelector,\n              id: conversation.conversationId\n            },\n            _react2.default.createElement(\n              'div',\n              { className: 'convo-avatar' },\n              _react2.default.createElement('img', null)\n            ),\n            _react2.default.createElement(\n              'div',\n              { className: 'convo-recipients' },\n              conv_recipients\n            )\n          );\n        });\n      } else {\n        var renderConvos = _react2.default.createElement(\n          'li',\n          { id: 'no-convo', className: 'convo-tile-no-convos' },\n          'No convos yet'\n        );\n      }\n\n      return _react2.default.createElement(\n        'div',\n        null,\n        _react2.default.createElement(\n          'div',\n          { className: 'conv-list-container' },\n          _react2.default.createElement(\n            'ul',\n            { className: 'conv-list' },\n            _react2.default.createElement(\n              'li',\n              {\n                key: 0,\n                onClick: this.props.convoSelector,\n                className: 'conv-list-new-message',\n                id: 'conv-list-new-message'\n              },\n              'New Message'\n            ),\n            renderConvos\n          )\n        )\n      );\n    }\n  }]);\n\n  return ChatList;\n}(_react2.default.Component);\n\nvar _default = ChatList;\nexports.default = _default;\n;\n\nvar _temp = function () {\n  if (typeof __REACT_HOT_LOADER__ === 'undefined') {\n    return;\n  }\n\n  __REACT_HOT_LOADER__.register(ChatList, 'ChatList', '/Users/johnmauran/Challenges/webpack3_react/app/components/chat/chatList.js');\n\n  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/johnmauran/Challenges/webpack3_react/app/components/chat/chatList.js');\n}();\n\n;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTIzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL2NoYXQvY2hhdExpc3QuanM/YzgwOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IEF1dGggZnJvbSAnLi4vLi4vbW9kdWxlcy9BdXRoJztcblxuXG5jbGFzcyBDaGF0TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnNvY2tldCA9IHRoaXMucHJvcHMuc29ja2V0O1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbnZlcnNhdGlvbnM6IFtdLFxuICAgICAgcmVzcG9uc2VfbXNnOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgIHZhciBfaWQgPSB0aGlzLnByb3BzLmN1cnJlbnRfdXNlci5faWRcbiAgICB2YXIgdXJsID0gYGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9jaGF0L3VzZXJzLyR7X2lkfS9jb252ZXJzYXRpb25zYFxuICAgIGlmKHRoaXMuc3RhdGUuY29udmVyc2F0aW9ucy5sZW5ndGggPT0gMCB8fCB0aGlzLnN0YXRlLnJlc3BvbnNlX21zZyA9PSAnJyl7XG4gICAgICBmZXRjaCh1cmwsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBiZWFyZXIgJHtBdXRoLmdldFRva2VuKCl9YFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmKHJlc3BvbnNlLm1lc3NhZ2Upe1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLm1lc3NhZ2UpXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHJlc3BvbnNlX21zZzogcmVzcG9uc2UubWVzc2FnZSB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbnZlcnNhdGlvbnM6IHJlc3BvbnNlLmNvbnZlcnNhdGlvbnNfYXJyYXkgfSlcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5jb252ZXJzYXRpb25zX2FycmF5KVxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmNvbnZlcnNhdGlvbnNfYXJyYXlbMF0pXG5cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCl7XG5cbiAgICBpZih0aGlzLnN0YXRlLmNvbnZlcnNhdGlvbnMubGVuZ3RoICE9IDApe1xuICAgICAgdGhpcy5zdGF0ZS5jb252ZXJzYXRpb25zLmZvckVhY2goKGNvbnZlcnNhdGlvbikgPT4ge1xuICAgICAgICBpZihjb252ZXJzYXRpb24ucmVjaXBpZW50cyl7XG4gICAgICAgICAgdmFyIGNvbnZfcmVjaXBpZW50cyA9IFwiXCI7XG4gICAgICAgICAgY29udmVyc2F0aW9uLnJlY2lwaWVudHMubWFwKChyZWNpcCkgPT4ge1xuICAgICAgICAgICAgY29udl9yZWNpcGllbnRzICsgYCR7cmVjaXB9LCBgXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb252ZXJzYXRpb24ucmVjaXBpZW50KXtcbiAgICAgICAgICB2YXIgY29udl9yZWNpcGllbnRzID0gY29udmVyc2F0aW9uLnJlY2lwaWVudFxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICB2YXIgcmVuZGVyQ29udm9zID0gdGhpcy5zdGF0ZS5jb252ZXJzYXRpb25zLm1hcCgoY29udmVyc2F0aW9uLCBpKSA9PiB7XG4gICAgICAgIGlmKGNvbnZlcnNhdGlvbi5yZWNpcGllbnRzKXtcbiAgICAgICAgICB2YXIgY29udl9yZWNpcGllbnRzID0gYGA7XG4gICAgICAgICAgY29udmVyc2F0aW9uLnJlY2lwaWVudHMubWFwKChyZWNpcCkgPT4ge1xuICAgICAgICAgICAgY29udl9yZWNpcGllbnRzICsgYCR7cmVjaXB9LCBgXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICBrZXk9e2krMX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImNvbnZvLXRpbGVcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5jb252b1NlbGVjdG9yfVxuICAgICAgICAgICAgaWQ9e2NvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25JZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnZvLWF2YXRhclwiPlxuICAgICAgICAgICAgICA8aW1nIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udm8tcmVjaXBpZW50c1wiPlxuICAgICAgICAgICAgICB7Y29udl9yZWNpcGllbnRzfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKVxuICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgcmVuZGVyQ29udm9zID0gPGxpIGlkPVwibm8tY29udm9cIiBjbGFzc05hbWU9XCJjb252by10aWxlLW5vLWNvbnZvc1wiPk5vIGNvbnZvcyB5ZXQ8L2xpPlxuICAgIH1cblxuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udi1saXN0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJjb252LWxpc3RcIj5cbiAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICBrZXk9ezB9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMuY29udm9TZWxlY3Rvcn1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29udi1saXN0LW5ldy1tZXNzYWdlXCJcbiAgICAgICAgICAgICAgaWQ9XCJjb252LWxpc3QtbmV3LW1lc3NhZ2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgTmV3IE1lc3NhZ2VcbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB7cmVuZGVyQ29udm9zfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdExpc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gYXBwL2NvbXBvbmVudHMvY2hhdC9jaGF0TGlzdC5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7OztBQUVBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSkE7QUFRQTtBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBVEE7QUFjQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQUE7QUFBQTtBQVFBO0FBVEE7QUFEQTtBQURBO0FBZ0JBOzs7O0FBcEdBO0FBQ0E7QUF3R0E7Ozs7Ozs7OztBQXpHQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///523\n");

/***/ })

})