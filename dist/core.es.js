function initExtend(B) {
  B.extend = function (target) {
    target = target || {};
    var args = Array.prototype.slice.call(arguments),
        length = args.length,
        i = 1;

    if (args.length === 1) {
      target = this;
      i = 0;
    }

    for (; i < length; i++) {
      if (!args[i]) {
        continue;
      }

      for (var key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          target[key] = args[i][key];
        }
      }
    }

    return target;
  };
}

function initTmp(B) {
  if (typeof window !== 'undefined' && typeof window.B === 'function') {
    B.extend(window.B);
  }
}

function initType(B) {
  B.extend({
    type: Type
  });
}

var Type = /*#__PURE__*/function () {
  function Type() {}

  Type.isEmpty = function isEmpty(value) {
    if (Type.isArray(value) || Type.isString(value)) {
      return value.length === 0;
    }

    if (Type.isNumber(value)) {
      return value === 0;
    }

    if (Type.isBoolean(value)) {
      return value === false;
    }

    if (Type.isObject(value)) {
      return Type.isEmpty(Object.getOwnPropertyNames(value));
    }

    return Type.isNil(value);
  };

  Type.isString = function isString(value) {
    return typeof value === 'string';
  };

  Type.isNotEmptyString = function isNotEmptyString(value) {
    return Type.isString(value) && value !== '';
  };

  Type.isSymbol = function isSymbol(value) {
    var type = typeof value;
    return type == 'symbol' || type === 'object' && value != null && Object.prototype.toString.call(value) == '[object Symbol]';
  };

  Type.isArray = function isArray(value) {
    return !Type.isNil(value) && Array.isArray(value);
  };

  Type.isArrayLike = function isArrayLike(value) {
    return !Type.isNil(value) && !Type.isFunction(value) && value.length > -1 && value.length <= Number.MAX_SAFE_INTEGER;
  };

  Type.isObject = function isObject(value) {
    return !!value && typeof value === 'object';
  };

  Type.isPlainObject = function isPlainObject(value) {
    if (!Type.isObject(value) || Object.prototype.toString.call(value) !== '[object Object]') {
      return false;
    }

    var proto = Object.getPrototypeOf(value);

    if (proto === null) {
      return true;
    }

    var ctor = proto.hasOwnProperty('constructor') && proto.constructor;
    return typeof ctor === 'function' && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
  };

  Type.isFunction = function isFunction(value) {
    return typeof value === 'function';
  };

  Type.isNumber = function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  };

  Type.isInteger = function isInteger(value) {
    return Type.isNumber(value) && value % 1 === 0;
  };

  Type.isFloat = function isFloat(value) {
    return Type.isNumber(value) && !Type.isInteger(value);
  };

  Type.isBoolean = function isBoolean(value) {
    return value === true || value === false;
  };

  Type.isTrue = function isTrue(value) {
    return value === true;
  };

  Type.isFalse = function isFalse(value) {
    return value === false;
  };

  Type.isUndefined = function isUndefined(value) {
    return typeof value === 'undefined';
  };

  Type.isNull = function isNull(value) {
    return value === null;
  };

  Type.isNil = function isNil(value) {
    return value === null || value === undefined;
  };

  Type.isDate = function isDate(value) {
    return Type.isObject(value) && Object.prototype.toString.call(value) === '[object Date]';
  };

  Type.isDomNode = function isDomNode(value) {
    return Type.isObject(value) && !Type.isPlainObject(value) && 'nodeType' in value;
  };

  Type.isElementNode = function isElementNode(value) {
    return Type.isDomNode(value) && value.nodeType === Node.ELEMENT_NODE;
  };

  Type.isTextNode = function isTextNode(value) {
    return Type.isDomNode(value) && value.nodeType === Node.TEXT_NODE;
  };

  Type.isPrototype = function isPrototype(value) {
    return (typeof (value && value.constructor) === 'function' && value.constructor.prototype || Object.prototype) === value;
  };

  Type.isMap = function isMap(value) {
    return Type.isObject(value) && getTag(value) === '[object Map]';
  };

  Type.isSet = function isSet(value) {
    return Type.isObject(value) && getTag(value) === '[object Set]';
  };

  Type.isWeakMap = function isWeakMap(value) {
    return Type.isObject(value) && getTag(value) === '[object WeakMap]';
  };

  Type.isWeakSet = function isWeakSet(value) {
    return Type.isObject(value) && getTag(value) === '[object WeakSet]';
  };

  Type.isBlob = function isBlob(value) {
    return Type.isObject(value) && Type.isNumber(value.size) && Type.isString(value.type) && Type.isFunction(value.slice);
  };

  Type.isFormData = function isFormData(value) {
    return value instanceof FormData;
  };

  Type.isPromise = function isPromise(value) {
    return !Type.isNil(value) && Type.isFunction(value.then) && Type.isFunction(value["catch"]);
  };

  Type.toNumber = function toNumber(value) {
    var parsedValue = parseFloat(value);
    return Type.isNumber(parsedValue) ? parsedValue : 0;
  };

  Type.toInteger = function toInteger(value) {
    return Type.toNumber(parseInt(value, 10));
  };

  Type.toFloat = function toFloat(value) {
    return parseFloat(value);
  };

  Type.toBoolean = function toBoolean(value, trueValues) {
    if (trueValues === void 0) {
      trueValues = [];
    }

    var transformedValue = Type.isString(value) ? value.toLowerCase() : value;
    return ['true', '1', 1, true].concat(trueValues).includes(transformedValue);
  };

  Type.toString = function toString(value) {
    return value == null ? '' : Array.isArray(value) || Type.isPlainObject(value) && value.toString === Object.prototype.toString ? JSON.stringify(value, null, 2) : String(value);
  };

  Type.toObject = function toObject(arr) {
    var res = {};

    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }

    return res;
  };

  Type.toArray = function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);

    while (i--) {
      ret[i] = list[i + start];
    }

    return ret;
  };

  return Type;
}();

