;(function() {

	if (typeof window.B === 'function')
	{
		return;
	}

(function (exports) {
    'use strict';

    var bTmp = window.B;
    window.B = {};

    if (bTmp) {
      Object.keys(bTmp).forEach(function (key) {
        window.B[key] = bTmp[key];
      });
    }

    exports = window.B;

    var Type = /*#__PURE__*/function () {
      function Type() {
        babelHelpers.classCallCheck(this, Type);
      }

      babelHelpers.createClass(Type, null, [{
        key: "isEmpty",
        value: function isEmpty(value) {
          if (this.isArray(value) || this.isString(value)) return value.length === 0;
          if (this.isNumber(value)) return value === 0;
          if (this.isBoolean(value)) return value === false;
          if (this.isObject(value)) return this.isEmpty(Object.getOwnPropertyNames(value));
          if (this.isNil(value)) return true;
          return false;
        }
      }, {
        key: "isString",
        value: function isString(value) {
          return typeof value === 'string';
        }
      }, {
        key: "isSymbol",
        value: function isSymbol(value) {
          var type = babelHelpers.typeof(value);
          return type == 'symbol' || type === 'object' && value != null && Object.prototype.toString.call(value) == '[object Symbol]';
        }
      }, {
        key: "toString",
        value: function toString(value) {
          var _this = this;

          if (this.isString(value)) return value;
          if (this.isNil(value) || this.isObject(value)) return '';
          if (this.isBoolean(value)) return !!value ? '1' : '';

          if (this.isArray(value)) {
            return "".concat(value.map(function (other) {
              return other == null ? other : _this.toString(other);
            }));
          }

          if (this.isSymbol(value)) return value.toString();
          var result = "".concat(value);
          return result == '0' && 1 / value == -(1 / 0) ? '-0' : result;
        }
      }, {
        key: "isFunction",
        value: function isFunction(value) {
          return typeof value === 'function';
        }
      }, {
        key: "isObject",
        value: function isObject(value) {
          return !!value && (babelHelpers.typeof(value) === 'object' || typeof value === 'function');
        }
      }, {
        key: "isObjectLike",
        value: function isObjectLike(value) {
          return !!value && babelHelpers.typeof(value) === 'object';
        }
      }, {
        key: "isPlainObject",
        value: function isPlainObject(value) {
          if (!this.isObjectLike(value) || Object.prototype.toString.call(value) !== '[object Object]') {
            return false;
          }

          var proto = Object.getPrototypeOf(value);

          if (proto === null) {
            return true;
          }

          var ctor = proto.hasOwnProperty('constructor') && proto.constructor;
          return typeof ctor === 'function' && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
        }
      }, {
        key: "isBoolean",
        value: function isBoolean(value) {
          return value === true || value === false;
        }
      }, {
        key: "toBoolean",
        value: function toBoolean(value) {
          var trueValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var transformedValue = this.isString(value) ? value.toLowerCase() : value;
          return ['true', 'y', '1', 1, true].concat(babelHelpers.toConsumableArray(trueValues)).includes(transformedValue);
        }
      }, {
        key: "isNumber",
        value: function isNumber(value) {
          return typeof value === 'number' && !isNaN(value);
        }
      }, {
        key: "toNumber",
        value: function toNumber(value) {
          var parsedValue = parseFloat(value);
          return this.isNumber(parsedValue) ? parsedValue : 0;
        }
      }, {
        key: "isInteger",
        value: function isInteger(value) {
          return this.isNumber(value) && value % 1 === 0;
        }
      }, {
        key: "toInteger",
        value: function toInteger(value) {
          return this.toNumber(parseInt(value, 10));
        }
      }, {
        key: "isFloat",
        value: function isFloat(value) {
          return this.isNumber(value) && !this.isInteger(value);
        }
      }, {
        key: "toFloat",
        value: function toFloat(value) {
          return parseFloat(value);
        }
      }, {
        key: "isNil",
        value: function isNil(value) {
          return value === null || value === undefined;
        }
      }, {
        key: "isArray",
        value: function isArray(value) {
          return !this.isNil(value) && Array.isArray(value);
        }
      }, {
        key: "isDate",
        value: function isDate(value) {
          return this.isObjectLike(value) && Object.prototype.toString.call(value) === '[object Date]';
        }
      }, {
        key: "isDomNode",
        value: function isDomNode(value) {
          return this.isObjectLike(value) && !this.isPlainObject(value) && 'nodeType' in value;
        }
      }, {
        key: "isPrototype",
        value: function isPrototype(value) {
          return (typeof (value && value.constructor) === 'function' && value.constructor.prototype || Object.prototype) === value;
        }
      }, {
        key: "isNull",
        value: function isNull(value) {
          return value === null;
        }
      }, {
        key: "isUndefined",
        value: function isUndefined(value) {
          return typeof value === 'undefined';
        }
      }, {
        key: "isBlob",
        value: function isBlob(value) {
          return this.isObjectLike(value) && this.isNumber(value.size) && this.isString(value.type) && this.isFunction(value.slice);
        }
      }, {
        key: "isFile",
        value: function isFile(value) {
          return this.isBlob(value) && this.isObjectLike(value.lastModifiedDate) && this.isNumber(value.lastModified) && this.isString(value.name);
        }
      }, {
        key: "isFormData",
        value: function isFormData(value) {
          return value instanceof FormData;
        }
      }]);
      return Type;
    }();

    // @ts-ignore
    var reEscape = /[&<>'"]/g;
    var reUnescape = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
    var escapeEntities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    };
    var unescapeEntities = {
      '&amp;': '&',
      '&#38;': '&',
      '&lt;': '<',
      '&#60;': '<',
      '&gt;': '>',
      '&#62;': '>',
      '&apos;': "'",
      '&#39;': "'",
      '&quot;': '"',
      '&#34;': '"'
    };

    var Text = /*#__PURE__*/function () {
      function Text() {
        babelHelpers.classCallCheck(this, Text);
      }

      babelHelpers.createClass(Text, null, [{
        key: "encode",
        value: function encode(value) {
          if (Type.isString(value)) {
            return value.replace(reEscape, function (item) {
              return escapeEntities[item];
            });
          }

          return value;
        }
      }, {
        key: "decode",
        value: function decode(value) {
          if (Type.isString(value)) {
            return value.replace(reUnescape, function (item) {
              return unescapeEntities[item];
            });
          }

          return value;
        }
      }, {
        key: "getRandom",
        value: function getRandom() {
          var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
          return babelHelpers.toConsumableArray(Array(length)).map(function () {
            return (~~(Math.random() * 36)).toString(36);
          }).join('');
        }
      }, {
        key: "toCamelCase",
        value: function toCamelCase(str) {
          if (Type.isEmpty(str)) {
            return str;
          }

          var regex = /[-_\s]+(.)?/g;

          if (!regex.test(str)) {
            return str.match(/^[A-Z]+$/) ? str.toLowerCase() : str[0].toLowerCase() + str.slice(1);
          }

          str = str.toLowerCase();
          str = str.replace(regex, function (match, letter) {
            return letter ? letter.toUpperCase() : '';
          });
          return str[0].toLowerCase() + str.substr(1);
        }
      }, {
        key: "toPascalCase",
        value: function toPascalCase(str) {
          if (Type.isEmpty(str)) {
            return str;
          }

          return this.capitalize(this.toCamelCase(str));
        }
      }, {
        key: "toKebabCase",
        value: function toKebabCase(str) {
          if (Type.isEmpty(str)) {
            return str;
          }

          var matches = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);

          if (!matches) {
            return str;
          }

          return matches.map(function (x) {
            return x.toLowerCase();
          }).join('-');
        }
      }, {
        key: "capitalize",
        value: function capitalize(str) {
          if (Type.isEmpty(str)) {
            return str;
          }

          return str[0].toUpperCase() + str.substr(1);
        }
      }, {
        key: "isIn",
        value: function isIn(symbol, string) {
          string = Type.toString(string);
          return string.indexOf(Type.toString(symbol)) !== -1;
        }
      }, {
        key: "trim",
        value: function trim(value) {
          if (Type.isString(value)) return value.trim();
          return value;
        }
      }, {
        key: "truncate",
        value: function truncate(string, length) {
          var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "...";
          string = Type.toString(string);
          return string.length > length ? this.trim(string.substr(0, length)) + suffix : string;
        }
      }, {
        key: "replaceMacros",
        value: function replaceMacros(string, rules) {
          var tagStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#";
          var tagEnd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "#";

          if (Type.isObjectLike(rules)) {
            var macros = {};
            Object.keys(rules).forEach(function (key) {
              macros[tagStart + key + tagEnd] = rules[key];
            });
            string = Text.replace(string, macros);
          }

          return string;
        }
      }, {
        key: "replace",
        value: function replace(string, rules) {
          var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'g';
          string = Type.toString(string);

          if (Type.isObjectLike(rules)) {
            Object.keys(rules).forEach(function (key) {
              string = string.replace(new RegExp(key, flag), rules[key]);
            });
          }

          return string;
        }
      }, {
        key: "nl2br",
        value: function nl2br(value) {
          if (!value || !value.replace) return value;
          return value.replace(/([^>])\n/g, '$1<br/>');
        }
      }, {
        key: "stripTags",
        value: function stripTags(value) {
          if (!value || !value.split) return value;
          return value.split(/<[^>]+>/g).join('');
        }
      }, {
        key: "stripPhpTags",
        value: function stripPhpTags(value) {
          if (!value || !value.replace) return value;
          return value.replace(/<\?(.|[\r\n])*?\?>/g, '');
        }
      }]);
      return Text;
    }();

    var UA = navigator.userAgent.toLowerCase();

    var Browser = /*#__PURE__*/function () {
      function Browser() {
        babelHelpers.classCallCheck(this, Browser);
      }

      babelHelpers.createClass(Browser, null, [{
        key: "isOpera",
        value: function isOpera() {
          return UA.includes('opera');
        }
      }, {
        key: "isIE",
        value: function isIE() {
          return 'attachEvent' in document && !Browser.isOpera();
        }
      }, {
        key: "isIE6",
        value: function isIE6() {
          return UA.includes('msie 6');
        }
      }, {
        key: "isIE7",
        value: function isIE7() {
          return UA.includes('msie 7');
        }
      }, {
        key: "isIE8",
        value: function isIE8() {
          return UA.includes('msie 8');
        }
      }, {
        key: "isIE9",
        value: function isIE9() {
          return 'documentMode' in document && document.documentMode >= 9;
        }
      }, {
        key: "isIE10",
        value: function isIE10() {
          return 'documentMode' in document && document.documentMode >= 10;
        }
      }, {
        key: "isSafari",
        value: function isSafari() {
          return UA.includes('webkit');
        }
      }, {
        key: "isFirefox",
        value: function isFirefox() {
          return UA.includes('firefox');
        }
      }, {
        key: "isChrome",
        value: function isChrome() {
          return UA.includes('chrome');
        }
      }, {
        key: "detectIEVersion",
        value: function detectIEVersion() {
          if (Browser.isOpera() || Browser.isSafari() || Browser.isFirefox() || Browser.isChrome()) {
            return -1;
          }

          var rv = -1;

          if (!!window.MSStream && !window.ActiveXObject && 'ActiveXObject' in window) {
            rv = 11;
          } else if (Browser.isIE10()) {
            rv = 10;
          } else if (Browser.isIE9()) {
            rv = 9;
          } else if (Browser.isIE()) {
            rv = 8;
          }

          if (rv === -1 || rv === 8) {
            if (navigator.appName === 'Microsoft Internet Explorer') {
              var re = new RegExp('MSIE ([0-9]+[.0-9]*)');
              var res = navigator.userAgent.match(re);

              if (Type.isArrayLike(res) && res.length > 0) {
                rv = parseFloat(res[1]);
              }
            }

            if (navigator.appName === 'Netscape') {
              rv = 11;

              var _re = new RegExp('Trident/.*rv:([0-9]+[.0-9]*)');

              if (_re.exec(navigator.userAgent) != null) {
                var _res = navigator.userAgent.match(_re);

                if (Type.isArrayLike(_res) && _res.length > 0) {
                  rv = parseFloat(_res[1]);
                }
              }
            }
          }

          return rv;
        }
      }, {
        key: "isIE11",
        value: function isIE11() {
          return Browser.detectIEVersion() >= 11;
        }
      }, {
        key: "isMac",
        value: function isMac() {
          return UA.includes('macintosh');
        }
      }, {
        key: "isAndroid",
        value: function isAndroid() {
          return UA.includes('android');
        }
      }, {
        key: "isIPad",
        value: function isIPad() {
          return UA.includes('ipad;');
        }
      }, {
        key: "isIPhone",
        value: function isIPhone() {
          return UA.includes('iphone;');
        }
      }, {
        key: "isIOS",
        value: function isIOS() {
          return Browser.isIPad() || Browser.isIPhone();
        }
      }, {
        key: "isMobile",
        value: function isMobile() {
          return Browser.isIPhone() || Browser.isIPad() || Browser.isAndroid() || UA.includes('mobile') || UA.includes('touch');
        }
      }, {
        key: "isRetina",
        value: function isRetina() {
          return window.devicePixelRatio && window.devicePixelRatio >= 2;
        }
      }, {
        key: "isDoctype",
        value: function isDoctype(target) {
          var doc = target || document;

          if (doc.compatMode) {
            return doc.compatMode === 'CSS1Compat';
          }

          return doc.documentElement && doc.documentElement.clientHeight;
        }
      }, {
        key: "isLocalStorageSupported",
        value: function isLocalStorageSupported() {
          try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
          } catch (e) {
            return false;
          }
        }
      }, {
        key: "detectAndroidVersion",
        value: function detectAndroidVersion() {
          var re = new RegExp('Android ([0-9]+[.0-9]*)');

          if (re.exec(navigator.userAgent) != null) {
            var res = navigator.userAgent.match(re);

            if (Type.isArrayLike(res) && res.length > 0) {
              return parseFloat(res[1]);
            }
          }

          return 0;
        }
      }, {
        key: "isPropertySupported",
        value: function isPropertySupported(jsProperty, returnCSSName) {
          if (jsProperty === '') {
            return false;
          }

          function getCssName(propertyName) {
            return propertyName.replace(/([A-Z])/g, function () {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              return "-".concat(args[1].toLowerCase());
            });
          }

          function getJsName(cssName) {
            var reg = /(\\-([a-z]))/g;

            if (reg.test(cssName)) {
              return cssName.replace(reg, function () {
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = arguments[_key2];
                }

                return args[2].toUpperCase();
              });
            }

            return cssName;
          }

          var property = jsProperty.includes('-') ? getJsName(jsProperty) : jsProperty;
          var bReturnCSSName = !!returnCSSName;
          var ucProperty = property.charAt(0).toUpperCase() + property.slice(1);
          var props = ['Webkit', 'Moz', 'O', 'ms'].join("".concat(ucProperty, " "));
          var properties = "".concat(property, " ").concat(props, " ").concat(ucProperty).split(' ');
          var obj = document.body || document.documentElement;

          for (var i = 0; i < properties.length; i += 1) {
            var prop = properties[i];

            if (obj && 'style' in obj && prop in obj.style) {
              var lowerProp = prop.substr(0, prop.length - property.length).toLowerCase();
              var prefix = prop === property ? '' : "-".concat(lowerProp, "-");
              return bReturnCSSName ? prefix + getCssName(property) : prop;
            }
          }

          return false;
        }
      }]);
      return Browser;
    }();

    var Event = /*#__PURE__*/function () {
      function Event() {
        babelHelpers.classCallCheck(this, Event);

        /**
         * Наименование события. Обработчики могут использовать
         * @type {string}
         */
        this.name = "";
        /**
         * Определяет, является ли событие обработанным. Когда установлено в `true`,
         * @type {boolean}
         */

        this.handled = false;
        /**
         * Данные, которые приходят из [[CustomEvents.on()]] когда прикрепляется обработчик события.
         * @type {*}
         */

        this.data = {};
        /**
         * Содержит все зарегистрированные события.
         * @type {WeakMap}
         */

        this.events = new WeakMap();
      }
      /**
       * Получает массив событий из объекта
       * @param {Object} eventObject
       * @returns {Object}
       */


      babelHelpers.createClass(Event, [{
        key: "_get",
        value: function _get(eventObject) {
          return this.events.get(eventObject) || {};
        }
        /**
         * Прикрепляет обработчик события к объекту.
         * @param {Object|string} eventObject
         * @param {string|Function} eventName
         * @param {Function|null} eventHandler
         * @param {*} data
         * @param {boolean|null} append
         */

      }, {
        key: "on",
        value: function on(eventObject, eventName, eventHandler) {
          var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
          var append = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

          if (Type.isString(eventObject)) {
            append = Type.isNull(data) ? true : data;
            data = eventHandler || null;
            eventHandler = eventName;
            eventName = eventObject;
            eventObject = window;
          }

          if (!Type.isFunction(eventHandler) || Type.isEmpty(eventName) || !Type.isObject(eventObject)) return;
          eventName = eventName.toLowerCase();

          var events = this._get(eventObject);

          if (!Type.isArray(events[eventName])) events[eventName] = [];
          if (append) events[eventName].push([eventHandler, data]);else events[eventName].unshift([eventHandler, data]);
          this.events.set(eventObject, events);
        }
        /**
         * Открепляет обработчик события от объекта.
         * @param {Object|string} eventObject
         * @param {string|Function} eventName
         * @param {Function|undefined} eventHandler
         * @returns {boolean}
         */

      }, {
        key: "off",
        value: function off(eventObject, eventName, eventHandler) {
          if (Type.isString(eventObject)) {
            eventHandler = eventName;
            eventName = eventObject;
            eventObject = window;
          }

          eventName = eventName.toLowerCase();

          var events = this._get(eventObject);

          if (Type.isNull(eventHandler)) {
            delete events[eventName];
            return true;
          }

          var removed = false;

          if (events && Type.isArray(events[eventName])) {
            events[eventName].forEach(function (event, i) {
              if (event[0] === eventHandler) {
                events[eventName].splice(i, 1);
                removed = true;
              }
            });
          }

          return removed;
        }
        /**
         * Вызывает событие объекта.
         * @param {Object|string} eventObject
         * @param {string|Object} eventName
         * @param {Array|null} eventParams
         * @param {null|undefined} event
         */

      }, {
        key: "trigger",
        value: function trigger(eventObject, eventName) {
          var eventParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          var event = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

          if (Type.isString(eventObject)) {
            event = eventParams || null;
            eventParams = eventName || [];
            eventName = eventObject;
            eventObject = window;
          }

          if (eventParams === null) eventParams = [];
          eventName = eventName.toLowerCase();

          var globalEvents = this._get(window);

          var globalHandlers = globalEvents && Type.isArray(globalEvents[eventName]) ? globalEvents[eventName] : [];
          var objectHandlers = [];

          if (eventObject !== window && Type.isObject(eventObject)) {
            var objectEvents = this._get(eventObject);

            if (objectEvents && Type.isArray(objectEvents[eventName])) {
              objectHandlers = objectEvents[eventName];
            }
          }

          var handlers = globalHandlers.concat(objectHandlers);
          if (event === null) event = new Event();
          event.handled = false;
          event.name = eventName;

          for (var i = 0; i <= handlers.length - 1; i++) {
            var handler = handlers[i];
            event.data = handler[1];
            if (eventParams.indexOf(event) < 0) eventParams.unshift(event);
            if (Type.isFunction(handler[0])) handler[0].apply(eventObject, eventParams);
            if (event.handled) break;
          }
        }
      }]);
      return Event;
    }();

    var event = new Event();

    if (global && global.window && global.window.B) {
      Object.assign(global.window.B, exports);
    }

    exports.Type = Type;
    exports.Text = Text;
    exports.Browser = Browser;
    exports.Event = Event;
    exports.event = event;

}((this.B = this.B || {})));



})();
//# sourceMappingURL=core.js.map