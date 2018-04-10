webpackHotUpdate(0,{

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _messages = __webpack_require__(547);\n\nvar _messages2 = _interopRequireDefault(_messages);\n\nvar _Auth = __webpack_require__(22);\n\nvar _Auth2 = _interopRequireDefault(_Auth);\n\nvar _AutoSuggest = __webpack_require__(549);\n\nvar _AutoSuggest2 = _interopRequireDefault(_AutoSuggest);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ChatCell = function (_React$Component) {\n  _inherits(ChatCell, _React$Component);\n\n  function ChatCell(props) {\n    _classCallCheck(this, ChatCell);\n\n    var _this = _possibleConstructorReturn(this, (ChatCell.__proto__ || Object.getPrototypeOf(ChatCell)).call(this, props));\n\n    _this.state = {\n      users: [],\n      message_objects: [],\n      message: '',\n      recipient: '',\n      check: null\n    };\n\n    _this.socket = _this.props.socket;\n    var msg_status = 'message-read';\n\n    _this.socket.on('refresh messages', function (conversation) {\n      _this.setState({ message_objects: conversation.message_objects });\n      _this.socket.emit('got message', msg_status);\n    });\n\n    _this.socket.on('message sent', function (conv_user_id) {\n      var message_element = document.getElementsByClassName('message')[-1];\n      var element_className = message_element.className + (' ' + msg_status);\n      message_element.setAttribute('class', element_className);\n    });\n\n    _this.sendHandler = _this.sendHandler.bind(_this);\n    _this.addMessageObj = _this.addMessageObj.bind(_this);\n    _this.textHandler = _this.textHandler.bind(_this);\n    _this.socketCatcher = _this.socketCatcher.bind(_this);\n    _this.persistMessage = _this.persistMessage.bind(_this);\n    _this.startNewHandler = _this.startNewHandler.bind(_this);\n    _this.recipCatcher = _this.recipCatcher.bind(_this);\n    return _this;\n  }\n\n  _createClass(ChatCell, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      var user_id = this.props.current_user._id;\n      if (this.state.message_objects.length == 0) {\n        if (this.props.current_convo != 'no-convo' && this.props.current_convo != 'conv-list-new-message') {\n          var convo_id = this.props.current_convo;\n          var url = 'http://localhost:3000/chat/users/' + user_id + '/conversations/' + convo_id;\n          fetch(url, {\n            method: 'GET',\n            headers: {\n              Authorization: 'bearer ' + _Auth2.default.getToken()\n            }\n          }).then(function (response) {\n            return response.json();\n          }).then(function (response) {\n            if (response.conversation) {\n              console.log(response);\n              _this2.setState({ message_objects: response.conversation });\n            } else if (response.message) {\n              console.log(response.message);\n              _this2.setState({ response_msg: response.message });\n            }\n          }).catch(function (err) {\n            console.log(err);\n          });\n        }\n      }\n    }\n  }, {\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      var _this3 = this;\n\n      var users_url = 'http://localhost:3000/api/users';\n      fetch(users_url, {\n        method: 'GET',\n        headers: {\n          Authorization: 'bearer ' + _Auth2.default.getToken()\n        }\n      }).then(function (response) {\n        return response.json();\n      }).then(function (response) {\n        _this3.setState({ users: response.users });\n      }).catch(function (err) {\n        console.log(err);\n      });\n    }\n  }, {\n    key: 'componentWillUnmount',\n    value: function componentWillUnmount() {\n      var user_id = this.props.current_user._id;\n      var convo_id = this.props.current_convo;\n      if (this.state.message_objects.length != 0) {\n        var load = this.state.message_objects;\n        load = JSON.stringify(load);\n\n        var url = 'http://localhost:3000/chat/users/' + user_id + '/conversations/' + convo_id;\n        fetch(url, {\n          method: 'PATCH',\n          headers: {\n            'Content-Type': \"application/json\",\n            Authorization: 'bearer ' + _Auth2.default.getToken()\n          },\n          body: load\n        }).then(function (response) {\n          console.log(response);\n        }).catch(function (err) {\n          console.log(err);\n        });\n      }\n    }\n  }, {\n    key: 'recipCatcher',\n    value: function recipCatcher(value) {\n      this.setState({ recipient: value });\n    }\n  }, {\n    key: 'socketCatcher',\n    value: function socketCatcher(data) {\n      this.setState({ message_objects: data });\n    }\n  }, {\n    key: 'textHandler',\n    value: function textHandler(event) {\n      this.setState({ message: event.target.value });\n    }\n  }, {\n    key: 'sendHandler',\n    value: function sendHandler(event) {\n      event.preventDefault();\n      var messageObject = {\n        username: this.props.current_user.name,\n        composedMessage: this.state.message,\n        convo_id: this.props.current_convo\n      };\n      messageObject.fromMe = true;\n      this.persistMessage(messageObject);\n      this.addMessageObj(messageObject);\n      var convoObject = {\n        message_objects: this.state.message_objects,\n        convo_id: this.props.current_convo\n      };\n      this.props.socket.emit('new message', convoObject);\n      this.setState({ message: '' });\n    }\n  }, {\n    key: 'startNewHandler',\n    value: function startNewHandler(event) {\n      var _this4 = this;\n\n      event.preventDefault();\n      var messageObject = {\n        username: this.props.current_user.name,\n        composedMessage: this.state.message,\n        recipient: this.state.recipient\n      };\n      messageObject.fromMe = true;\n      this.addMessageObj(messageObject);\n      var convo_id = this.persistConvo(messageObject);\n      this.props.convoSetter(convo_id);\n      var convoObject = {\n        message_objects: this.state.message_objects,\n        convo_id: convo_id\n      };\n      this.props.socket.emit('enter conversation', convo_id);\n      this.props.socket.on('user joined', function (room_name) {\n        _this4.props.socket.emit('new message', convoObject);\n      });\n      this.setState({ message: '' });\n    }\n  }, {\n    key: 'persistConvo',\n    value: function persistConvo(obj) {\n      var user_id = this.props.current_user._id;\n      var convo_id = this.props.current_convo;\n      var url = 'http://localhost:3000/chat/users/' + user_id + '/conversations';\n      var obj = JSON.stringify(obj);\n      fetch(url, {\n        method: 'POST',\n        headers: {\n          'Content-Type': \"application/json\",\n          Authorization: 'bearer ' + _Auth2.default.getToken()\n        },\n        body: obj\n      }).then(function (response) {\n        console.log(response);\n        return response._id;\n      }).catch(function (err) {\n        console.log(response);\n      });\n    }\n  }, {\n    key: 'persistMessage',\n    value: function persistMessage(obj) {\n      var user_id = this.props.current_user._id;\n      var convo_id = this.props.current_convo;\n      var url = 'http://localhost:3000/chat/users/' + user_id + '/conversations/' + convo_id;\n      var obj = JSON.stringify(obj);\n      fetch(url, {\n        method: 'PATCH',\n        headers: {\n          'Content-Type': \"application/json\",\n          Authorization: 'bearer ' + _Auth2.default.getToken()\n        },\n        body: obj\n      }).then(function (res) {\n        console.log(res);\n      }).catch(function (err) {\n        console.log(err);\n      });\n    }\n  }, {\n    key: 'addMessageObj',\n    value: function addMessageObj(messageObj) {\n      this.setState({ message_objects: [].concat(_toConsumableArray(this.state.message_objects), [messageObj]) });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n\n      if (this.props.current_convo !== 'conv-list-new-message') {\n        return _react2.default.createElement(\n          'div',\n          { className: 'chatcell-container' },\n          _react2.default.createElement(\n            'div',\n            null,\n            _react2.default.createElement(_messages2.default, {\n              current_user: this.props.current_user,\n              message_objects: this.state.message_objects })\n          ),\n          _react2.default.createElement(\n            'div',\n            null,\n            _react2.default.createElement(\n              'form',\n              { className: 'chat-input', onSubmit: this.sendHandler },\n              _react2.default.createElement('input', { type: 'text',\n                onChange: this.textHandler,\n                value: this.state.message,\n                placeholder: '...message...'\n              })\n            )\n          )\n        );\n      } else {\n        return _react2.default.createElement(\n          'div',\n          { className: 'chatcell-container' },\n          _react2.default.createElement(\n            'div',\n            null,\n            _react2.default.createElement(_messages2.default, {\n              current_user: this.props.current_user,\n              message_objects: this.state.message_objects })\n          ),\n          _react2.default.createElement(\n            'div',\n            null,\n            _react2.default.createElement(\n              'form',\n              { className: 'chat-input', onSubmit: this.startNewHandler },\n              _react2.default.createElement('input', { type: 'text',\n                onChange: this.textHandler,\n                value: this.state.message,\n                placeholder: '...message...'\n              }),\n              _react2.default.createElement(_AutoSuggest2.default, {\n                recipCatcher: this.recipCatcher,\n                users: this.state.users,\n                current_user: this.props.current_user,\n                current_convo: this.props.current_convo\n              }),\n              _react2.default.createElement(\n                'button',\n                { type: 'submit' },\n                ' Submit'\n              )\n            )\n          )\n        );\n      }\n    }\n  }]);\n\n  return ChatCell;\n}(_react2.default.Component);\n\nvar _default = ChatCell;\nexports.default = _default;\n;\n\nvar _temp = function () {\n  if (typeof __REACT_HOT_LOADER__ === 'undefined') {\n    return;\n  }\n\n  __REACT_HOT_LOADER__.register(ChatCell, 'ChatCell', '/Users/johnmauran/Challenges/webpack3_react/app/components/chat/chatCell.js');\n\n  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/johnmauran/Challenges/webpack3_react/app/components/chat/chatCell.js');\n}();\n\n;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTQ2LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL2NoYXQvY2hhdENlbGwuanM/MTE0NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE1lc3NhZ2VzIGZyb20gJy4vbWVzc2FnZXMnO1xuaW1wb3J0IEF1dGggZnJvbSAnLi4vLi4vbW9kdWxlcy9BdXRoJztcbmltcG9ydCBBdXRvc3VnZ2VzdG9yIGZyb20gJy4vQXV0b1N1Z2dlc3QnO1xuXG5cbmNsYXNzIENoYXRDZWxsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdXNlcnM6IFtdLFxuICAgICAgbWVzc2FnZV9vYmplY3RzOiBbXSxcbiAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgcmVjaXBpZW50OiAnJyxcbiAgICAgIGNoZWNrOiBudWxsXG4gICAgfVxuXG4gICAgdGhpcy5zb2NrZXQgPSB0aGlzLnByb3BzLnNvY2tldDtcbiAgICB2YXIgbXNnX3N0YXR1cyA9ICdtZXNzYWdlLXJlYWQnXG5cbiAgICB0aGlzLnNvY2tldC5vbigncmVmcmVzaCBtZXNzYWdlcycsIChjb252ZXJzYXRpb24pID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBtZXNzYWdlX29iamVjdHM6IGNvbnZlcnNhdGlvbi5tZXNzYWdlX29iamVjdHMgfSlcbiAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2dvdCBtZXNzYWdlJywgKG1zZ19zdGF0dXMpKVxuICAgIH0pXG5cbiAgICB0aGlzLnNvY2tldC5vbignbWVzc2FnZSBzZW50JywgKGNvbnZfdXNlcl9pZCkgPT4ge1xuICAgICAgdmFyIG1lc3NhZ2VfZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lc3NhZ2UnKVstMV1cbiAgICAgIHZhciBlbGVtZW50X2NsYXNzTmFtZSA9IG1lc3NhZ2VfZWxlbWVudC5jbGFzc05hbWUgKyBgICR7bXNnX3N0YXR1c31gXG4gICAgICBtZXNzYWdlX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIGVsZW1lbnRfY2xhc3NOYW1lKVxuICAgIH0pXG5cbiAgICB0aGlzLnNlbmRIYW5kbGVyID0gdGhpcy5zZW5kSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYWRkTWVzc2FnZU9iaiA9IHRoaXMuYWRkTWVzc2FnZU9iai5iaW5kKHRoaXMpO1xuICAgIHRoaXMudGV4dEhhbmRsZXIgPSB0aGlzLnRleHRIYW5kbGVyLmJpbmQodGhpcylcbiAgICB0aGlzLnNvY2tldENhdGNoZXIgPSB0aGlzLnNvY2tldENhdGNoZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnBlcnNpc3RNZXNzYWdlID0gdGhpcy5wZXJzaXN0TWVzc2FnZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhcnROZXdIYW5kbGVyID0gdGhpcy5zdGFydE5ld0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnJlY2lwQ2F0Y2hlciA9IHRoaXMucmVjaXBDYXRjaGVyLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgIHZhciB1c2VyX2lkID0gdGhpcy5wcm9wcy5jdXJyZW50X3VzZXIuX2lkXG4gICAgaWYodGhpcy5zdGF0ZS5tZXNzYWdlX29iamVjdHMubGVuZ3RoID09IDApe1xuICAgICAgaWYodGhpcy5wcm9wcy5jdXJyZW50X2NvbnZvICE9ICduby1jb252bycgJiYgdGhpcy5wcm9wcy5jdXJyZW50X2NvbnZvICE9ICdjb252LWxpc3QtbmV3LW1lc3NhZ2UnKXtcbiAgICAgICAgdmFyIGNvbnZvX2lkID0gdGhpcy5wcm9wcy5jdXJyZW50X2NvbnZvXG4gICAgICAgIHZhciB1cmwgPSBgaHR0cDovL2xvY2FsaG9zdDozMDAwL2NoYXQvdXNlcnMvJHt1c2VyX2lkfS9jb252ZXJzYXRpb25zLyR7Y29udm9faWR9YFxuICAgICAgICBmZXRjaCh1cmwsIHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBiZWFyZXIgJHtBdXRoLmdldFRva2VuKCl9YFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZihyZXNwb25zZS5jb252ZXJzYXRpb24pe1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbWVzc2FnZV9vYmplY3RzOiByZXNwb25zZS5jb252ZXJzYXRpb24gfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UubWVzc2FnZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UubWVzc2FnZSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyByZXNwb25zZV9tc2c6IHJlc3BvbnNlLm1lc3NhZ2UgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgIGxldCB1c2Vyc191cmwgPSBgaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS91c2Vyc2BcbiAgICBmZXRjaCh1c2Vyc191cmwsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBiZWFyZXIgJHtBdXRoLmdldFRva2VuKCl9YFxuICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVzZXJzOiByZXNwb25zZS51c2VycyB9KVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICB9KVxuICB9XG5cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgIHZhciB1c2VyX2lkID0gdGhpcy5wcm9wcy5jdXJyZW50X3VzZXIuX2lkXG4gICAgdmFyIGNvbnZvX2lkID0gdGhpcy5wcm9wcy5jdXJyZW50X2NvbnZvXG4gICAgaWYodGhpcy5zdGF0ZS5tZXNzYWdlX29iamVjdHMubGVuZ3RoICE9IDApe1xuICAgICAgdmFyIGxvYWQgPSB0aGlzLnN0YXRlLm1lc3NhZ2Vfb2JqZWN0c1xuICAgICAgbG9hZCA9IEpTT04uc3RyaW5naWZ5KGxvYWQpXG5cbiAgICAgIHZhciB1cmwgPSBgaHR0cDovL2xvY2FsaG9zdDozMDAwL2NoYXQvdXNlcnMvJHt1c2VyX2lkfS9jb252ZXJzYXRpb25zLyR7Y29udm9faWR9YFxuICAgICAgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICBBdXRob3JpemF0aW9uOiBgYmVhcmVyICR7QXV0aC5nZXRUb2tlbigpfWBcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogbG9hZFxuICAgICAgfSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJlY2lwQ2F0Y2hlcih2YWx1ZSl7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHJlY2lwaWVudDogdmFsdWUgfSlcbiAgfVxuXG4gIHNvY2tldENhdGNoZXIoZGF0YSl7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG1lc3NhZ2Vfb2JqZWN0czogZGF0YSB9KVxuICB9XG5cbiAgdGV4dEhhbmRsZXIoZXZlbnQpe1xuICAgIHRoaXMuc2V0U3RhdGUoeyBtZXNzYWdlOiBldmVudC50YXJnZXQudmFsdWV9KVxuICB9XG5cblxuICBzZW5kSGFuZGxlcihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBtZXNzYWdlT2JqZWN0ID0ge1xuICAgICAgdXNlcm5hbWU6IHRoaXMucHJvcHMuY3VycmVudF91c2VyLm5hbWUsXG4gICAgICBjb21wb3NlZE1lc3NhZ2U6IHRoaXMuc3RhdGUubWVzc2FnZSxcbiAgICAgIGNvbnZvX2lkOiB0aGlzLnByb3BzLmN1cnJlbnRfY29udm9cbiAgICB9XG4gICAgbWVzc2FnZU9iamVjdC5mcm9tTWUgPSB0cnVlO1xuICAgIHRoaXMucGVyc2lzdE1lc3NhZ2UobWVzc2FnZU9iamVjdClcbiAgICB0aGlzLmFkZE1lc3NhZ2VPYmoobWVzc2FnZU9iamVjdClcbiAgICBjb25zdCBjb252b09iamVjdCA9IHtcbiAgICAgIG1lc3NhZ2Vfb2JqZWN0czogdGhpcy5zdGF0ZS5tZXNzYWdlX29iamVjdHMsXG4gICAgICBjb252b19pZDogdGhpcy5wcm9wcy5jdXJyZW50X2NvbnZvLFxuICAgIH1cbiAgICB0aGlzLnByb3BzLnNvY2tldC5lbWl0KCduZXcgbWVzc2FnZScsIGNvbnZvT2JqZWN0KVxuICAgIHRoaXMuc2V0U3RhdGUoeyBtZXNzYWdlOiAnJ30pXG4gIH1cblxuICBzdGFydE5ld0hhbmRsZXIoZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgbWVzc2FnZU9iamVjdCA9IHtcbiAgICAgIHVzZXJuYW1lOiB0aGlzLnByb3BzLmN1cnJlbnRfdXNlci5uYW1lLFxuICAgICAgY29tcG9zZWRNZXNzYWdlOiB0aGlzLnN0YXRlLm1lc3NhZ2UsXG4gICAgICByZWNpcGllbnQ6IHRoaXMuc3RhdGUucmVjaXBpZW50LFxuICAgIH1cbiAgICBtZXNzYWdlT2JqZWN0LmZyb21NZSA9IHRydWU7XG4gICAgdGhpcy5hZGRNZXNzYWdlT2JqKG1lc3NhZ2VPYmplY3QpXG4gICAgdmFyIGNvbnZvX2lkID0gdGhpcy5wZXJzaXN0Q29udm8obWVzc2FnZU9iamVjdCk7XG4gICAgdGhpcy5wcm9wcy5jb252b1NldHRlcihjb252b19pZClcbiAgICBjb25zdCBjb252b09iamVjdCA9IHtcbiAgICAgIG1lc3NhZ2Vfb2JqZWN0czogdGhpcy5zdGF0ZS5tZXNzYWdlX29iamVjdHMsXG4gICAgICBjb252b19pZDogY29udm9faWRcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5zb2NrZXQuZW1pdCgnZW50ZXIgY29udmVyc2F0aW9uJywgY29udm9faWQpXG4gICAgdGhpcy5wcm9wcy5zb2NrZXQub24oJ3VzZXIgam9pbmVkJywgKHJvb21fbmFtZSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5zb2NrZXQuZW1pdCgnbmV3IG1lc3NhZ2UnLCBjb252b09iamVjdClcbiAgICB9KVxuICAgIHRoaXMuc2V0U3RhdGUoeyBtZXNzYWdlOiAnJyB9KVxuICB9XG5cbiAgcGVyc2lzdENvbnZvKG9iail7XG4gICAgdmFyIHVzZXJfaWQgPSB0aGlzLnByb3BzLmN1cnJlbnRfdXNlci5faWRcbiAgICB2YXIgY29udm9faWQgPSB0aGlzLnByb3BzLmN1cnJlbnRfY29udm9cbiAgICB2YXIgdXJsID0gYGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9jaGF0L3VzZXJzLyR7dXNlcl9pZH0vY29udmVyc2F0aW9uc2BcbiAgICB2YXIgb2JqID0gSlNPTi5zdHJpbmdpZnkob2JqKVxuICAgIGZldGNoKHVybCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYGJlYXJlciAke0F1dGguZ2V0VG9rZW4oKX1gXG4gICAgICB9LFxuICAgICAgYm9keTogb2JqXG4gICAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgcmV0dXJuIHJlc3BvbnNlLl9pZFxuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgIH0pXG4gIH1cblxuICBwZXJzaXN0TWVzc2FnZShvYmope1xuICAgIHZhciB1c2VyX2lkID0gdGhpcy5wcm9wcy5jdXJyZW50X3VzZXIuX2lkXG4gICAgdmFyIGNvbnZvX2lkID0gdGhpcy5wcm9wcy5jdXJyZW50X2NvbnZvXG4gICAgdmFyIHVybCA9IGBodHRwOi8vbG9jYWxob3N0OjMwMDAvY2hhdC91c2Vycy8ke3VzZXJfaWR9L2NvbnZlcnNhdGlvbnMvJHtjb252b19pZH1gXG4gICAgdmFyIG9iaiA9IEpTT04uc3RyaW5naWZ5KG9iailcbiAgICBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgYmVhcmVyICR7QXV0aC5nZXRUb2tlbigpfWBcbiAgICAgIH0sXG4gICAgICBib2R5OiBvYmpcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgfSlcbiAgfVxuXG4gIGFkZE1lc3NhZ2VPYmoobWVzc2FnZU9iail7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG1lc3NhZ2Vfb2JqZWN0czogWy4uLnRoaXMuc3RhdGUubWVzc2FnZV9vYmplY3RzLCBtZXNzYWdlT2JqXSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpe1xuXG4gICAgaWYodGhpcy5wcm9wcy5jdXJyZW50X2NvbnZvICE9PSAnY29udi1saXN0LW5ldy1tZXNzYWdlJyl7XG4gICAgICByZXR1cm4oXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhdGNlbGwtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxNZXNzYWdlc1xuICAgICAgICAgICAgY3VycmVudF91c2VyPXt0aGlzLnByb3BzLmN1cnJlbnRfdXNlcn1cbiAgICAgICAgICAgIG1lc3NhZ2Vfb2JqZWN0cz17dGhpcy5zdGF0ZS5tZXNzYWdlX29iamVjdHN9Lz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiY2hhdC1pbnB1dFwiIG9uU3VibWl0PXt0aGlzLnNlbmRIYW5kbGVyfT5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMudGV4dEhhbmRsZXJ9XG4gICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLm1lc3NhZ2V9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiLi4ubWVzc2FnZS4uLlwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybihcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGF0Y2VsbC1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPE1lc3NhZ2VzXG4gICAgICAgICAgICBjdXJyZW50X3VzZXI9e3RoaXMucHJvcHMuY3VycmVudF91c2VyfVxuICAgICAgICAgICAgbWVzc2FnZV9vYmplY3RzPXt0aGlzLnN0YXRlLm1lc3NhZ2Vfb2JqZWN0c30vPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJjaGF0LWlucHV0XCIgb25TdWJtaXQ9e3RoaXMuc3RhcnROZXdIYW5kbGVyfT5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMudGV4dEhhbmRsZXJ9XG4gICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLm1lc3NhZ2V9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiLi4ubWVzc2FnZS4uLlwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxBdXRvc3VnZ2VzdG9yXG4gICAgICAgICAgICAgICAgcmVjaXBDYXRjaGVyPXt0aGlzLnJlY2lwQ2F0Y2hlcn1cbiAgICAgICAgICAgICAgICB1c2Vycz17dGhpcy5zdGF0ZS51c2Vyc31cbiAgICAgICAgICAgICAgICBjdXJyZW50X3VzZXI9e3RoaXMucHJvcHMuY3VycmVudF91c2VyfVxuICAgICAgICAgICAgICAgIGN1cnJlbnRfY29udm89e3RoaXMucHJvcHMuY3VycmVudF9jb252b31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+IFN1Ym1pdDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdENlbGw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gYXBwL2NvbXBvbmVudHMvY2hhdC9jaGF0Q2VsbC5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBRUE7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL0JBO0FBZ0NBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQU5BO0FBU0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFOQTtBQVNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBTkE7QUFTQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQURBO0FBREE7QUFOQTtBQWlCQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFaQTtBQURBO0FBTkE7QUF3QkE7QUFDQTs7OztBQWxRQTtBQUNBO0FBb1FBOzs7Ozs7Ozs7QUFyUUE7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///546\n");

/***/ })

})