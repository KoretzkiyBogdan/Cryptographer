'use strict';

window.addEventListener('load', function () {

  var form = document.getElementById('test');
  var output = document.getElementsByClassName('output')[0];

  form.addEventListener('submit', function (event) {
    var message = document.querySelector('textarea[name="message"]').value.trim();
    var key = document.querySelector('input[name="key"]').value;
    var method = document.querySelector('input[type="radio"]:checked').value.trim();

    output.innerHTML = crypt[method](message, key);
    event.preventDefault();
    return false;
  });
});
//# sourceMappingURL=handheldTest.js.map
