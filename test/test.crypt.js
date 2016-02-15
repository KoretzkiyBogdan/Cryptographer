var messages = {
  eng: "For the 4 past months, I've been working for Mozilla on some big project where such testing strategy was involved. While I wish we could use CasperJS in this perspective, Firefox wasn't supported at the time and we needed to ensure proper compatibility with its JavaScript engine. So we went with using Mocha, Chai and Sinon and they have proven to be a great workflow for us so far.",
  rus: "Эта часть позволит вам изучить JavaScript с нуля или упорядочить и дополнить существующие знания.",
  ukr: "Та хіба я знаю, що сюди писати? Може й нічого такого, хто його знае. І буква \"ї\" мене цікавить :)" 
 };

var key = "qqwweer",
    count = 100;

var randomInt = function(max, min) {
  return Math.floor(Math.random() * max + (min || 0));
};


describe('Crypt test', function() {
  var testData = {};

  describe('Create test: non-equal to origin cryptographic message with ' + Object.keys(messages).length + ' lang', function() {
    Object.keys(messages).forEach(function(lang) {
      it('should create message with ' + lang + ' lang', function() {
        testData[lang] = crypt.encode(messages[lang], key);
        expect(messages[lang]).not.to.be.equal(testData[lang]);
      });
    });
  });

  describe('Parse test: return origin message with right key', function() {
    Object.keys(messages).forEach(function(lang) {
      it('should return origin message with ' + lang + ' lang', function() {
        testData[lang] = crypt.encode(messages[lang], key);
        expect(crypt.decode(testData[lang], key)).to.be.equal(messages[lang]);
      });
    });
  });

  describe('should create and parse text ' + count + ' times with random language', function() {
    var availableLanguages = Object.keys(messages);
    for(var i = 0; i < count; i++) {
      var lang = availableLanguages[randomInt(availableLanguages.length, 0)];
      it('creat and parse №' + (i+1) + ' without error (' + lang + ')', function() {
        var cryptMessage = crypt.encode(messages.eng, key);
        expect(cryptMessage).not.to.be.equal(messages.eng);
        expect(crypt.decode(cryptMessage, key)).to.be.equal(messages.eng);       
      });
    };
  })
  
});