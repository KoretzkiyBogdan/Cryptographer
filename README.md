# Cryptographer
Simple cryptographer created by me

Usage
  crypt.create(regularMessage, key) - return cryptographic string. Nobody can read this if don't know key.
  crypt.parse(cryptMessage, key) - return normal string.
Exapmle:
  var myMessage = "Isn't funny, right?",
      key = "qwsd12344";
  myMessage = crypt.create(myMessage, key);
  console.log(myMessage)
    - "xL4aiQMs70SsmgPd6vRQGS24Mpi77vkYJlR32HsSlG65IoJ67wOqqr6dPRYXNd6hMkoJNma7tIxnJlf2TKpl23nr17vjlosa6tSIKr64OPR6bOxYk77UminImc3UNRx"
  myMessage = crypt.parse(myMessage, key);
  console.log(myMessage);
    - "Isn't funny, right?"
