window.addEventListener('load', () => {

  const form = document.getElementById('test');
  const output = document.getElementsByClassName('output')[0];

  form.addEventListener('submit', (event) => {
    const message = document.querySelector('textarea[name="message"]').value.trim();
    const key = document.querySelector('input[name="key"]').value;
    const method = document.querySelector('input[type="radio"]:checked').value.trim();

    output.innerHTML = crypt[method](message, key);
    event.preventDefault();
    return false;
  });

});
