var crypt = (function() {

  // Random symbols
  var letters = ['g','i','j','k','l','m', 'n','o', 'p', 'q', 'r', 's', 'x', 'y', 'z'];
  // flag symbols
  var spec = ['w', 'h', 't', 'u', 'v', 'w'];

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

    var charList = getTrueOrFalse() ? reverseValue(char) + getRandomChar(spec) : char;
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
      firstOperand ^= parseInt(value/secondOperandsArray.length);
    });
    return firstOperand;    
  }


  var create = function(text, key) {

    if (key === undefined || key === '') {
      return Error('You must put key as second parameter');
    }

    var keys = getEveryCharacterCodeArray(key);

    return text.toString().split('').map(function(char) {
      char = bitwiseXOR(char.charCodeAt(0), keys);
      return wrappedInRandomletters(char.toString(16));
    }).join('');

  };

  var parse = function(text, key) {

    if (key === undefined || key === '') {
      return new Error('You must put key as second parameter');
    }

    var exp = new RegExp('[a-f]?\\d{1,2}([a-f' + spec.join('') + '])?', 'gi');
    var specExp = new RegExp('[' + spec.join('') + ']', 'i');

    var keys = getEveryCharacterCodeArray(key);

    return text.match(exp).map(function(char) {
      //if match spec symbols, then need remove that symbols and return reversed value
      if (char.match(specExp)) {
        char = reverseValue(char.replace(specExp, ''));
      };
      char = bitwiseXOR(parseInt(char, 16), keys);
      return String.fromCharCode(char);
    }).join('');
  };

  return {
    create: create,
    parse: parse
  };
})();

var message = 'Hello, I love you!',
    key = 'qwvvu4556';

for (var i = 0; i < 1000; i++) {
  var test = crypt.create(message, key);
  var test = crypt.parse(test, key);
  console.log(test === message);
}

console.log('origin message: \n'.toUpperCase(), message);

message = crypt.create(message, key);

console.log('cryptographic message: \n'.toUpperCase(), message);

message = crypt.parse(message, key);

console.log('parsing message: \n'.toUpperCase(), message);
