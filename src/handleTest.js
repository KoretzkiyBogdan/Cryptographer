/* For Index Page */

window.addEventListener('load', function() {

  var form = document.getElementById('test'),
      output = document.getElementsByClassName('output')[0];

  form.addEventListener('submit', function(event) {
    var message = document.querySelector('textarea[name="message"]').value,
        key = document.querySelector('input[name="key"]').value,
        method = document.querySelector('input[type="radio"]:checked').value;
    if (method === 'create') {
      output.innerHTML = crypt.encode(message, key);
    } else {
      output.innerHTML = crypt.decode(message, key);
    }
    event.preventDefault();
    return false;
  });

});