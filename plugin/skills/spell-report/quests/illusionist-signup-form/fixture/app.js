// Booking form: client-side checks before the form posts to /api/bookings.
const form = document.getElementById('booking-form');
const summary = document.getElementById('error-summary');

const rules = {
  fullName: (v) => (v.trim() ? '' : 'Enter your full name.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter an email address like name@example.com.'),
  phone: (v) => (!v || /^[+\d][\d\s()-]{6,}$/.test(v) ? '' : 'Enter a phone number, or leave it blank.'),
  postcode: (v) => (v.trim() ? '' : 'Enter your postcode.'),
  password: (v) => (v.length >= 10 ? '' : 'Use at least 10 characters.'),
};

function showError(name, message) {
  const error = document.getElementById(`${name}-error`);
  error.textContent = message;
  error.classList.toggle('show', Boolean(message));
}

form.addEventListener('submit', (event) => {
  let valid = true;
  for (const [name, check] of Object.entries(rules)) {
    const message = check(form.elements[name].value);
    showError(name, message);
    if (message) valid = false;
  }
  const course = form.querySelector('input[name="course"]:checked');
  showError('course', course ? '' : 'Choose a class.');
  showError('terms', form.elements.terms.checked ? '' : 'Agree to the studio policies to book.');
  if (!course || !form.elements.terms.checked) valid = false;

  if (!valid) {
    event.preventDefault();
    summary.hidden = false;
    summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

document.getElementById('toggle-password').addEventListener('click', () => {
  const input = document.getElementById('password');
  input.type = input.type === 'password' ? 'text' : 'password';
});

document.getElementById('promo-close').addEventListener('click', () => {
  document.getElementById('promo').remove();
});