function getTag(value) {
  return Object.prototype.toString.call(value);
}

function extend(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }

  return to;
}

function initUse(B) {
  B.use = function (plugin) {
    var args = Type.toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
  };
}

var stack = [];
var isReady = false;
function ready(handler) {
  switch (document.readyState) {
    case 'loading':
      stack.push(handler);
      break;

    case 'interactive':
    case 'complete':
      if (Type.isFunction(handler)) {
        handler();
      }

      isReady = true;
      break;
  }
}
document.addEventListener('readystatechange', function () {
  if (!isReady) {
    stack.forEach(ready);
    stack = [];
  }
});

function B(node) {
  if (Type.isNotEmptyString(node)) {
    return document.getElementById(node);
  }

  if (Type.isDomNode(node)) {
    return node;
  }

  if (Type.isFunction(node)) {
    return ready(node);
  }

  return null;
}

initExtend(B);
initTmp(B);
initUse(B);

var UA = navigator.userAgent.toLowerCase();
function initBrowser(B) {
  B.extend({
    browser: Browser
  });
}

var Browser = /*#__PURE__*/function () {
  function Browser() {}

  Browser.isOpera = function isOpera() {
    return UA.includes('opera');
  };

  Browser.isIE = function isIE() {
    return 'attachEvent' in document && !Browser.isOpera();
  };

  Browser.isIE6 = function isIE6() {
    return UA.includes('msie 6');
  };

  Browser.isIE7 = function isIE7() {
    return UA.includes('msie 7');
  };

  Browser.isIE8 = function isIE8() {
    return UA.includes('msie 8');
  };

  Browser.isIE9 = function isIE9() {
    return 'documentMode' in document && document.documentMode >= 9;
  };

  Browser.isIE10 = function isIE10() {
    return 'documentMode' in document && document.documentMode >= 10;
  };

  Browser.isSafari = function isSafari() {
    return UA.includes('webkit');
  };

  Browser.isFirefox = function isFirefox() {
    return UA.includes('firefox');
  };

  Browser.isChrome = function isChrome() {
    return UA.includes('chrome');
  };

  Browser.detectIEVersion = function detectIEVersion() {
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
  };

  Browser.isIE11 = function isIE11() {
    return Browser.detectIEVersion() >= 11;
  };

  Browser.isMac = function isMac() {
    return UA.includes('macintosh');
  };

  Browser.isAndroid = function isAndroid() {
    return UA.includes('android');
  };

  Browser.isIPad = function isIPad() {
    return UA.includes('ipad;');
  };

  Browser.isIPhone = function isIPhone() {
    return UA.includes('iphone;');
  };

  Browser.isIOS = function isIOS() {
    return Browser.isIPad() || Browser.isIPhone();
  };

  Browser.isMobile = function isMobile() {
    return Browser.isIPhone() || Browser.isIPad() || Browser.isAndroid() || UA.includes('mobile') || UA.includes('touch');
  };

  Browser.isRetina = function isRetina() {
    return window.devicePixelRatio && window.devicePixelRatio >= 2;
  };

  Browser.isDoctype = function isDoctype(target) {
    var doc = target || document;

    if (doc.compatMode) {
      return doc.compatMode === 'CSS1Compat';
    }

    return doc.documentElement && doc.documentElement.clientHeight;
  };

  Browser.isLocalStorageSupported = function isLocalStorageSupported() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  };

  Browser.detectAndroidVersion = function detectAndroidVersion() {
    var re = new RegExp('Android ([0-9]+[.0-9]*)');

    if (re.exec(navigator.userAgent) != null) {
      var res = navigator.userAgent.match(re);

      if (Type.isArrayLike(res) && res.length > 0) {
        return parseFloat(res[1]);
      }
    }

    return 0;
  };

  Browser.isPropertySupported = function isPropertySupported(jsProperty, returnCSSName) {
    if (jsProperty === '') {
      return false;
    }

    function getCssName(propertyName) {
      return propertyName.replace(/([A-Z])/g, function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return "-" + args[1].toLowerCase();
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
    var props = ['Webkit', 'Moz', 'O', 'ms'].join(ucProperty + " ");
    var properties = (property + " " + props + " " + ucProperty).split(' ');
    var obj = document.body || document.documentElement;

    for (var i = 0; i < properties.length; i += 1) {
      var prop = properties[i];

      if (obj && 'style' in obj && prop in obj.style) {
        var lowerProp = prop.substr(0, prop.length - property.length).toLowerCase();
        var prefix = prop === property ? '' : "-" + lowerProp + "-";
        return bReturnCSSName ? prefix + getCssName(property) : prop;
      }
    }

    return false;
  };

  return Browser;
}();

var rsAstralRange = "\\ud800-\\udfff";
var rsComboMarksRange = "\\u0300-\\u036f";
var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange = "\\u20d0-\\u20ff";
var rsComboMarksExtendedRange = "\\u1ab0-\\u1aff";
var rsComboMarksSupplementRange = "\\u1dc0-\\u1dff";
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange;
var rsVarRange = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange + "]";
var rsCombo = "[" + rsComboRange + "]";
var rsFitz = "\\ud83c[\\udffb-\\udfff]";
var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
var rsNonAstral = "[^" + rsAstralRange + "]";
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsZWJ = "\\u200d";
var reOptMod = rsModifier + "?";
var rsOptVar = "[" + rsVarRange + "]?";
var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ")" + (rsOptVar + reOptMod) + ")*";
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsNonAstralCombo = "" + rsNonAstral + rsCombo + "?";
var rsSymbol = "(?:" + [rsNonAstralCombo, rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ")";
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + (rsSymbol + rsSeq), 'g');
var reHasUnicode = RegExp("[" + (rsZWJ + rsAstralRange + rsComboRange + rsVarRange) + "]");
var rsDingbatRange = "\\u2700-\\u27bf";
var rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff';
var rsMathOpRange = '\\xac\\xb1\\xd7\\xf7';
var rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf';
var rsPunctuationRange = "\\u2000-\\u206f";
var rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
var rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde';
var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos = "['\u2019]";
var rsBreak = "[" + rsBreakRange + "]";
var rsDigit = '\\d';
var rsDingbat = "[" + rsDingbatRange + "]";
var rsLower = "[" + rsLowerRange + "]";
var rsMisc = "[^" + rsAstralRange + (rsBreakRange + rsDigit + rsDingbatRange + rsLowerRange + rsUpperRange) + "]";
var rsUpper = "[" + rsUpperRange + "]";
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")";
var rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")";
var rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?";
var rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?";
var rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])';
var rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])';
var rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join('|') + ")" + rsSeq;
var reUnicodeWords = RegExp([rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, '$'].join('|') + ")", rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ")", rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower, rsUpper + "+" + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigit + "+", rsEmoji].join('|'), 'g');
function initUnicode(B) {
  B.extend({
    unicode: Unicode
  });
}

