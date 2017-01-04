/* For Index Page */

window.addEventListener('load', () => {

  let form = document.getElementById('test'),
      output = document.getElementsByClassName('output')[0];

  form.addEventListener('submit', event => {
    let message = document.querySelector('textarea[name="message"]').value.trim(),
        key = document.querySelector('input[name="key"]').value,
        method = document.querySelector('input[type="radio"]:checked').value.trim();
        
    if (method === 'encode') {
      output.innerHTML = crypt.encode(message, key);
    } else {
      output.innerHTML = crypt.decode(message, key);
    }
    event.preventDefault();
    return false;
  });

});