webpackHotUpdate(0,{

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Auth = __webpack_require__(18);\n\nvar _Auth2 = _interopRequireDefault(_Auth);\n\nvar _Fetch = __webpack_require__(27);\n\nvar _Fetch2 = _interopRequireDefault(_Fetch);\n\nvar _Convert = __webpack_require__(26);\n\nvar _Convert2 = _interopRequireDefault(_Convert);\n\nvar _NewProjectPage = __webpack_require__(524);\n\nvar _NewProjectPage2 = _interopRequireDefault(_NewProjectPage);\n\nvar _ProjectListPage = __webpack_require__(529);\n\nvar _ProjectListPage2 = _interopRequireDefault(_ProjectListPage);\n\nvar _ChatContainer = __webpack_require__(530);\n\nvar _ChatContainer2 = _interopRequireDefault(_ChatContainer);\n\nvar _propTypes = __webpack_require__(1);\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Dashboard = function (_React$Component) {\n  _inherits(Dashboard, _React$Component);\n\n  function Dashboard(props) {\n    _classCallCheck(this, Dashboard);\n\n    var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props));\n\n    _this.state = {\n      current_user: {},\n      component: '',\n      notiTally: 0,\n      hamburgerShow: false,\n      searchquery: '',\n      searchProReturns: null,\n      searchUsrReturns: null,\n      searchMode: 'projects'\n    };\n\n    _this.handleFeatureClick = _this.handleFeatureClick.bind(_this);\n    _this.notiTallyUpdater = _this.notiTallyUpdater.bind(_this);\n    _this.handleHamburger = _this.handleHamburger.bind(_this);\n    _this.handleSearchBar = _this.handleSearchBar.bind(_this);\n    _this.submitSearch = _this.submitSearch.bind(_this);\n    _this.searchModeChange = _this.searchModeChange.bind(_this);\n    _this.clearSearch = _this.clearSearch.bind(_this);\n\n    _this.getCurrentUser = _Fetch2.default.GetCurrentUser.bind(_this);\n    _this.searchProjectsFetch = _Fetch2.default.searchProjects.bind(_this);\n    _this.searchUsersFetch = _Fetch2.default.searchUsers.bind(_this);\n    return _this;\n  }\n\n  _createClass(Dashboard, [{\n    key: 'handleSearchBar',\n    value: function handleSearchBar(event) {\n      this.setState({ searchquery: event.target.value });\n    }\n  }, {\n    key: 'submitSearch',\n    value: function submitSearch(event) {\n      event.preventDefault();\n      if (this.state.searchMode == 'projects') {\n        this.searchProjectsFetch(this.state.searchquery);\n      } else if (this.state.searchMode == 'users') {\n        this.searchUsersFetch(this.state.searchquery);\n      }\n      this.clearSearch();\n    }\n  }, {\n    key: 'clearSearch',\n    value: function clearSearch() {\n      this.setState({ searchquery: '' });\n    }\n  }, {\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      this.getCurrentUser().then(function (response) {\n        _this2.setState({ current_user: response });\n      }).catch(function (err) {\n        console.log(err);\n      });\n    }\n  }, {\n    key: 'handleFeatureClick',\n    value: function handleFeatureClick(event) {\n      if (this.state.component != event.target.name) {\n        this.setState({ component: event.target.name });\n      } else {\n        this.setState({ component: '' });\n      }\n    }\n  }, {\n    key: 'handleHamburger',\n    value: function handleHamburger() {\n      this.setState({ hamburgerShow: !this.state.hamburgerShow });\n    }\n  }, {\n    key: 'notiTallyUpdater',\n    value: function notiTallyUpdater(num) {\n      this.setState({ notiTally: num });\n    }\n  }, {\n    key: 'searchModeChange',\n    value: function searchModeChange(event) {\n      this.setState({ searchMode: event.target.value });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this3 = this;\n\n      ///////////////////////////////////////////////////////\n      //// handle the error / returns and rendering of search results\n      //// for the projects search\n      if (!this.state.hamburgerShow) {\n        var centerSideStyle = {};\n      } else {\n        var centerSideStyle = { paddingLeft: '18vw' };\n      }\n      var srchBannerStyle = { display: 'none' };\n      if (!_Convert2.default.isArrEmpty(this.state.searchProReturns)) {\n        if (this.state.searchProReturns.length && this.state.searchProReturns.length > 0) {\n          var srchBannerStyle = {};\n          if (this.state.searchProReturns instanceof Array) {\n            var searchStyle = {\n              backgroundColor: 'lightgrey',\n              border: '1px solid black'\n            };\n            var searchText = this.state.searchProReturns.map(function (result, i) {\n              var u_name = _this3.state.current_user.name;\n              if (u_name == result.ownername || _Convert2.default.isInArr(u_name, result.usernames)) {\n                var url = '/project/' + result._id;\n              } else {\n                var url = '/project/' + result._id + '/read';\n              }\n              var date = _Convert2.default.prettifyDate(result.createdAt);\n              return _react2.default.createElement(\n                'li',\n                {\n                  className: 'search-result-tile',\n                  key: i,\n                  style: searchStyle\n                },\n                _react2.default.createElement(\n                  'a',\n                  { href: url, className: 'search-result-title' },\n                  ' ',\n                  result.title\n                ),\n                _react2.default.createElement(\n                  'span',\n                  { className: 'search-result-description' },\n                  ' ',\n                  result.description,\n                  ' '\n                ),\n                _react2.default.createElement(\n                  'span',\n                  { className: 'search-result-owner' },\n                  ' ',\n                  result.ownername,\n                  ' '\n                ),\n                _react2.default.createElement(\n                  'span',\n                  { className: 'search-result-date' },\n                  ' ',\n                  date,\n                  ' '\n                )\n              );\n            });\n          } else if (typeof this.state.searchProReturns === 'string') {\n            var searchStyle = {};\n            var searchText = _react2.default.createElement(\n              'li',\n              { className: 'search-result-tile', id: 'search-error-tile', key: 0, style: searchStyle },\n              ' ...',\n              this.state.searchProReturns,\n              '... '\n            );\n          }\n        } else {\n          var srchBannerStyle = {\n            display: 'none'\n          };\n        }\n      }\n      if (!_Convert2.default.isArrEmpty(this.state.searchUsrReturns)) {\n        var searchStyle = {\n          backgroundColor: 'lightgrey',\n          border: '1px solid black'\n        };\n        if (this.state.searchUsrReturns instanceof Array) {\n          var searchText = this.state.searchUsrReturns.map(function (user, i) {\n            var date = _Convert2.default.prettifyDate(user.createdAt);\n            var url = '/profile/' + user._id;\n            var about = user.about.replace(/<(?:.|\\n)*?>/gm, '');\n            return _react2.default.createElement(\n              'li',\n              {\n                className: 'search-result-tile',\n                key: i,\n                style: searchStyle\n              },\n              _react2.default.createElement(\n                'a',\n                { href: url, className: 'search-result-title' },\n                ' ',\n                user.name\n              ),\n              _react2.default.createElement(\n                'span',\n                { className: 'search-result-description' },\n                ' ',\n                about,\n                ' '\n              ),\n              _react2.default.createElement(\n                'span',\n                { className: 'search-result-date' },\n                ' Joined at: ',\n                date,\n                ' '\n              )\n            );\n          });\n        } else if (typeof this.state.searchUsrReturns === 'string') {\n          var searchStyle = {};\n          var searchText = _react2.default.createElement(\n            'li',\n            { className: 'search-result-tile', id: 'search-error-tile', key: 0, style: searchStyle },\n            ' ...',\n            this.state.searchUsrReturns,\n            '...'\n          );\n        }\n      }\n\n      ///////////////////////////////////////////////////////\n      //// This handles the logic for selecting features\n      //// to show, from the menu on the left of screen\n      if (this.state.hamburgerShow) {\n        var _hambStyle;\n\n        var hambStyle = (_hambStyle = {\n          display: 'block',\n          position: 'absolute',\n          zIndex: '5',\n          left: '0'\n        }, _defineProperty(_hambStyle, 'display', 'inline-block'), _defineProperty(_hambStyle, 'width', '18vw'), _defineProperty(_hambStyle, 'height', '100%'), _defineProperty(_hambStyle, 'borderRight', '1px solid black'), _defineProperty(_hambStyle, 'padding', '25px 10px'), _hambStyle);\n      } else {\n        var hambStyle = {\n          display: 'none'\n        };\n      }\n      var featSwitcher = function featSwitcher() {\n        if (_this3.state.component == 'new_project') {\n          return _react2.default.createElement(\n            'div',\n            null,\n            _react2.default.createElement(_NewProjectPage2.default, null)\n          );\n        }\n        if (_this3.state.component == 'my_projects') {\n          return _react2.default.createElement(\n            'div',\n            null,\n            _react2.default.createElement(_ProjectListPage2.default, null)\n          );\n        }\n        if (_this3.state.component == 'chat') {\n          _react2.default.createElement(\n            'div',\n            null,\n            _react2.default.createElement(_ChatContainer2.default, null)\n          );\n        }\n      };\n\n      if (this.state.searchProReturns == null && this.state.searchUsrReturns == null) {\n        var srchContainerStyle = {\n          display: 'none'\n        };\n      } else {\n        var srchContainerStyle = {};\n      }\n      /// this handles the unread msgs notifications\n      if (this.state.notiTally > 0) {\n        var parStyle = {\n          position: 'relative',\n          zIndex: '1'\n        };\n        var notiStyle = {\n          position: 'absolute',\n          color: 'white',\n          zIndex: '2',\n          right: '10px',\n          top: '5px',\n          paddingLeft: '8px',\n          height: '25px',\n          width: '25px',\n          backgroundColor: 'red',\n          borderRadius: '50%',\n          display: 'inline-block'\n        };\n        var btnStyle = {\n          paddingRight: '50px'\n\n        };\n        var notiMsg = this.state.notiTally;\n      } else {\n        var notiMsg = '';\n        var notiStyle = {\n          display: 'none'\n        };\n      }\n\n      return _react2.default.createElement(\n        'div',\n        { className: 'dash-container' },\n        _react2.default.createElement(\n          'div',\n          { className: 'dash-banner' },\n          _react2.default.createElement(\n            'div',\n            { className: 'hamburger', onClick: this.handleHamburger },\n            _react2.default.createElement('div', null),\n            _react2.default.createElement('div', null),\n            _react2.default.createElement('div', null)\n          ),\n          _react2.default.createElement(\n            'span',\n            null,\n            ' Nquest '\n          ),\n          _react2.default.createElement(\n            'form',\n            { onSubmit: this.submitSearch, className: 'dash-banner-searchbar' },\n            _react2.default.createElement('input', {\n              type: 'text',\n              placeholder: '...search...',\n              onChange: this.handleSearchBar,\n              value: this.state.searchquery\n            }),\n            _react2.default.createElement(\n              'button',\n              { type: 'submit' },\n              _react2.default.createElement('img', { src: 'assets/images/icons8-search.png', height: '32px', width: '32px' })\n            ),\n            _react2.default.createElement(\n              'select',\n              { className: 'search-selector', onChange: this.searchModeChange, value: this.state.searchMode },\n              _react2.default.createElement(\n                'option',\n                { value: 'projects' },\n                'Projects'\n              ),\n              _react2.default.createElement(\n                'option',\n                { value: 'users' },\n                'Users'\n              )\n            )\n          )\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'dash-body' },\n          _react2.default.createElement(\n            'div',\n            { className: 'dash-slideshow' },\n            _react2.default.createElement(\n              'div',\n              { className: 'dash-slideshow-images dash-first-img' },\n              _react2.default.createElement('img', { src: '/assets/images/WRLD-EPS-01-0008.png' })\n            ),\n            _react2.default.createElement(\n              'div',\n              { className: 'dash-slideshow-images' },\n              _react2.default.createElement('img', { src: '/assets/images/WRLD-EPS-01-0008.png' })\n            )\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'left-side-dash', style: hambStyle },\n            _react2.default.createElement(\n              'ul',\n              { className: 'feature-list' },\n              _react2.default.createElement(\n                'li',\n                null,\n                _react2.default.createElement(\n                  'button',\n                  {\n                    onClick: this.handleFeatureClick,\n                    name: 'new_project'\n                  },\n                  ' New Project '\n                )\n              ),\n              _react2.default.createElement(\n                'li',\n                null,\n                _react2.default.createElement(\n                  'button',\n                  {\n                    onClick: this.handleFeatureClick,\n                    name: 'my_projects'\n                  },\n                  ' My Projects '\n                )\n              ),\n              _react2.default.createElement(\n                'li',\n                { className: 'noti-ticker-parent', style: parStyle },\n                _react2.default.createElement(\n                  'button',\n                  { style: btnStyle,\n                    onClick: this.handleFeatureClick,\n                    name: 'chat'\n                  },\n                  ' Messenger'\n                ),\n                _react2.default.createElement(\n                  'span',\n                  { className: 'notification-ticker', style: notiStyle },\n                  notiMsg\n                )\n              )\n            )\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'center-side-dash', style: centerSideStyle },\n            _react2.default.createElement(\n              'div',\n              { className: 'search-results-container', style: srchContainerStyle },\n              _react2.default.createElement(\n                'h3',\n                { className: 'search-results-banner', style: srchBannerStyle },\n                'Search results: '\n              ),\n              _react2.default.createElement(\n                'div',\n                { className: 'search-results' },\n                _react2.default.createElement(\n                  'ul',\n                  null,\n                  searchText\n                )\n              )\n            ),\n            this.state.component == 'new_project' && _react2.default.createElement(_NewProjectPage2.default, {\n              owner_id: this.state.current_user._id,\n              owner_name: this.state.current_user.name\n            }),\n            this.state.component == 'my_projects' && _react2.default.createElement(_ProjectListPage2.default, {\n              url: this.state.current_user._id,\n              current_user: this.state.current_user\n            }),\n            this.state.component == 'chat' && _react2.default.createElement(_ChatContainer2.default, {\n              current_user: this.state.current_user,\n              notiTallyUpdater: this.notiTallyUpdater,\n              total_unread: this.state.notiTally\n            })\n          )\n        )\n      );\n    }\n  }]);\n\n  return Dashboard;\n}(_react2.default.Component);\n\nDashboard.contextTypes = {\n  router: _propTypes2.default.object.isRequired\n};\n\nvar _default = Dashboard;\nexports.default = _default;\n;\n\nvar _temp = function () {\n  if (typeof __REACT_HOT_LOADER__ === 'undefined') {\n    return;\n  }\n\n  __REACT_HOT_LOADER__.register(Dashboard, 'Dashboard', '/Users/johnmauran/Challenges/webpack3_react/app/components/Dashboard.js');\n\n  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/johnmauran/Challenges/webpack3_react/app/components/Dashboard.js');\n}();\n\n;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjQ0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL0Rhc2hib2FyZC5qcz8wNjYyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQXV0aCBmcm9tICcuLi9tb2R1bGVzL0F1dGgnO1xuaW1wb3J0IEZldGNoIGZyb20gJy4uL21vZHVsZXMvRmV0Y2gnO1xuaW1wb3J0IENvbnZlcnQgZnJvbSAnLi4vbW9kdWxlcy9Db252ZXJ0JztcbmltcG9ydCBOZXdQcm9qZWN0UGFnZSBmcm9tICcuLi9jb250YWluZXJzL05ld1Byb2plY3RQYWdlJztcbmltcG9ydCBQcm9qZWN0TGlzdFBhZ2UgZnJvbSAnLi4vY29udGFpbmVycy9Qcm9qZWN0TGlzdFBhZ2UnO1xuaW1wb3J0IENoYXRDb250YWluZXIgZnJvbSAnLi4vY29tcG9uZW50cy9jaGF0L0NoYXRDb250YWluZXInO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50X3VzZXI6IHt9LFxuICAgICAgY29tcG9uZW50OiAnJyxcbiAgICAgIG5vdGlUYWxseTogMCxcbiAgICAgIGhhbWJ1cmdlclNob3c6IGZhbHNlLFxuICAgICAgc2VhcmNocXVlcnk6ICcnLFxuICAgICAgc2VhcmNoUHJvUmV0dXJuczogbnVsbCxcbiAgICAgIHNlYXJjaFVzclJldHVybnM6IG51bGwsXG4gICAgICBzZWFyY2hNb2RlOiAncHJvamVjdHMnXG4gICAgfTtcblxuICAgIHRoaXMuaGFuZGxlRmVhdHVyZUNsaWNrID0gdGhpcy5oYW5kbGVGZWF0dXJlQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm5vdGlUYWxseVVwZGF0ZXIgPSB0aGlzLm5vdGlUYWxseVVwZGF0ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUhhbWJ1cmdlciA9IHRoaXMuaGFuZGxlSGFtYnVyZ2VyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTZWFyY2hCYXIgPSB0aGlzLmhhbmRsZVNlYXJjaEJhci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3VibWl0U2VhcmNoID0gdGhpcy5zdWJtaXRTZWFyY2guYmluZCh0aGlzKTtcbiAgICB0aGlzLnNlYXJjaE1vZGVDaGFuZ2UgPSB0aGlzLnNlYXJjaE1vZGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNsZWFyU2VhcmNoID0gdGhpcy5jbGVhclNlYXJjaC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5nZXRDdXJyZW50VXNlciA9IEZldGNoLkdldEN1cnJlbnRVc2VyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zZWFyY2hQcm9qZWN0c0ZldGNoID0gRmV0Y2guc2VhcmNoUHJvamVjdHMuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNlYXJjaFVzZXJzRmV0Y2ggPSBGZXRjaC5zZWFyY2hVc2Vycy5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlU2VhcmNoQmFyKGV2ZW50KXtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNocXVlcnk6IGV2ZW50LnRhcmdldC52YWx1ZX0pXG4gIH1cblxuICBzdWJtaXRTZWFyY2goZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYodGhpcy5zdGF0ZS5zZWFyY2hNb2RlID09ICdwcm9qZWN0cycpe1xuICAgICAgdGhpcy5zZWFyY2hQcm9qZWN0c0ZldGNoKHRoaXMuc3RhdGUuc2VhcmNocXVlcnkpXG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy5zdGF0ZS5zZWFyY2hNb2RlID09ICd1c2Vycycpe1xuICAgICAgdGhpcy5zZWFyY2hVc2Vyc0ZldGNoKHRoaXMuc3RhdGUuc2VhcmNocXVlcnkpXG4gICAgfVxuICAgIHRoaXMuY2xlYXJTZWFyY2goKTtcbiAgfVxuXG4gIGNsZWFyU2VhcmNoKCl7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaHF1ZXJ5OiAnJyB9KVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICB0aGlzLmdldEN1cnJlbnRVc2VyKClcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50X3VzZXI6IHJlc3BvbnNlIH0pXG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVGZWF0dXJlQ2xpY2soZXZlbnQpe1xuICAgIGlmKHRoaXMuc3RhdGUuY29tcG9uZW50ICE9IGV2ZW50LnRhcmdldC5uYW1lKXtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb21wb25lbnQ6IGV2ZW50LnRhcmdldC5uYW1lIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbXBvbmVudDogJycgfSlcbiAgICB9XG4gIH1cblxuICBoYW5kbGVIYW1idXJnZXIoKXtcbiAgICB0aGlzLnNldFN0YXRlKHsgaGFtYnVyZ2VyU2hvdzogIXRoaXMuc3RhdGUuaGFtYnVyZ2VyU2hvdyB9KVxuICB9XG5cbiAgbm90aVRhbGx5VXBkYXRlcihudW0pe1xuICAgIHRoaXMuc2V0U3RhdGUoeyBub3RpVGFsbHk6IG51bSB9KVxuICB9XG5cbiAgc2VhcmNoTW9kZUNoYW5nZShldmVudCl7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaE1vZGU6IGV2ZW50LnRhcmdldC52YWx1ZSB9KVxuICB9XG5cbiAgcmVuZGVyKCl7XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8vLyBoYW5kbGUgdGhlIGVycm9yIC8gcmV0dXJucyBhbmQgcmVuZGVyaW5nIG9mIHNlYXJjaCByZXN1bHRzXG4gICAgLy8vLyBmb3IgdGhlIHByb2plY3RzIHNlYXJjaFxuICAgIGlmKCF0aGlzLnN0YXRlLmhhbWJ1cmdlclNob3cpe1xuICAgICAgdmFyIGNlbnRlclNpZGVTdHlsZSA9IHsgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY2VudGVyU2lkZVN0eWxlID0geyBwYWRkaW5nTGVmdDogJzE4dncnIH1cbiAgICB9XG4gICAgdmFyIHNyY2hCYW5uZXJTdHlsZSA9IHsgZGlzcGxheTogJ25vbmUnIH1cbiAgICBpZighQ29udmVydC5pc0FyckVtcHR5KHRoaXMuc3RhdGUuc2VhcmNoUHJvUmV0dXJucykpe1xuICAgICAgaWYodGhpcy5zdGF0ZS5zZWFyY2hQcm9SZXR1cm5zLmxlbmd0aCAmJiB0aGlzLnN0YXRlLnNlYXJjaFByb1JldHVybnMubGVuZ3RoID4gMCl7XG4gICAgICAgIHZhciBzcmNoQmFubmVyU3R5bGUgPSB7XG5cbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnN0YXRlLnNlYXJjaFByb1JldHVybnMgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgdmFyIHNlYXJjaFN0eWxlID0ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnbGlnaHRncmV5JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBzZWFyY2hUZXh0ID0gdGhpcy5zdGF0ZS5zZWFyY2hQcm9SZXR1cm5zLm1hcCgocmVzdWx0LCBpKSA9PiB7XG4gICAgICAgICAgICB2YXIgdV9uYW1lID0gdGhpcy5zdGF0ZS5jdXJyZW50X3VzZXIubmFtZVxuICAgICAgICAgICAgaWYoIHVfbmFtZSA9PSByZXN1bHQub3duZXJuYW1lIHx8IENvbnZlcnQuaXNJbkFycih1X25hbWUsIHJlc3VsdC51c2VybmFtZXMpICl7XG4gICAgICAgICAgICAgIHZhciB1cmwgPSBgL3Byb2plY3QvJHtyZXN1bHQuX2lkfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgdXJsID0gYC9wcm9qZWN0LyR7cmVzdWx0Ll9pZH0vcmVhZGBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkYXRlID0gQ29udmVydC5wcmV0dGlmeURhdGUocmVzdWx0LmNyZWF0ZWRBdClcbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2VhcmNoLXJlc3VsdC10aWxlXCJcbiAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3NlYXJjaFN0eWxlfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj17dXJsfSBjbGFzc05hbWU9XCJzZWFyY2gtcmVzdWx0LXRpdGxlXCI+IHtyZXN1bHQudGl0bGV9PC9hPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNlYXJjaC1yZXN1bHQtZGVzY3JpcHRpb25cIj4ge3Jlc3VsdC5kZXNjcmlwdGlvbn0gPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNlYXJjaC1yZXN1bHQtb3duZXJcIj4ge3Jlc3VsdC5vd25lcm5hbWV9IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzZWFyY2gtcmVzdWx0LWRhdGVcIj4ge2RhdGV9IDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzLnN0YXRlLnNlYXJjaFByb1JldHVybnMgPT09ICdzdHJpbmcnICl7XG4gICAgICAgICAgdmFyIHNlYXJjaFN0eWxlID0ge1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgc2VhcmNoVGV4dCA9IDxsaSBjbGFzc05hbWU9XCJzZWFyY2gtcmVzdWx0LXRpbGVcIiBpZD1cInNlYXJjaC1lcnJvci10aWxlXCIga2V5PXswfSBzdHlsZT17c2VhcmNoU3R5bGV9PiAuLi57dGhpcy5zdGF0ZS5zZWFyY2hQcm9SZXR1cm5zfS4uLiA8L2xpPlxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIHNyY2hCYW5uZXJTdHlsZSA9IHtcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZighQ29udmVydC5pc0FyckVtcHR5KHRoaXMuc3RhdGUuc2VhcmNoVXNyUmV0dXJucykpe1xuICAgICAgdmFyIHNlYXJjaFN0eWxlID0ge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdsaWdodGdyZXknLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgfVxuICAgICAgaWYodGhpcy5zdGF0ZS5zZWFyY2hVc3JSZXR1cm5zIGluc3RhbmNlb2YgQXJyYXkpe1xuICAgICAgICB2YXIgc2VhcmNoVGV4dCA9IHRoaXMuc3RhdGUuc2VhcmNoVXNyUmV0dXJucy5tYXAoKHVzZXIsIGkpID0+IHtcbiAgICAgICAgICB2YXIgZGF0ZSA9IENvbnZlcnQucHJldHRpZnlEYXRlKHVzZXIuY3JlYXRlZEF0KVxuICAgICAgICAgIHZhciB1cmwgPSBgL3Byb2ZpbGUvJHt1c2VyLl9pZH1gXG4gICAgICAgICAgdmFyIGFib3V0ID0gdXNlci5hYm91dC5yZXBsYWNlKC88KD86LnxcXG4pKj8+L2dtLCAnJylcbiAgICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPSdzZWFyY2gtcmVzdWx0LXRpbGUnXG4gICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgc3R5bGU9e3NlYXJjaFN0eWxlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8YSBocmVmPXt1cmx9IGNsYXNzTmFtZT1cInNlYXJjaC1yZXN1bHQtdGl0bGVcIj4ge3VzZXIubmFtZX08L2E+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNlYXJjaC1yZXN1bHQtZGVzY3JpcHRpb25cIj4ge2Fib3V0fSA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNlYXJjaC1yZXN1bHQtZGF0ZVwiPiBKb2luZWQgYXQ6IHtkYXRlfSA8L3NwYW4+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzLnN0YXRlLnNlYXJjaFVzclJldHVybnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBzZWFyY2hTdHlsZSA9IHt9XG4gICAgICAgIHZhciBzZWFyY2hUZXh0ID0gPGxpIGNsYXNzTmFtZT1cInNlYXJjaC1yZXN1bHQtdGlsZVwiIGlkPVwic2VhcmNoLWVycm9yLXRpbGVcIiBrZXk9ezB9IHN0eWxlPXtzZWFyY2hTdHlsZX0+IC4uLnt0aGlzLnN0YXRlLnNlYXJjaFVzclJldHVybnN9Li4uPC9saT5cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8vLyBUaGlzIGhhbmRsZXMgdGhlIGxvZ2ljIGZvciBzZWxlY3RpbmcgZmVhdHVyZXNcbiAgICAvLy8vIHRvIHNob3csIGZyb20gdGhlIG1lbnUgb24gdGhlIGxlZnQgb2Ygc2NyZWVuXG4gICAgaWYodGhpcy5zdGF0ZS5oYW1idXJnZXJTaG93KXtcbiAgICAgIHZhciBoYW1iU3R5bGUgPSB7XG4gICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICB6SW5kZXg6ICc1JyxcbiAgICAgICAgbGVmdDogJzAnLFxuICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgd2lkdGg6ICcxOHZ3JyxcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIGJvcmRlclJpZ2h0OiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgcGFkZGluZzogJzI1cHggMTBweCcsXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIGhhbWJTdHlsZSA9IHtcbiAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICB9XG4gICAgfVxuICAgIHZhciBmZWF0U3dpdGNoZXIgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5jb21wb25lbnQgPT0gJ25ld19wcm9qZWN0Jyl7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPE5ld1Byb2plY3RQYWdlIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnN0YXRlLmNvbXBvbmVudCA9PSAnbXlfcHJvamVjdHMnKXtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8UHJvamVjdExpc3RQYWdlIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnN0YXRlLmNvbXBvbmVudCA9PSAnY2hhdCcpe1xuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxDaGF0Q29udGFpbmVyIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHRoaXMuc3RhdGUuc2VhcmNoUHJvUmV0dXJucyA9PSBudWxsICYmIHRoaXMuc3RhdGUuc2VhcmNoVXNyUmV0dXJucyA9PSBudWxsKXtcbiAgICAgIHZhciBzcmNoQ29udGFpbmVyU3R5bGUgPSB7XG4gICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBzcmNoQ29udGFpbmVyU3R5bGUgPSB7fVxuICAgIH1cbiAgICAvLy8gdGhpcyBoYW5kbGVzIHRoZSB1bnJlYWQgbXNncyBub3RpZmljYXRpb25zXG4gICAgaWYgKHRoaXMuc3RhdGUubm90aVRhbGx5ID4gMCl7XG4gICAgICB2YXIgcGFyU3R5bGUgPSB7XG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICB6SW5kZXg6ICcxJyxcbiAgICAgIH1cbiAgICAgIHZhciBub3RpU3R5bGUgPSB7XG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgekluZGV4OiAnMicsXG4gICAgICAgIHJpZ2h0OiAnMTBweCcsXG4gICAgICAgIHRvcDogJzVweCcsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAnOHB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMjVweCcsXG4gICAgICAgIHdpZHRoOiAnMjVweCcsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JlZCcsXG4gICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgfVxuICAgICAgdmFyIGJ0blN0eWxlID0ge1xuICAgICAgICBwYWRkaW5nUmlnaHQ6ICc1MHB4J1xuXG4gICAgICB9XG4gICAgICB2YXIgbm90aU1zZyA9IHRoaXMuc3RhdGUubm90aVRhbGx5XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5vdGlNc2cgPSAnJ1xuICAgICAgdmFyIG5vdGlTdHlsZSA9IHtcbiAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXNoLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhc2gtYmFubmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoYW1idXJnZXJcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUhhbWJ1cmdlcn0+XG4gICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4+IE5xdWVzdCA8L3NwYW4+XG4gICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuc3VibWl0U2VhcmNofSBjbGFzc05hbWU9XCJkYXNoLWJhbm5lci1zZWFyY2hiYXJcIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiLi4uc2VhcmNoLi4uXCJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VhcmNoQmFyfVxuICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hxdWVyeX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMvaW1hZ2VzL2ljb25zOC1zZWFyY2gucG5nXCIgaGVpZ2h0PSczMnB4JyB3aWR0aD0nMzJweCcvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cInNlYXJjaC1zZWxlY3RvclwiIG9uQ2hhbmdlPXt0aGlzLnNlYXJjaE1vZGVDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaE1vZGV9PlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicHJvamVjdHNcIj5Qcm9qZWN0czwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwidXNlcnNcIj5Vc2Vyczwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXNoLWJvZHlcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhc2gtc2xpZGVzaG93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhc2gtc2xpZGVzaG93LWltYWdlcyBkYXNoLWZpcnN0LWltZ1wiPlxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1hZ2VzL1dSTEQtRVBTLTAxLTAwMDgucG5nXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhc2gtc2xpZGVzaG93LWltYWdlc1wiPlxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1hZ2VzL1dSTEQtRVBTLTAxLTAwMDgucG5nXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWZ0LXNpZGUtZGFzaFwiIHN0eWxlPXtoYW1iU3R5bGV9PlxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImZlYXR1cmUtbGlzdFwiPlxuICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVGZWF0dXJlQ2xpY2t9XG4gICAgICAgICAgICAgICAgICBuYW1lPVwibmV3X3Byb2plY3RcIlxuICAgICAgICAgICAgICAgID4gTmV3IFByb2plY3QgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUZlYXR1cmVDbGlja31cbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJteV9wcm9qZWN0c1wiXG4gICAgICAgICAgICAgICAgPiBNeSBQcm9qZWN0cyA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5vdGktdGlja2VyLXBhcmVudFwiIHN0eWxlPXtwYXJTdHlsZX0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17YnRuU3R5bGV9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUZlYXR1cmVDbGlja31cbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJjaGF0XCJcbiAgICAgICAgICAgICAgICA+IE1lc3NlbmdlclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5vdGlmaWNhdGlvbi10aWNrZXJcIiBzdHlsZT17bm90aVN0eWxlfT5cbiAgICAgICAgICAgICAgICAgIHtub3RpTXNnfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXItc2lkZS1kYXNoXCIgc3R5bGU9e2NlbnRlclNpZGVTdHlsZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1yZXN1bHRzLWNvbnRhaW5lclwiIHN0eWxlPXtzcmNoQ29udGFpbmVyU3R5bGV9PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwic2VhcmNoLXJlc3VsdHMtYmFubmVyXCIgc3R5bGU9e3NyY2hCYW5uZXJTdHlsZX0+U2VhcmNoIHJlc3VsdHM6IDwvaDM+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLXJlc3VsdHNcIj5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICB7c2VhcmNoVGV4dH1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3RoaXMuc3RhdGUuY29tcG9uZW50ID09ICduZXdfcHJvamVjdCdcbiAgICAgICAgICAgICAgJiYgPE5ld1Byb2plY3RQYWdlXG4gICAgICAgICAgICAgICAgICBvd25lcl9pZD17dGhpcy5zdGF0ZS5jdXJyZW50X3VzZXIuX2lkfVxuICAgICAgICAgICAgICAgICAgb3duZXJfbmFtZT17dGhpcy5zdGF0ZS5jdXJyZW50X3VzZXIubmFtZX1cbiAgICAgICAgICAgICAgICAgLz59XG5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmNvbXBvbmVudCA9PSAnbXlfcHJvamVjdHMnXG4gICAgICAgICAgICAgJiYgPFByb2plY3RMaXN0UGFnZVxuICAgICAgICAgICAgICAgICB1cmw9e3RoaXMuc3RhdGUuY3VycmVudF91c2VyLl9pZH1cbiAgICAgICAgICAgICAgICAgY3VycmVudF91c2VyPXt0aGlzLnN0YXRlLmN1cnJlbnRfdXNlcn1cbiAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAge3RoaXMuc3RhdGUuY29tcG9uZW50ID09ICdjaGF0J1xuICAgICAgICAgICAgICYmIDxDaGF0Q29udGFpbmVyXG4gICAgICAgICAgICAgICAgY3VycmVudF91c2VyPXt0aGlzLnN0YXRlLmN1cnJlbnRfdXNlcn1cbiAgICAgICAgICAgICAgICBub3RpVGFsbHlVcGRhdGVyPXt0aGlzLm5vdGlUYWxseVVwZGF0ZXJ9XG4gICAgICAgICAgICAgICAgdG90YWxfdW5yZWFkPXt0aGlzLnN0YXRlLm5vdGlUYWxseX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbkRhc2hib2FyZC5jb250ZXh0VHlwZXMgPSB7XG4gIHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBhcHAvY29tcG9uZW50cy9EYXNoYm9hcmQuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF4QkE7QUF5QkE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVJBO0FBV0E7QUFDQTtBQUVBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUEE7QUFVQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVdBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBO0FBYUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFWQTtBQVBBO0FBdUJBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSkE7QUFRQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUFBO0FBREE7QUFNQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUFBO0FBREE7QUFNQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQU5BO0FBYkE7QUFEQTtBQTBCQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBRkE7QUFRQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBRUE7QUFDQTtBQUZBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQXZCQTtBQW5DQTtBQXhCQTtBQTRGQTs7OztBQW5WQTtBQUNBO0FBcVZBO0FBQ0E7QUFEQTtBQUNBO0FBSUE7Ozs7Ozs7OztBQTNWQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///244\n");

/***/ })

})