var Unicode = /*#__PURE__*/function () {
  function Unicode() {}

  Unicode.has = function has(string) {
    return reHasUnicode.test(string);
  };

  Unicode.toArray = function toArray(string) {
    return string.match(reUnicode) || [];
  };

  Unicode.size = function size(string) {
    var result = reUnicode.lastIndex = 0;

    while (reUnicode.test(string)) {
      ++result;
    }

    return result;
  };

  Unicode.words = function words(string) {
    return string.match(reUnicodeWords);
  };

  return Unicode;
}();

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

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
function initText(B) {
  B.extend({
    text: Text
  });
}

var Text = /*#__PURE__*/function () {
  function Text() {}

  Text.encode = function encode(value) {
    if (Type.isString(value)) {
      return value.replace(reEscape, function (item) {
        return escapeEntities[item];
      });
    }

    return value;
  };

  Text.decode = function decode(value) {
    if (Type.isString(value)) {
      return value.replace(reUnescape, function (item) {
        return unescapeEntities[item];
      });
    }

    return value;
  };

  Text.getRandom = function getRandom(length) {
    if (length === void 0) {
      length = 8;
    }

    return [].concat(Array(length)).map(function () {
      return (~~(Math.random() * 36)).toString(36);
    }).join('');
  };

  Text.toCamelCase = function toCamelCase(str) {
    if (Type.isString(str) && Type.isEmptyString(str)) {
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
  };

  Text.toPascalCase = function toPascalCase(str) {
    if (Type.isEmpty(str)) {
      return str;
    }

    return Text.capitalize(Text.toCamelCase(str));
  };

  Text.toKebabCase = function toKebabCase(str) {
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
  };

  Text.capitalize = function capitalize(str) {
    if (Type.isEmpty(str)) {
      return str;
    }

    return str[0].toUpperCase() + str.substr(1);
  };

  Text.isIn = function isIn(symbol, string) {
    string = Type.toString(string);
    return string.indexOf(Type.toString(symbol)) !== -1;
  };

  Text.trim = function trim(value, chars) {
    if (chars === void 0) {
      chars = undefined;
    }

    value = Type.toString(value);
    if (chars === undefined) return value.trim();
    var strSymbols = Text.toArray(value);
    var chrSymbols = Text.toArray(chars);
    var start = Text.charsStartIndex(strSymbols, chrSymbols);
    var end = Text.charsEndIndex(strSymbols, chrSymbols) + 1;
    return Arrays.castSlice(strSymbols, start, end).join('');
  };

  Text.trimLeft = function trimLeft(string, chars) {
    string = Type.toString(string);
    if (string.length && chars === undefined) return string[''.trimLeft ? 'trimLeft' : 'trimStart']();
    if (!string.length || !chars) return "";
    var strSymbols = Text.toArray(string);
    var start = Text.charsStartIndex(strSymbols, Text.toArray(chars));
    return Arrays.castSlice(strSymbols, start).join('');
  };

  Text.trimRight = function trimRight(string, chars) {
    string = Type.toString(string);
    if (string.length && chars === undefined) return string[''.trimRight ? 'trimRight' : 'trimEnd']();
    if (!string.length || !chars) return "";
    var strSymbols = Text.toArray(string);
    var end = Text.charsEndIndex(strSymbols, Text.toArray(chars)) + 1;
    return Arrays.castSlice(strSymbols, 0, end).join('');
  };

  Text.charsStartIndex = function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1;
    var length = strSymbols.length;

    while (++index < length && Arrays.baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}

    return index;
  };

  Text.charsEndIndex = function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && Arrays.baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}

    return index;
  };

  Text.toArray = function toArray(value) {
    return Unicode.has(value) ? Unicode.toArray(value) : value.split('');
  };

  Text.replaceSubstring = function replaceSubstring(string, replacement, start, length) {
    if (length === void 0) {
      length = null;
    }

    string = Type.toString(string);
    var stringLength = string.length;
    if (start < 0) start = Math.max(0, stringLength + start);else if (start > stringLength) start = stringLength;
    if (length !== null && length < 0) length = Math.max(0, stringLength - start + length);else if (length === null || length > stringLength) length = stringLength;
    if (start + length > stringLength) length = stringLength - start;
    return string.substr(0, start) + replacement + string.substr(start + length, stringLength - start - length);
  };

  Text.truncateBegin = function truncateBegin(string, length, trimMarker) {
    if (trimMarker === void 0) {
      trimMarker = "...";
    }

    string = Type.toString(string);
    var stringLength = string.length;
    if (stringLength <= length) return string;
    trimMarker = Type.toString(trimMarker);
    var trimMarkerLength = trimMarker.length;
    return Text.replaceSubstring(string, trimMarker, 0, -length + trimMarkerLength);
  };

  Text.truncateMiddle = function truncateMiddle(string, length, trimMarker) {
    if (trimMarker === void 0) {
      trimMarker = "...";
    }

    string = Type.toString(string);
    var stringLength = string.length;
    if (stringLength <= length) return string;
    trimMarker = Type.toString(trimMarker);
    var trimMarkerLength = trimMarker.length;
    var start = Type.toInteger(Math.ceil((length - trimMarkerLength) / 2));
    var end = length - start - trimMarkerLength;
    return Text.replaceSubstring(string, trimMarker, start, -end);
  };

  Text.truncateEnd = function truncateEnd(string, length, trimMarker) {
    if (trimMarker === void 0) {
      trimMarker = "...";
    }

    string = Type.toString(string);
    var stringLength = string.length;
    if (stringLength <= length) return string;
    trimMarker = Type.toString(trimMarker);
    var trimMarkerLength = trimMarker.length;
    return Text.trim(string.substr(0, length - trimMarkerLength)) + trimMarker;
  };

  Text.replaceMacros = function replaceMacros(string, rules, tagStart, tagEnd) {
    if (tagStart === void 0) {
      tagStart = "#";
    }

    if (tagEnd === void 0) {
      tagEnd = "#";
    }

    if (Type.isObject(rules)) {
      var macros = {};
      Object.keys(rules).forEach(function (key) {
        macros[tagStart + key + tagEnd] = rules[key];
      });
      string = Text.replace(string, macros);
    }

    return string;
  };

  Text.replace = function replace(string, rules, flag) {
    if (flag === void 0) {
      flag = 'g';
    }

    string = Type.toString(string);

    if (Type.isObject(rules)) {
      Object.keys(rules).forEach(function (key) {
        string = string.replace(new RegExp(key, flag), rules[key]);
      });
    }

    return string;
  };

  Text.nl2br = function nl2br(value) {
    if (!value || !value.replace) return value;
    return value.replace(/([^>])\n/g, '$1<br/>');
  };

  Text.stripTags = function stripTags(value) {
    if (!value || !value.split) return value;
    return value.split(/<[^>]+>/g).join('');
  };

  Text.stripPhpTags = function stripPhpTags(value) {
    if (!value || !value.replace) return value;
    return value.replace(/<\?(.|[\r\n])*?\?>/g, '');
  };

  Text.explode = function explode(value, separator, trim, skipEmpty) {
    if (separator === void 0) {
      separator = ',';
    }

    if (trim === void 0) {
      trim = true;
    }

    if (skipEmpty === void 0) {
      skipEmpty = false;
    }

    value = Type.toString(value);
    var result = value.split(separator);

    if (!!trim) {
      result = result.map(function (i) {
        return Text.trim(i);
      });
    }

    if (skipEmpty) {
      result = result.filter(function (i) {
        return i !== "";
      });
    }

    return result;
  };

  Text.cut = function cut(value, offset, length) {
    if (length === void 0) {
      length = null;
    }

    value = Type.toString(value);
    return value.substr(offset, length);
  };

  Text.position = function position(needle, haystack, offset, insensitive, last) {
    if (offset === void 0) {
      offset = 0;
    }

    if (insensitive === void 0) {
      insensitive = false;
    }

    if (last === void 0) {
      last = false;
    }

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
  };

  Text.compare = function compare(value1, value2, length, insensitive) {
    if (length === void 0) {
      length = 0;
    }

    if (insensitive === void 0) {
      insensitive = false;
    }

    value1 = Type.toString(value1);
    value2 = Type.toString(value2);
    length = Type.toInteger(length);

    if (length > 0) {
      value1 = Text.cut(value1, 0, length);
      value2 = Text.cut(value2, 0, length);
    }

    return Text.position(value1, value2, 0, insensitive, false) === 0;
  };

  return Text;
}();

