var crypt = (function() {

  // Random symbols
  var letters = ['g', 'h', 'i', 'p', 'q', 'r', 'y', 'z'].concat(["а", "б", "в"]);
  // flag symbols, that means as value must be reversed
  var specReverse = ['j', 'k', 'l', 's', 't', 'u', '!', '$', '|', '@', '~'].concat(["г", "д", "е", "?"]);
  //flag symbols, that means as value symbol must be conver to charCode
  var specChar = ['m', 'n', 'o', 'v', 'w', 'x', '&', '^',  '%', '#'].concat(["ё", "ж", "з","и", "й","к","л","м", "с", "т", "у", "ю", "я"]);

  var getTrueOrFalse = function() {
    return !!Math.round(Math.random());
  }

  var getRandomInteger = function(max, min) {
    return Math.floor(Math.random() * max + (min || 0));
  };

  var reverseValue = function(val) {
    return val.split('').reverse().join('');
  };

  var getRandomChar = function(charList) {
    var char = charList[getRandomInteger(charList.length - 1)];
    return (getTrueOrFalse() ? char.toUpperCase() : char);
  };

  var wrappedInRandomletters = function(char) {

    var charList = char;

    //Convert number to letter
    if (getTrueOrFalse()) {
      specChar.forEach(function(spec) {
        if (spec.charCodeAt(0) == parseInt(char, 16)) {
          char = getTrueOrFalse() ? spec.toUpperCase(): spec;
        }
      });
    } 
    if (getTrueOrFalse()) {
      charList = reverseValue(char) + getRandomChar(specReverse);
    }
    var countRightLetters = getRandomInteger(4,1);
    var countLeftLetters = getRandomInteger(4,1);

    for (var i = 0; i < countRightLetters; i++) {
      charList += getTrueOrFalse() ? getRandomChar(letters).toUpperCase(): getRandomChar(letters);
    }
    for (var i = 0; i < countLeftLetters; i++) {
      charList = (getTrueOrFalse() ? getRandomChar(letters).toUpperCase() : getRandomChar(letters)) + charList;
    }

    return charList;
  };

  var getEveryCharacterCodeArray = function(key) {

    //creating groups for every symbol code.
    return key.toString().split('').map(function(char) {
      return char.charCodeAt(0);
    });

  };

  var bitwiseXOR = function(firstOperand, secondOperandsArray) {
    secondOperandsArray.forEach(function(value) {
      firstOperand ^= Math.floor(value/secondOperandsArray.length);
    });
    return firstOperand;    
  }


  var encode = function(text, key) {

    if (text === (undefined || '' )) {
      return Error('You must put message for right work');
    } else if (key === (undefined || '' )) {
      return Error('You must put key for right work');
    }

    var keys = getEveryCharacterCodeArray(key);

    return text.toString().split('').map(function(char) {
      char = bitwiseXOR(char.charCodeAt(0), keys);
      return wrappedInRandomletters(char.toString(16));
    }).join('');

  };

  var decode = function(text, key) {

    if (key === undefined || key === '') {
      return new Error('You must put key as second parameter');
    }

    var exp = new RegExp('[a-f]?(\\d+|[a-f]|[' + specChar.join('') + '])([a-f' + specReverse.join('') + '])?', 'gi');
    var specReverseExp = new RegExp('[' + specReverse.join('') + ']', 'i');
    var specCharExp = new RegExp('[' + specChar.join('') + ']', 'i');

    var keys = getEveryCharacterCodeArray(key);
    var matchArray = text.match(exp);
    if (!matchArray) {
      return text;
    }
    return matchArray.map(function(char) {
      //if match specReverse symbols, then need remove that symbols and return reversed value
      if (char.match(specReverseExp)) {
        char = reverseValue(char.replace(specReverseExp, ''));
      };
      //if match specChar symbols, then need conver to lowerCase and get char code in hexadecimal system
      if (char.match(specCharExp)) {
        char = char.toLowerCase().charCodeAt(0).toString(16);
      }
      char = bitwiseXOR(parseInt(char, 16), keys);
      return String.fromCharCode(char);
    }).join('');
  };

  return {
    encode: encode,
    decode: decode
  };
})();
