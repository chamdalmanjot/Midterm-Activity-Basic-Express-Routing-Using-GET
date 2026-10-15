document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  document.getElementById('thanks').textContent =
    `Thanks, ${name}. We'll reply by email.`;
  e.target.reset();
});