function initArrays(B) {
  B.extend({
    arrays: Arrays
  });
}

var Arrays = /*#__PURE__*/function () {
  function Arrays() {}

  Arrays.getValues = function getValues(array, clean) {
    if (clean === void 0) {
      clean = true;
    }

    if (Type.isArray(array)) return clean ? Arrays.clean(array) : array;

    if (Type.isObject(array)) {
      array = Object.values(array);
      return clean ? Arrays.clean(array) : array;
    }

    return [];
  };

  Arrays.getFirstValue = function getFirstValue(array, defaultValue, clean) {
    if (defaultValue === void 0) {
      defaultValue = null;
    }

    if (clean === void 0) {
      clean = true;
    }

    var values = Arrays.getValues(array, clean);
    return values.length ? values[0] : defaultValue;
  };

  Arrays.getLastValue = function getLastValue(array, defaultValue, clean) {
    if (defaultValue === void 0) {
      defaultValue = null;
    }

    if (clean === void 0) {
      clean = true;
    }

    var values = Arrays.getValues(array, clean);
    return values.length ? values[values.length - 1] : defaultValue;
  };

  Arrays.getKeys = function getKeys(array, convertKeyToString) {
    if (convertKeyToString === void 0) {
      convertKeyToString = false;
    }

    if (Type.isArray(array)) return array.map(function (v, i) {
      return convertKeyToString ? i.toString() : i;
    });
    if (Type.isObject(array)) return Object.keys(array);
    return [];
  };

  Arrays.getFirstKey = function getFirstKey(array, defaultValue, convertString) {
    if (defaultValue === void 0) {
      defaultValue = null;
    }

    if (convertString === void 0) {
      convertString = false;
    }

    var keys = Arrays.getKeys(array, convertString);
    return keys.length ? keys[0] : defaultValue;
  };

  Arrays.getLastKey = function getLastKey(array, defaultValue, convertString) {
    if (defaultValue === void 0) {
      defaultValue = null;
    }

    if (convertString === void 0) {
      convertString = false;
    }

    var keys = Arrays.getKeys(array, convertString);
    return keys.length ? keys[keys.length - 1] : defaultValue;
  };

  Arrays.clean = function clean(array) {
    if (Type.isArray(array)) return array.filter(function (value) {
      return !Type.isNil(value);
    });
    return [];
  };

  Arrays.keyExists = function keyExists(key, array) {
    if (Type.isArray(array)) return array.hasOwnProperty(key);
    if (Type.isObject(array)) return key in array;
    return false;
  };

  Arrays.isIn = function isIn(value, array) {
    if (Type.isArray(array)) return array.indexOf(value) >= 0;

    if (Type.isObject(array)) {
      var keys = Object.keys(array);

      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];

        if (array[key] === value) {
          return true;
        }
      }
    }

    return false;
  };

  Arrays.getRootValue = function getRootValue(array, key, defaultValue) {
    return Arrays.keyExists(key, array) ? array[key] : defaultValue;
  };

  Arrays.getValue = function getValue(array, key, defaultValue) {
    if (defaultValue === void 0) {
      defaultValue = null;
    }

    if (Type.isFunction(key)) return key(array, defaultValue);

    if (Type.isArray(key)) {
      var lastKey = key.pop();

      for (var _iterator = _createForOfIteratorHelperLoose(key), _step; !(_step = _iterator()).done;) {
        var keyPart = _step.value;
        array = Arrays.getValue(array, keyPart);
      }

      key = lastKey;
    }

    if ((Type.isArray(key) || Type.isObject(key)) && Arrays.keyExists(key, array)) return array[key];
    var pos = Text.position(".", key);

    if (pos !== false) {
      array = Arrays.getValue(array, Type.toString(key).substr(0, pos), defaultValue);
      key = Type.toString(key).substr(pos + 1);
      return Arrays.getValue(array, key, defaultValue);
    }

    return Arrays.keyExists(key, array) ? array[key] : defaultValue;
  };

  Arrays.remove = function remove(array, key, defaultValue) {
    if (defaultValue === void 0) {
      defaultValue = null;
    }

    if (Arrays.keyExists(key, array)) {
      var value = array[key];
      if (Type.isArray(array)) array.splice(array.indexOf(key), 1);
      if (Type.isObject(array)) delete array[key];
      return value;
    }

    return defaultValue;
  };

  Arrays.removeValue = function removeValue(array, value, defaultValue) {
    if (defaultValue === void 0) {
      defaultValue = null;
    }

    var result = defaultValue;

    if (Type.isArray(array)) {
      for (var key in array) {
        if (array.hasOwnProperty(key)) {
          var val = array[key];

          if (val === value) {
            result = key;
            Arrays.remove(array, key);
          }
        }
      }
    } else if (Type.isObject(array)) {
      var keys = Object.keys(array);

      for (var _i2 = 0, _keys2 = keys; _i2 < _keys2.length; _i2++) {
        var _key = _keys2[_i2];

        if (array[_key] === value) {
          result = _key;
          Arrays.remove(array, _key);
        }
      }
    }

    return result;
  };

  Arrays.getColumn = function getColumn(array, name, keepKeys) {
    if (keepKeys === void 0) {
      keepKeys = true;
    }

    var result = [];
    var resultObject = {};

    if (Type.isObject(array)) {
      var keys = Arrays.getKeys(array);

      for (var _iterator2 = _createForOfIteratorHelperLoose(keys), _step2; !(_step2 = _iterator2()).done;) {
        var key = _step2.value;
        var value = array[key];

        if (keepKeys) {
          resultObject[key] = Arrays.getValue(value, name);
        } else {
          result.push(Arrays.getValue(value, name));
        }
      }
    } else if (Type.isArray(array)) {
      for (var _iterator3 = _createForOfIteratorHelperLoose(array), _step3; !(_step3 = _iterator3()).done;) {
        var _value = _step3.value;
        result.push(Arrays.getValue(_value, name));
      }
    }

    return keepKeys ? resultObject : result;
  };

  Arrays.strictIndexOf = function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1;
    var length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }

    return -1;
  };

  Arrays.baseIndexOf = function baseIndexOf(array, value, fromIndex) {
    return value === value ? Arrays.strictIndexOf(array, value, fromIndex) : Arrays.baseFindIndex(array, function (value) {
      return value !== value;
    }, fromIndex);
  };

  Arrays.baseFindIndex = function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length;
    var index = fromIndex + (fromRight ? 1 : -1);

    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }

    return -1;
  };

  Arrays.slice = function slice(array, start, end) {
    var length = array == null ? 0 : array.length;

    if (!length) {
      return [];
    }

    start = start == null ? 0 : start;
    end = end === undefined ? length : end;

    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }

    end = end > length ? length : end;

    if (end < 0) {
      end += length;
    }

    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var index = -1;
    var result = new Array(length);

    while (++index < length) {
      result[index] = array[index + start];
    }

    return result;
  };

  Arrays.castSlice = function castSlice(array, start, end) {
    var length = array.length;
    end = end === undefined ? length : end;
    return !start && end >= length ? array : Arrays.slice(array, start, end);
  };

  Arrays.chunk = function chunk(array, size) {
    if (size === void 0) {
      size = 1;
    }

    size = Math.max(Type.toInteger(size), 0);
    var length = array == null ? 0 : array.length;

    if (!length || size < 1) {
      return [];
    }

    var index = 0;
    var resIndex = 0;
    var result = new Array(Math.ceil(length / size));

    while (index < length) {
      result[resIndex++] = Arrays.slice(array, index, index += size);
    }

    return result;
  };

  return Arrays;
}();

