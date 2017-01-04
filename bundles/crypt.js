'use strict';

var crypt = function () {

  // Random symbols
  var letters = ['g', 'h', 'i', 'p', 'q', 'r', 'y', 'z'].concat(["а", "б", "в"]);
  // flag symbols, that means as value must be reversed
  var specReverse = ['j', 'k', 'l', 's', 't', 'u', '!', '$', '|', '@', '~'].concat(["г", "д", "е", "?"]);
  //flag symbols, that means as value symbol must be conver to charCode
  var specChar = ['m', 'n', 'o', 'v', 'w', 'x', '&', '^', '%', '#'].concat(["ё", "ж", "з", "и", "й", "к", "л", "м", "с", "т", "у", "ю", "я"]);

  var exp = new RegExp('[a-f]?(\\d+|[a-f]|[' + specChar.join('') + '])([a-f' + specReverse.join('') + '])?', 'gi');
  var specReverseExp = new RegExp('[' + specReverse.join('') + ']', 'i');
  var specCharExp = new RegExp('[' + specChar.join('') + ']', 'i');

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
     * This returns reversed string
     *
     * @param sourceString      {string}
     * @returns                 {string}
     */
    reverseString: function reverseString(sourceString) {
      return sourceString.split('').reverse().join('');
    },


    /**
     * Returns random character from list
     *
     * @param  list       {array}
     * @return            {string}
     */
    getRandomCharacterFromList: function getRandomCharacterFromList(list) {
      var char = list[utils.getRandomIntegerFromRange(list.length - 1)];
      return utils.getRandomBoolean() ? char.toUpperCase() : char;
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

  var wrappedInRandomletters = function wrappedInRandomletters(char) {

    var charList = char;

    //Convert number to letter
    if (utils.getRandomBoolean()) {
      specChar.forEach(function (spec) {
        if (spec.charCodeAt(0) == parseInt(char, 16)) {
          char = utils.getRandomBoolean() ? spec.toUpperCase() : spec;
        }
      });
    }
    if (utils.getRandomBoolean()) {
      charList = utils.reverseString(char) + utils.getRandomCharacterFromList(specReverse);
    }
    var countOfRightLetters = utils.getRandomIntegerFromRange(4, 1),
        countOfLeftLetters = utils.getRandomIntegerFromRange(4, 1);

    for (var i = 0; i < countOfRightLetters + countOfLeftLetters; i++) {
      var randomLetter = utils.getRandomBoolean() ? utils.getRandomCharacterFromList(letters).toUpperCase() : utils.getRandomCharacterFromList(letters);
      if (i < countOfRightLetters) {
        charList += randomLetter;
      } else {
        charList = randomLetter + charList;
      }
    }

    return charList;
  };

  var encode = function encode(text, key) {

    if (text === (undefined || '')) {
      return Error('You must put message for right work');
    } else if (key === (undefined || '')) {
      return Error('You must put key for right work');
    }

    var keys = utils.getEveryCharactersCode(key);

    return text.split('').map(function (char) {
      return wrappedInRandomletters(utils.bitwiseXOR(char.charCodeAt(0), keys).toString(16));
    }).join('');
  };

  var decode = function decode(text, key) {
    if (key === undefined || key === '') {
      return new Error('You must put key as second parameter');
    }

    var keys = utils.getEveryCharactersCode(key),
        matchArray = text.match(exp);

    if (!matchArray) {
      return text;
    }

    return matchArray.map(function (char) {
      //if match specReverse symbols, then need remove that symbols and return reversed value
      if (char.match(specReverseExp)) {
        char = utils.reverseString(char.replace(specReverseExp, ''));
      };
      //if match specChar symbols, then need conver to lowerCase and get char code in hexadecimal system
      if (char.match(specCharExp)) {
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