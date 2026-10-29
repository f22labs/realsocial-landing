(function () {
  // Posts straight to a Google Form (write-only: the browser can submit but
  // never read). Responses land in the form's linked Google Sheet.
  var FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeBbDlnxwLdGMIgY8poBhJONxas_4NMhdduKNRiJYd3x3QQDw/formResponse';
  var ENTRY = {
    name: 'entry.910249536',
    city: 'entry.1532926808',
    email: 'entry.2060925660'
  };
  var MIN_FILL_MS = 2000; // faster than a human: treat as a bot

  var loadedAt = Date.now();
  var form = document.getElementById('waitlist-form');
  if (!form) return;

  var button = form.querySelector('button[type="submit"]');
  var status = document.getElementById('waitlist-status');
  var success = document.getElementById('waitlist-success');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var rules = {
    name: { test: function (v) { return v !== ''; }, msg: 'Please enter your full name' },
    city: { test: function (v) { return v !== ''; }, msg: 'Please enter your city' },
    email: { test: function (v) { return EMAIL_RE.test(v); }, msg: 'Please enter a valid email' }
  };

  function setError(field, msg) {
    var input = form.elements[field];
    var out = document.getElementById(field + '-error');
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    out.textContent = msg || '';
  }

  function validate() {
    var first = null;
    Object.keys(rules).forEach(function (field) {
      var input = form.elements[field];
      input.value = input.value.trim();
      var ok = rules[field].test(input.value);
      setError(field, ok ? '' : rules[field].msg);
      if (!ok && !first) first = input;
    });
    if (first) first.focus();
    return !first;
  }

  Object.keys(rules).forEach(function (field) {
    form.elements[field].addEventListener('input', function () {
      if (this.getAttribute('aria-invalid') === 'true') setError(field, '');
    });
  });

  function setBusy(busy) {
    button.disabled = busy;
    button.classList.toggle('is-loading', busy);
    button.setAttribute('aria-busy', busy ? 'true' : 'false');
  }

  function showSuccess() {
    form.reset();
    form.hidden = true;
    success.hidden = false;
    success.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (button.disabled) return;
    status.textContent = '';
    if (!validate()) return;

    // Bots: hidden field filled or form sent too fast. Fake success, send nothing.
    if (form.elements.website.value || Date.now() - loadedAt < MIN_FILL_MS) {
      showSuccess();
      return;
    }

    setBusy(true);
    var body = new URLSearchParams();
    body.append(ENTRY.name, form.elements.name.value);
    body.append(ENTRY.city, form.elements.city.value);
    body.append(ENTRY.email, form.elements.email.value);

    // no-cors: Google's reply is opaque, so this only rejects on network
    // failure. A urlencoded body keeps it a "simple" request (no preflight).
    fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body: body })
      .then(showSuccess)
      .catch(function () {
        status.textContent = 'Something went wrong. Please try again.';
        setBusy(false);
      });
  });
})();