function initInjector(B) {
  B.extend({
    invoke: invoke
  });
}
function invoke(handler, context, args) {
  if (!Type.isFunction(handler)) return;
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && Type.isPromise(res)) {
      res["catch"](function (e) {
        return console.error(e);
      });
    }
  } catch (e) {
    console.error(e);
  }

  return res;
}

var registry = new WeakMap();
var Registry = /*#__PURE__*/function () {
  function Registry() {}

  var _proto = Registry.prototype;

  _proto.set = function set(target, event, listener) {
    var events = this.get(target);

    if (!Type.isArray(events[event])) {
      events[event] = [];
    }

    events[event].push(listener);
    registry.set(target, events);
  };

  _proto.get = function get(target) {
    return registry.get(target) || {};
  };

  _proto.has = function has(target, event, listener) {
    if (event && listener) {
      return registry.has(target) && registry.get(target)[event].indexOf(listener) >= 0;
    }

    return registry.has(target);
  };

  _proto["delete"] = function _delete(target, event, listener) {
    if (Type.isString(event) && Type.isFunction(listener)) {
      var events = registry.get(target);

      if (Type.isPlainObject(events) && Type.isArray(events[event])) {
        var cbs = events[event];
        var cb;
        var i = cbs.length;

        while (i--) {
          cb = cbs[i];

          if (cb === listener || cb.listener === listener) {
            cbs.splice(i, 1);
          }
        }
      }

      return;
    }

    if (Type.isString(event)) {
      var _events = registry.get(target);

      if (Type.isPlainObject(_events) && Type.isArray(_events[event])) {
        _events[event] = [];
      }

      return;
    }

    registry["delete"](target);
  };

  return Registry;
}();
var Registry$1 = new Registry();

