var messages = {
  eng: "So we went with using Mocha, Chai and Sinon and they have proven to be a great workflow for us so far.",
  rus: "Эта часть позволит вам изучить JavaScript с нуля или упорядочить и дополнить существующие знания.",
  ukr: "Та хіба я знаю, що сюди писати? Може й нічого такого, хто його знае. І буква \"ї\" мене цікавить :)",
  de: "“Die Küchenuhr” is one of the most well-known short stories by Wolfgang Borchert and is often studied in German classes to introduce students to the concept of Trümmerliteratur."
 };

var key = "qqwweer";
var wrongKey = "eeddrr";
var count = 100;

var randomInt = function(max, min) {
  min = min || 0;
  return Math.floor(Math.random() * (max - min) + min);
};


describe('Cryptographer test', function() {
  var testData = {};

  describe('encode: non-equal to original message', function() {
    Object.keys(messages).forEach(function(lang) {
      it('should create non equal message with ' + lang + ' lang', function() {
        testData[lang] = crypt.encode(messages[lang], key);
        expect(messages[lang]).not.to.be.equal(testData[lang]);
      });
    });
  });

  describe('decode: returns origin message with right key', function() {
    Object.keys(messages).forEach(function(lang) {
      it('should return origin message with ' + lang + ' lang', function() {
        testData[lang] = crypt.encode(messages[lang], key);
        expect(crypt.decode(testData[lang], key)).to.be.equal(messages[lang]);
      });
    });
  });

  describe('decode: returns wrong message with wrong key', function() {
    Object.keys(messages).forEach(function(lang) {
      it('should return wrong message with ' + lang + ' lang', function() {
        testData[lang] = crypt.encode(messages[lang], wrongKey);
        expect(crypt.decode(testData[lang], wrongKey)).to.be.equal(messages[lang]);
      });
    });
  });
});
