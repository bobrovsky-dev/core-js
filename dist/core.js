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

        /**
         *
         * @param {*} value
         * @returns {boolean}
         */
        value: function isEmpty(value) {
          if (this.isArray(value) || this.isString(value)) return value.length === 0;
          if (this.isNumber(value)) return value === 0;
          if (this.isBoolean(value)) return value === false;
          if (this.isObject(value)) return this.isEmpty(Object.getOwnPropertyNames(value));
          return this.isNil(value);
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isString",
        value: function isString(value) {
          return typeof value === 'string';
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isSymbol",
        value: function isSymbol(value) {
          var type = babelHelpers.typeof(value);
          return type == 'symbol' || type === 'object' && value != null && Object.prototype.toString.call(value) == '[object Symbol]';
        }
        /**
         *
         * @param {*} value
         * @returns {string}
         */

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
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isFunction",
        value: function isFunction(value) {
          return typeof value === 'function';
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isObject",
        value: function isObject(value) {
          return !!value && (babelHelpers.typeof(value) === 'object' || typeof value === 'function');
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isObjectLike",
        value: function isObjectLike(value) {
          return !!value && babelHelpers.typeof(value) === 'object';
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

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
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isBoolean",
        value: function isBoolean(value) {
          return value === true || value === false;
        }
        /**
         *
         * @param {any} value
         * @param {array} trueValues
         * @returns {boolean}
         */

      }, {
        key: "toBoolean",
        value: function toBoolean(value) {
          var trueValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var transformedValue = this.isString(value) ? value.toLowerCase() : value;
          return ['true', 'y', '1', 1, true].concat(babelHelpers.toConsumableArray(trueValues)).includes(transformedValue);
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isNumber",
        value: function isNumber(value) {
          return typeof value === 'number' && !isNaN(value);
        }
        /**
         *
         * @param {*} value
         * @returns {number}
         */

      }, {
        key: "toNumber",
        value: function toNumber(value) {
          var parsedValue = parseFloat(value);
          return this.isNumber(parsedValue) ? parsedValue : 0;
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isInteger",
        value: function isInteger(value) {
          return this.isNumber(value) && value % 1 === 0;
        }
        /**
         *
         * @param {*} value
         * @returns {number}
         */

      }, {
        key: "toInteger",
        value: function toInteger(value) {
          return this.toNumber(parseInt(value, 10));
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isFloat",
        value: function isFloat(value) {
          return this.isNumber(value) && !this.isInteger(value);
        }
        /**
         *
         * @param {any} value
         * @returns {number}
         */

      }, {
        key: "toFloat",
        value: function toFloat(value) {
          return parseFloat(value);
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isNil",
        value: function isNil(value) {
          return value === null || value === undefined;
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isArray",
        value: function isArray(value) {
          return !this.isNil(value) && Array.isArray(value);
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isDate",
        value: function isDate(value) {
          return this.isObjectLike(value) && Object.prototype.toString.call(value) === '[object Date]';
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isDomNode",
        value: function isDomNode(value) {
          return this.isObjectLike(value) && !this.isPlainObject(value) && 'nodeType' in value;
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isPrototype",
        value: function isPrototype(value) {
          return (typeof (value && value.constructor) === 'function' && value.constructor.prototype || Object.prototype) === value;
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isNull",
        value: function isNull(value) {
          return value === null;
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isUndefined",
        value: function isUndefined(value) {
          return typeof value === 'undefined';
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isBlob",
        value: function isBlob(value) {
          return this.isObjectLike(value) && this.isNumber(value.size) && this.isString(value.type) && this.isFunction(value.slice);
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isFile",
        value: function isFile(value) {
          return this.isBlob(value) && this.isObjectLike(value.lastModifiedDate) && this.isNumber(value.lastModified) && this.isString(value.name);
        }
        /**
         *
         * @param {*} value
         * @returns {boolean}
         */

      }, {
        key: "isFormData",
        value: function isFormData(value) {
          return value instanceof FormData;
        }
      }]);
      return Type;
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

        /**
         *
         * @param {string} value
         * @returns {string}
         */
        value: function encode(value) {
          if (Type.isString(value)) {
            return value.replace(reEscape, function (item) {
              return escapeEntities[item];
            });
          }

          return value;
        }
        /**
         *
         * @param {string} value
         * @returns {string}
         */

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
        /**
         *
         * @param {number} length
         * @returns {string}
         */

      }, {
        key: "getRandom",
        value: function getRandom() {
          var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
          return babelHelpers.toConsumableArray(Array(length)).map(function () {
            return (~~(Math.random() * 36)).toString(36);
          }).join('');
        }
        /**
         *
         * @param {string} str
         * @returns {string}
         */

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
        /**
         *
         * @param {string} str
         * @returns {string}
         */

      }, {
        key: "toPascalCase",
        value: function toPascalCase(str) {
          if (Type.isEmpty(str)) {
            return str;
          }

          return this.capitalize(this.toCamelCase(str));
        }
        /**
         *
         * @param {string} str
         * @returns {string}
         */

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
        /**
         *
         * @param {string} str
         * @returns {string}
         */

      }, {
        key: "capitalize",
        value: function capitalize(str) {
          if (Type.isEmpty(str)) {
            return str;
          }

          return str[0].toUpperCase() + str.substr(1);
        }
        /**
         *
         * @param {string} symbol
         * @param {string} string
         * @returns {boolean}
         */

      }, {
        key: "isIn",
        value: function isIn(symbol, string) {
          string = Type.toString(string);
          return string.indexOf(Type.toString(symbol)) !== -1;
        }
        /**
         *
         * @param {string} value
         * @returns {string}
         */

      }, {
        key: "trim",
        value: function trim(value) {
          if (Type.isString(value)) return value.trim();
          return value;
        }
        /**
         * Заменяет текст внутри части строки.
         *
         * @param {string} string Входная строка.
         * @param {string} replacement Строка замены.
         * @param {number} start Позиция для начала замены подстроки at.
         * Если start неотрицателен, то замена начнется с начального смещения в строку.
         * Если start отрицательный, то замена начнется с начального символа в конце строки.
         * @param {number|null} length Длина подстроки, подлежащей замене.
         * Если задано и положительно, то оно представляет собой длину части строки, которая должна быть заменена.
         * Если он отрицательный, то представляет собой количество символов от конца строки, на котором следует прекратить замену.
         * Если он не задан, то по умолчанию он будет равен длине строки, то есть завершит замену в конце строки.
         * Если длина равна нулю, то эта функция будет иметь эффект вставки замены в строку при заданном начальном смещении.
         *
         * @returns {string}
         */

      }, {
        key: "replaceSubstring",
        value: function replaceSubstring(string, replacement, start) {
          var length = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
          string = Type.toString(string);
          var stringLength = string.length;
          if (start < 0) start = Math.max(0, stringLength + start);else if (start > stringLength) start = stringLength;
          if (length !== null && length < 0) length = Math.max(0, stringLength - start + length);else if (length === null || length > stringLength) length = stringLength;
          if (start + length > stringLength) length = stringLength - start;
          return string.substr(0, start) + replacement + string.substr(start + length, stringLength - start - length);
        }
        /**
         * Усекает строку от начала до указанного количества символов.
         *
         * @param {string} string Строка для обработки.
         * @param {number} length Максимальная длина усеченной строки, включая маркер обрезки.
         * @param {string} trimMarker Строка для добавления в начало.
         * @returns {string}
         */

      }, {
        key: "truncateBegin",
        value: function truncateBegin(string, length) {
          var trimMarker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "...";
          string = Type.toString(string);
          var stringLength = string.length;
          if (stringLength <= length) return string;
          trimMarker = Type.toString(trimMarker);
          var trimMarkerLength = trimMarker.length;
          return this.replaceSubstring(string, trimMarker, 0, -length + trimMarkerLength);
        }
        /**
         *
         * @param {string} string
         * @param {number} length
         * @param {string} trimMarker
         * @returns {string}
         */

      }, {
        key: "truncateMiddle",
        value: function truncateMiddle(string, length) {
          var trimMarker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "...";
          string = Type.toString(string);
          var stringLength = string.length;
          if (stringLength <= length) return string;
          trimMarker = Type.toString(trimMarker);
          var trimMarkerLength = trimMarker.length;
          var start = Type.toInteger(Math.ceil((length - trimMarkerLength) / 2));
          var end = length - start - trimMarkerLength;
          return this.replaceSubstring(string, trimMarker, start, -end);
        }
        /**
         *
         * @param {string} string
         * @param {number} length
         * @param {string} trimMarker
         * @returns {string}
         */

      }, {
        key: "truncateEnd",
        value: function truncateEnd(string, length) {
          var trimMarker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "...";
          string = Type.toString(string);
          var stringLength = string.length;
          if (stringLength <= length) return string;
          trimMarker = Type.toString(trimMarker);
          var trimMarkerLength = trimMarker.length;
          return this.trim(string.substr(0, length - trimMarkerLength)) + trimMarker;
        }
        /**
         *
         * @param {string} string
         * @param {object} rules
         * @param {string} tagStart
         * @param {string} tagEnd
         * @returns {string}
         */

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
        /**
         *
         * @param {string} string
         * @param {object} rules
         * @param {string} flag
         * @returns {string}
         */

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
        /**
         *
         * @param {string} value
         * @returns {string}
         */

      }, {
        key: "nl2br",
        value: function nl2br(value) {
          if (!value || !value.replace) return value;
          return value.replace(/([^>])\n/g, '$1<br/>');
        }
        /**
         *
         * @param {string} value
         * @returns {string}
         */

      }, {
        key: "stripTags",
        value: function stripTags(value) {
          if (!value || !value.split) return value;
          return value.split(/<[^>]+>/g).join('');
        }
        /**
         *
         * @param {string} value
         * @returns {string}
         */

      }, {
        key: "stripPhpTags",
        value: function stripPhpTags(value) {
          if (!value || !value.replace) return value;
          return value.replace(/<\?(.|[\r\n])*?\?>/g, '');
        }
        /**
         * Взрывает строку в массив, опционально обрезает значения и пропускает пустые
         *
         * @param {string} value
         * @param {string} separator
         * @param {boolean} trim
         * @param {boolean} skipEmpty
         * @returns {array}
         */

      }, {
        key: "explode",
        value: function explode(value) {
          var _this = this;

          var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
          var trim = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          var skipEmpty = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
          value = Type.toString(value);
          var result = value.split(separator);

          if (!!trim) {
            result = result.map(function (i) {
              return _this.trim(i);
            });
          }

          if (skipEmpty) {
            result = result.filter(function (i) {
              return i !== "";
            });
          }

          return result;
        }
        /**
         * Метод для обрезания строк.
         *
         * @param {string} value
         * @param {number} offset
         * @param {number|null} length
         * @returns {string}
         */

      }, {
        key: "cut",
        value: function cut(value, offset) {
          var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          value = Type.toString(value);
          return value.substr(offset, length);
        }
        /**
         * Возвращает позицию подстроки в строке.
         *
         * @param {string} needle Подстрока.
         * @param {string} haystack Строка.
         * @param {number} offset Смещение.
         * @param {boolean} insensitive Нечювствительность к регистру.
         * @param {boolean} last Искать последнюю подстроку.
         * @returns {number|false} Позиция, с которой начинается первая или последняя найденная подстрока или `false`, если подстрока не найдена.
         */

      }, {
        key: "position",
        value: function position(needle, haystack) {
          var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var insensitive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
          var last = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
          needle = Type.toString(needle);
          haystack = Type.toString(haystack);

          if (insensitive) {
            haystack = haystack.toLowerCase();
            needle = needle.toLowerCase();
          }

          var pos = haystack.indexOf(needle, offset);

          if (last) {
            offset = pos;

            while (true) {
              var res = haystack.indexOf(needle, offset += 1);
              if (res == -1) break;
              pos = res;
            }
          }

          return pos >= 0 ? pos : false;
        }
        /**
         * Сравнивкт две строки
         *
         * @param {string} value1 Первая строка для сравнения.
         * @param {string} value2 Вторая строка для сравнения.
         * @param {number} length Количество сравневаемых символов. Если 0, то сравнивает всю строку.
         * @param {boolean} insensitive Нечювствительность к регистру.
         * @returns {boolean} Результат сравнения.
         */

      }, {
        key: "compare",
        value: function compare(value1, value2) {
          var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var insensitive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
          value1 = Type.toString(value1);
          value2 = Type.toString(value2);
          length = Type.toInteger(length);

          if (length > 0) {
            value1 = this.cut(value1, 0, length);
            value2 = this.cut(value2, 0, length);
          }

          return this.position(value1, value2, 0, insensitive, false) === 0;
        }
      }]);
      return Text;
    }();

    function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

    var Arrays = /*#__PURE__*/function () {
      function Arrays() {
        babelHelpers.classCallCheck(this, Arrays);
      }

      babelHelpers.createClass(Arrays, null, [{
        key: "getValues",

        /**
         * Возвращает значения с новыми ключами
         *
         * @param {array|object} array Массив или объект
         * @param {boolean} clean Нужно ли очищать от null и undefined
         * @returns {array}
         */
        value: function getValues(array) {
          var clean = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          if (Type.isArray(array)) return clean ? this.clean(array) : array;

          if (Type.isObjectLike(array)) {
            array = Object.values(array);
            return clean ? this.clean(array) : array;
          }

          return [];
        }
        /**
         * Возвращает первое значение, или значение по умолчанию
         *
         * @param {array|object} array Массив или объект
         * @param {mixed} defaultValue Значение по умолчанию
         * @param {boolean} clean Нужно ли очищать от null и undefined
         * @returns {mixed}
         */

      }, {
        key: "getFirstValue",
        value: function getFirstValue(array) {
          var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var clean = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          var values = this.getValues(array, clean);
          return values.length ? values[0] : defaultValue;
        }
        /**
         * Возвращает последнее значение, или значение по умолчанию
         *
         * @param {array|object} array Массив или объект
         * @param {mixed} defaultValue Значение по умолчанию
         * @param {boolean} clean Нужно ли очищать от null и undefined
         * @returns {mixed}
         */

      }, {
        key: "getLastValue",
        value: function getLastValue(array) {
          var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var clean = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          var values = this.getValues(array, clean);
          return values.length ? values[values.length - 1] : defaultValue;
        }
        /**
         * Возвращает массив ключей
         *
         * @param {array|object} array Массив или объект
         * @param {boolean} convertKeyToString Конвертировать ключи массива в строку
         * @returns {array}
         */

      }, {
        key: "getKeys",
        value: function getKeys(array) {
          var convertKeyToString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (Type.isArray(array)) return array.map(function (v, i) {
            return convertKeyToString ? i.toString() : i;
          });
          if (Type.isObjectLike(array)) return Object.keys(array);
          return [];
        }
        /**
         * Возвращает первый ключ, или значение по умолчанию
         *
         * @param {array|object} array Массив или объект
         * @param {mixed} defaultValue Значение по умолчанию
         * @param {boolean} convertString Конвертировать ключи массива в строку
         * @returns {mixed}
         */

      }, {
        key: "getFirstKey",
        value: function getFirstKey(array) {
          var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var convertString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var keys = this.getKeys(array, convertString);
          return keys.length ? keys[0] : defaultValue;
        }
        /**
         * Возвращает последний ключ, или значение по умолчанию
         *
         * @param {array|object} array Массив или объект
         * @param {mixed} defaultValue Значение по умолчанию
         * @param {boolean} convertString Конвертировать ключи массива в строку
         * @returns {mixed}
         */

      }, {
        key: "getLastKey",
        value: function getLastKey(array) {
          var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var convertString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var keys = this.getKeys(array, convertString);
          return keys.length ? keys[keys.length - 1] : defaultValue;
        }
        /**
         * Очищает значения массива от null или undefined
         *
         * @param {array} array Массив
         * @returns {array} Очищенный массив
         */

      }, {
        key: "clean",
        value: function clean(array) {
          if (Type.isArray(array)) return array.filter(function (value) {
            return !Type.isNil(value);
          });
          return [];
        }
        /**
         * Проверяет, присутствует ли в массиве или объекте указанный ключ
         *
         * @param {string|number} key Ключ
         * @param {array|object} array Массив или объект
         * @returns {boolean}
         */

      }, {
        key: "keyExists",
        value: function keyExists(key, array) {
          if (Type.isArray(array) || Type.isObjectLike(array)) return array.hasOwnProperty(key);
          return false;
        }
        /**
         * Проверяет, присутствует ли в массиве или объекте значение
         *
         * @param {mixed} value Значение
         * @param {array|object} array Массив или объект
         * @returns {boolean}
         */

      }, {
        key: "isIn",
        value: function isIn(value, array) {
          if (Type.isArray(array)) return array.indexOf(value) >= 0;

          if (Type.isObjectLike(array)) {
            var keys = Object.keys(array);

            for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
              var key = _keys[_i];

              if (array[key] === value) {
                return true;
              }
            }
          }

          return false;
        }
        /**
         *  Возращает значение элемента, если оно найдено, или значение по умолчанию
         *
         * @param {array|object} array Массив или объект
         * @param {string|number} key Ключ
         * @param {mixed} defaultValue Значение по умолчанию
         * @returns {mixed}
         */

      }, {
        key: "getRootValue",
        value: function getRootValue(array, key, defaultValue) {
          return this.keyExists(key, array) ? array[key] : defaultValue;
        }
        /**
         * Извлекает значение элемента массива или объекта с заданным ключом
         * Если ключ не существует в массиве или объекте, вместо него будет возвращено значение по умолчанию
         *
         * Ниже приведены некоторые примеры использования,
         *
         * работа с массивом:
         * let array = [
         *      "первое значение",
         *      "второе значение",
         * ]
         *
         * Arrays.getValue(array, 1)
         * вернет "второе значение"
         *
         *
         * работа с объектом:
         * let object = {
         *     one: "1",
         *     two: "2"
         * }
         *
         * Arrays.getValue(object, 'one')
         * вернет "1"
         *
         *
         *
         * работа с функцией:
         * let user = {
         *     firstName: "Имя",
         *     lastName: "Фамилия"
         * }
         *
         * B.Arrays.getValue(user, function(user, defaultValue) {
         *     return user.firstName + ' ' + user.lastName
         * })
         * вернет "Имя Фамилия"
         *
         * использование точечного формата для получения значения встроенного объекта или массива
         *
         * let array = [
         *      ["Яблоко", "Груша", "Слива"],
         *      ["Апельсин", "Мандарин"],
         * ]
         *
         * Arrays.getValue(array, '0.2') или Arrays.getValue(array, [0, 2])
         * вернет "Слива"
         *
         * let object = {
         *      one: {
         *          two: {
         *              three: "Значение three"
         *          }
         *      }
         * }
         *
         *
         * Arrays.getValue(object, 'one.two.three') или Arrays.getValue(object, ['one', 'two', 'three'])
         * вернет "Значение three"
         *
         *
         * @param {array|object} array Массив или объект
         * @param {string|number|function|array} key Ключ
         * @param {mixed} defaultValue Значение по умолчанию
         * @returns {mixed}
         */

      }, {
        key: "getValue",
        value: function getValue(array, key) {
          var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          if (Type.isFunction(key)) return key(array, defaultValue);

          if (Type.isArray(key)) {
            var lastKey = key.pop();

            var _iterator = _createForOfIteratorHelper(key),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var keyPart = _step.value;
                array = this.getValue(array, keyPart);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            key = lastKey;
          }

          if ((Type.isArray(key) || Type.isObjectLike(key)) && this.keyExists(key, array)) return array[key];
          var pos = Text.position(".", key);

          if (pos !== false) {
            array = this.getValue(array, Type.toString(key).substr(0, pos), defaultValue);
            key = Type.toString(key).substr(pos + 1);
            return this.getValue(array, key, defaultValue);
          }

          return this.keyExists(key, array) ? array[key] : defaultValue;
        }
        /**
         * Удаляет значение массива или объекта по ключу
         *
         * @param {array|object} array Массив или объект
         * @param {string|number} key Ключ
         * @param {mixed} defaultValue Значение по умолчанию
         * @returns {mixed} Возвращает значение элемента массива или объекта, если оно удалилось, в противном случае значение по умолчанию
         */

      }, {
        key: "remove",
        value: function remove(array, key) {
          var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

          if (this.keyExists(key, array)) {
            var value = array[key];
            if (Type.isArray(array)) array.splice(array.indexOf(key), 1);
            if (Type.isObjectLike(array)) delete array[key];
            return value;
          }

          return defaultValue;
        }
        /**
         * Удаляет значения массива или объекта по переданному значению
         *
         * @param {array|object} array Массив или объект
         * @param {string|number} value Ключ
         * @param {mixed} defaultValue Значение по умолчанию
         * @returns {mixed}
         */

      }, {
        key: "removeValue",
        value: function removeValue(array, value) {
          var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          var result = defaultValue;

          if (Type.isArray(array)) {
            for (var key in array) {
              if (array.hasOwnProperty(key)) {
                var val = array[key];

                if (val === value) {
                  result = key;
                  this.remove(array, key);
                }
              }
            }
          } else if (Type.isObjectLike(array)) {
            var keys = Object.keys(array);

            for (var _i2 = 0, _keys2 = keys; _i2 < _keys2.length; _i2++) {
              var _key = _keys2[_i2];

              if (array[_key] === value) {
                result = _key;
                this.remove(array, _key);
              }
            }
          }

          return result;
        }
        /**
         * Возвращает значения указанного столбца в массиве.
         * Входной массив должен быть многомерным или массивом объектов.
         *
         * Например,
         * let array = [
         *      {id: '123', data: 'abc'}
         *      {id: '345', data: 'def'}
         * ];
         *
         * let result = Arrays.getColumn(array, 'id');
         * в результате получается: ['123', '345']
         *
         * использование анонимной функции
         * let result = Arrays.getColumn(array, function(element), {
         *    return element.id;
         * });
         *
         * @param {array|object} array Массив или объект
         * @param {number|string|function} name Название ключа столбца
         * @param {boolean} keepKeys Если false, то результирующий массив будет переиндексирован целыми числами.
         * @returns {array|object} Список значений столбцов
         */

      }, {
        key: "getColumn",
        value: function getColumn(array, name) {
          var keepKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          var result = [];
          var resultObject = {};

          if (Type.isObjectLike(array)) {
            var keys = this.getKeys(array);

            var _iterator2 = _createForOfIteratorHelper(keys),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var key = _step2.value;
                var value = array[key];

                if (keepKeys) {
                  resultObject[key] = this.getValue(value, name);
                } else {
                  result.push(this.getValue(value, name));
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          } else if (Type.isArray(array)) {
            var _iterator3 = _createForOfIteratorHelper(array),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _value = _step3.value;
                result.push(this.getValue(_value, name));
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }

          return keepKeys ? resultObject : result;
        }
      }]);
      return Arrays;
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
         * Данные, которые приходят из [[Event.on()]] когда прикрепляется обработчик события.
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
       * Получает массив событий из WeakMap
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
          if (!!append) events[eventName].push([eventHandler, data]);else events[eventName].unshift([eventHandler, data]);
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
         * @param {Event} event
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

    var type = babelHelpers.objectSpread({}, Object.getOwnPropertyNames(Type).filter(function (key) {
      return !['name', 'length', 'prototype', 'caller', 'arguments'].includes(key);
    }).reduce(function (acc, key) {
      acc[key] = Type[key];
      return acc;
    }, {}), {
      isNotEmptyString: function isNotEmptyString(value) {
        return Type.isString(value) && value !== '';
      },
      isNotEmptyObject: function isNotEmptyObject(value) {
        return Type.isObjectLike(value) && Object.keys(value).length > 0;
      },
      isMapKey: Type.isObject,
      stringToInt: function stringToInt(value) {
        var parsed = parseInt(value);
        return !Number.isNaN(parsed) ? parsed : 0;
      }
    });
    var browser = {
      IsOpera: Browser.isOpera,
      IsIE: Browser.isIE,
      IsIE6: Browser.isIE6,
      IsIE7: Browser.isIE7,
      IsIE8: Browser.isIE8,
      IsIE9: Browser.isIE9,
      IsIE10: Browser.isIE10,
      IsIE11: Browser.isIE11,
      IsSafari: Browser.isSafari,
      IsFirefox: Browser.isFirefox,
      IsChrome: Browser.isChrome,
      DetectIeVersion: Browser.detectIEVersion,
      IsMac: Browser.isMac,
      IsAndroid: Browser.isAndroid,
      isIPad: Browser.isIPad,
      isIPhone: Browser.isIPhone,
      IsIOS: Browser.isIOS,
      IsMobile: Browser.isMobile,
      isRetina: Browser.isRetina,
      IsDoctype: Browser.isDoctype,
      SupportLocalStorage: Browser.isLocalStorageSupported,
      addGlobalClass: Browser.addGlobalClass,
      DetectAndroidVersion: Browser.detectAndroidVersion,
      isPropertySupported: Browser.isPropertySupported,
      addGlobalFeatures: Browser.addGlobalFeatures
    };
    var event = new Event();
    var on = event.on,
        off = event.off,
        trigger = event.trigger;
    var getRandom = Text.getRandom,
        replaceMacros = Text.replaceMacros;

    if (global && global.window && global.window.B) {
      Object.assign(global.window.B, exports);
    }

    exports.Type = Type;
    exports.Browser = Browser;
    exports.Text = Text;
    exports.Arrays = Arrays;
    exports.type = type;
    exports.browser = browser;
    exports.event = event;
    exports.on = on;
    exports.off = off;
    exports.trigger = trigger;
    exports.getRandom = getRandom;
    exports.replaceMacros = replaceMacros;

}((this.B = this.B || {})));



})();
//# sourceMappingURL=core.js.map