function getProperties(target, keys) {
  if (keys === void 0) {
    keys = [];
  }

  var bKeys = !!keys && Array.isArray(keys) && keys.length > 0;
  return Object.getOwnPropertyNames(target).filter(function (key) {
    return !['name', 'length', 'prototype', 'caller', 'arguments'].includes(key);
  }).reduce(function (acc, key) {
    if (bKeys && keys.indexOf(key) >= 0 || !bKeys) {
      acc[key] = target[key];
    }

    return acc || {};
  }, {});
}

function initEvents(B) {
  B.extend(_extends({
    events: Events
  }, getProperties(Events), {
    ready: ready
  }));
}

var Events = /*#__PURE__*/function () {
  function Events() {}

  Events.$on = function $on(target, event, listener) {
    if (Type.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        Events.$on(target, event[i], listener);
      }

      return;
    }

    Registry$1.set(target, event, listener);
  };

  Events.$once = function $once(target, event, listener) {
    function on() {
      Events.$off(target, event, on);
      listener.apply(target, arguments);
    }

    on.listener = listener;
    Events.$on(target, event, on);
  };

  Events.$off = function $off(target, event, listener) {
    if (Type.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        Events.$off(target, event[i], listener);
      }

      return;
    }

    Registry$1["delete"](target, event, listener);
  };

  Events.$emit = function $emit(target, event) {
    var events = Registry$1.get(target);
    var cbs = events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? Type.toArray(cbs) : cbs;
      var args = Type.toArray(arguments, 2);

      for (var i = 0, l = cbs.length; i < l; i++) {
        invoke(cbs[i], target, args);
      }
    }
  };

  return Events;
}();

function initLibs(B) {
  initType(B);
  initBrowser(B);
  initUnicode(B);
  initArrays(B);
  initText(B);
  initInjector(B);
  initEvents(B);
}

initLibs(B);

export default B;
