const crypt = (function() {
  // Just symbols for mock :)
  const RANDOM_SYMBOLS = [
    ...['g', 'h', 'i', 'p', 'q', 'r', 'y', 'z'],
    ...['а', 'б', 'в']
  ];
  // Flag for reversed value
  const REVERSE_SYMBOLS = [
    ...['j', 'k', 'l', 's', 't', 'u', '!', '$', '|', '@', '~'],
    ...['г', 'д', 'е', '?']
  ];
  // Flag for char code converted value
  const CHAR_CODE_SYMBOLS = [
    ...['m', 'n', 'o', 'v', 'w', 'x', '&', '^',  '%', '#'],
    ...['ё', 'ж', 'з','и', 'й','к','л','м', 'с', 'т', 'у', 'ю', 'я']
  ];

  const DECODE_REG_EXP = new RegExp(`[a-f]?(\\d+|[a-f]|[${CHAR_CODE_SYMBOLS.join('')}])([a-f${REVERSE_SYMBOLS.join('')}])?`, 'gi');
  const REVERSE_SYMBOL_REG_EXP = new RegExp(`[${REVERSE_SYMBOLS.join('')}]`, 'i');
  const CHAR_CODE_SYMBOLS_REG_EXP = new RegExp(`[${CHAR_CODE_SYMBOLS.join('')}]`, 'i');

  const utils = {
    /**
     * @returns {boolean}
     */
    getRandomBoolean() {
      return !!Math.round(Math.random());
    },
    /**
     * @param max    {number}
     * @param min    {number}
     * @returns      {number}
     */
    getRandomIntegerFromRange(max = 1, min = 0) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    /**
     * Returns a reversed string
     *
     * @param source            {string}
     * @returns                 {string}
     */
    reverseString(source) {
      return source.split('').reverse().join('');
    },
    /**
     * Convert string to random case
     *
     * @param string {string}
     * @returns      {string}
     */
    toRandomCase(string = '') {
      return string[this.getRandomBoolean() ? 'toUpperCase' : 'toLowerCase']();
    },
    /**
     * Returns random character from list
     *
     * @param  list       {array}
     * @return            {string}
     */
    getRandomCharacterFromList(list = []) {
      return list[utils.getRandomIntegerFromRange(list.length - 1)];
    },
    /**
     * @param  firstOperand     {number}
     * @param  secondOperands   {array}
     * @returns                 {number}
     */
    bitwiseXOR(firstOperand, secondOperands) {
      secondOperands.forEach(value => firstOperand ^= Math.floor(value / secondOperands.length));
      return firstOperand;
    },
    /**
     * @param key   {string}
     * @returns     {number[]}
     */
    getEveryCharactersCode(key) {
      return key.split('').map(char => char.charCodeAt(0));
    }
  };

  const wrapInRandomLetters = function(char) {
    let result = char;

    if (utils.getRandomBoolean()) {
      const matchedSymbol = CHAR_CODE_SYMBOLS.find((symbol) => symbol.charCodeAt(0) === parseInt(char, 16));
      if (matchedSymbol) result = utils.toRandomCase(matchedSymbol);
    }
    if (utils.getRandomBoolean()) {
      const randomChar =  utils.toRandomCase(utils.getRandomCharacterFromList(REVERSE_SYMBOLS));
      result = utils.reverseString(char) + randomChar;
    }

    const paddingRight = utils.getRandomIntegerFromRange(4, 1);
    const paddingLeft = utils.getRandomIntegerFromRange(4, 1);

    for (let i = 0; i < paddingRight + paddingLeft; i++) {
      let randomLetter =  utils.toRandomCase(utils.getRandomCharacterFromList(RANDOM_SYMBOLS));
      if (i < paddingRight) {
        result = result + randomLetter;
      } else {
        result = randomLetter + result;
      }
    }

    return result;
  };


  const encode = (text, key) => {

    if (!text) throw new Error('You must put message for right work');
    if (!key) throw new Error('You must put key for right work');

    const keys = utils.getEveryCharactersCode(key);

    return text
      .split('')
      .map(char => (
        wrapInRandomLetters(
          utils
            .bitwiseXOR(char.charCodeAt(0), keys)
            .toString(16)
        )
      ))
      .join('');
  };

  const decode = (text, key) => {

    if (!key) throw new Error('You must put key as second parameter');

    const keys = utils.getEveryCharactersCode(key);
    const matchedArray = text.match(DECODE_REG_EXP);

    if (!matchedArray) return text;

    return matchedArray
      .map(char => {
        if (char.match(REVERSE_SYMBOL_REG_EXP)) {
          char = utils.reverseString(char.replace(REVERSE_SYMBOL_REG_EXP, ''));
        };
        if (char.match(CHAR_CODE_SYMBOLS_REG_EXP)) {
          char = char.toLowerCase().charCodeAt(0).toString(16);
        }
        char = utils.bitwiseXOR(parseInt(char, 16), keys);
        return String.fromCharCode(char);
      })
      .join('');
  };

  return {
    encode,
    decode
  };
})();
