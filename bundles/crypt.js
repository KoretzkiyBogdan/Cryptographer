'use strict';

var crypt = function () {
  // Just symbols for mock :)
  var RANDOM_SYMBOLS = ['g', 'h', 'i', 'p', 'q', 'r', 'y', 'z'].concat(['а', 'б', 'в']);
  // Flag for reversed value
  var REVERSE_SYMBOLS = ['j', 'k', 'l', 's', 't', 'u', '!', '$', '|', '@', '~'].concat(['г', 'д', 'е', '?']);
  // Flag for char code converted value
  var CHAR_CODE_SYMBOLS = ['m', 'n', 'o', 'v', 'w', 'x', '&', '^', '%', '#'].concat(['ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'с', 'т', 'у', 'ю', 'я']);

  var DECODE_REG_EXP = new RegExp('[a-f]?(\\d+|[a-f]|[' + CHAR_CODE_SYMBOLS.join('') + '])([a-f' + REVERSE_SYMBOLS.join('') + '])?', 'gi');
  var REVERSE_SYMBOL_REG_EXP = new RegExp('[' + REVERSE_SYMBOLS.join('') + ']', 'i');
  var CHAR_CODE_SYMBOLS_REG_EXP = new RegExp('[' + CHAR_CODE_SYMBOLS.join('') + ']', 'i');

  var utils = {
    /**
     * @returns {boolean}
     */
    getRandomBoolean: function getRandomBoolean() {
      return !!Math.round(Math.random());
    },

    /**
     * @param max    {number}
     * @param min    {number}
     * @returns      {number}
     */
    getRandomIntegerFromRange: function getRandomIntegerFromRange() {
      var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return Math.floor(Math.random() * (max - min) + min);
    },

    /**
     * Returns a reversed string
     *
     * @param source            {string}
     * @returns                 {string}
     */
    reverseString: function reverseString(source) {
      return source.split('').reverse().join('');
    },

    /**
     * Convert string to random case
     *
     * @param string {string}
     * @returns      {string}
     */
    toRandomCase: function toRandomCase() {
      var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      return string[this.getRandomBoolean() ? 'toUpperCase' : 'toLowerCase']();
    },

    /**
     * Returns random character from list
     *
     * @param  list       {array}
     * @return            {string}
     */
    getRandomCharacterFromList: function getRandomCharacterFromList() {
      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return list[utils.getRandomIntegerFromRange(list.length - 1)];
    },

    /**
     * @param  firstOperand     {number}
     * @param  secondOperands   {array}
     * @returns                 {number}
     */
    bitwiseXOR: function bitwiseXOR(firstOperand, secondOperands) {
      secondOperands.forEach(function (value) {
        return firstOperand ^= Math.floor(value / secondOperands.length);
      });
      return firstOperand;
    },

    /**
     * @param key   {string}
     * @returns     {number[]}
     */
    getEveryCharactersCode: function getEveryCharactersCode(key) {
      return key.split('').map(function (char) {
        return char.charCodeAt(0);
      });
    }
  };

  var wrapInRandomLetters = function wrapInRandomLetters(char) {
    var result = char;

    if (utils.getRandomBoolean()) {
      var matchedSymbol = CHAR_CODE_SYMBOLS.find(function (symbol) {
        return symbol.charCodeAt(0) === parseInt(char, 16);
      });
      if (matchedSymbol) result = utils.toRandomCase(matchedSymbol);
    }
    if (utils.getRandomBoolean()) {
      var randomChar = utils.toRandomCase(utils.getRandomCharacterFromList(REVERSE_SYMBOLS));
      result = utils.reverseString(char) + randomChar;
    }

    var paddingRight = utils.getRandomIntegerFromRange(4, 1);
    var paddingLeft = utils.getRandomIntegerFromRange(4, 1);

    for (var i = 0; i < paddingRight + paddingLeft; i++) {
      var randomLetter = utils.toRandomCase(utils.getRandomCharacterFromList(RANDOM_SYMBOLS));
      if (i < paddingRight) {
        result = result + randomLetter;
      } else {
        result = randomLetter + result;
      }
    }

    return result;
  };

  var encode = function encode(text, key) {

    if (!text) throw new Error('You must put message for right work');
    if (!key) throw new Error('You must put key for right work');

    var keys = utils.getEveryCharactersCode(key);

    return text.split('').map(function (char) {
      return wrapInRandomLetters(utils.bitwiseXOR(char.charCodeAt(0), keys).toString(16));
    }).join('');
  };

  var decode = function decode(text, key) {

    if (!key) throw new Error('You must put key as second parameter');

    var keys = utils.getEveryCharactersCode(key);
    var matchedArray = text.match(DECODE_REG_EXP);

    if (!matchedArray) return text;

    return matchedArray.map(function (char) {
      if (char.match(REVERSE_SYMBOL_REG_EXP)) {
        char = utils.reverseString(char.replace(REVERSE_SYMBOL_REG_EXP, ''));
      };
      if (char.match(CHAR_CODE_SYMBOLS_REG_EXP)) {
        char = char.toLowerCase().charCodeAt(0).toString(16);
      }
      char = utils.bitwiseXOR(parseInt(char, 16), keys);
      return String.fromCharCode(char);
    }).join('');
  };

  return {
    encode: encode,
    decode: decode
  };
}();
//# sourceMappingURL=crypt.js.map
