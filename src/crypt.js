var crypt = (function() {

  // Random symbols
  var letters = ['k','l','m', 'n'];
  // flag symbols, that means as value must be reversed
  var specReverse = ['h', 'u', 'i', 'в', 'г', 'д', 'ж', 'я'];
  //flag symbols, that means as value symbol must be conver to charCode
  var specChar = ['v', 'w', 't', 'g', 'j', 'з', 'ё', 'а', 'й'];

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
  }

  var wrappedInRandomletters = function(char) {

    var charList = char;

    if (getTrueOrFalse()) {
      specChar.forEach(function(spec) {
        if (spec.charCodeAt(0) == parseInt(char, 16)) {
          char = getTrueOrFalse() ? spec.toUpperCase(): spec;
        }
      });
    } else {
      charList = reverseValue(char) + getRandomChar(specReverse);
    }
    var countLetters = getRandomInteger(3,1);

    for (var i = 0; i < countLetters; i++) {
      charList += getRandomChar(letters);
      charList = getRandomChar(letters) + charList;
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
      firstOperand ^= value % secondOperandsArray;
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
