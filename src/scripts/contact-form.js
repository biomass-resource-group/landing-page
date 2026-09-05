const setupContactForm = () => {
  const form = document.querySelector('[data-contact-form]');
  if (!(form instanceof HTMLFormElement)) return;

  form.noValidate = true;
  const routeSelect = form.querySelector('[data-inquiry-type]');
  const message = form.querySelector('[data-message]');
  const status = form.querySelector('[data-form-status]');
  const summary = form.querySelector('[data-inquiry-summary]');
  const summaryText = form.querySelector('[data-inquiry-summary-text]');
  const copySummary = form.querySelector('[data-copy-inquiry]');
  const errorSummary = form.querySelector('[data-error-summary]');
  const errorSummaryList = form.querySelector('[data-error-summary-list]');
  const copyStatus = document.querySelector('[data-copy-status]');
  const routeCards = Array.from(document.querySelectorAll('[data-contact-route]'));
  const fields = Array.from(form.querySelectorAll('input, select, textarea'))
    .filter((field) => field instanceof HTMLInputElement
      || field instanceof HTMLSelectElement
      || field instanceof HTMLTextAreaElement);
  const touchedFields = new WeakSet();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let attemptedSubmit = false;

  const setStatus = (text) => { if (status) status.textContent = text; };
  const selectedRoute = () => routeSelect instanceof HTMLSelectElement
    ? routeSelect.selectedOptions[0] ?? null
    : null;
  const fieldValue = (name) => {
    const field = form.elements.namedItem(name);
    return field instanceof HTMLInputElement
      || field instanceof HTMLTextAreaElement
      || field instanceof HTMLSelectElement
      ? field.value.trim()
      : '';
  };

  const copyText = async (value) => {
    if (!value) return false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        return true;
      }
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.setAttribute('readonly', '');
      textarea.style.cssText = 'position:fixed;inset:0 auto auto 0;opacity:0';
      document.body.append(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      textarea.remove();
      return copied;
    } catch {
      return false;
    }
  };

  const setTemporaryButtonLabel = (button, label) => {
    if (!(button instanceof HTMLButtonElement)) return;
    const defaultLabel = button.dataset.defaultLabel || button.textContent?.trim() || 'Copy';
    button.dataset.defaultLabel = defaultLabel;
    button.textContent = label;
    window.setTimeout(() => { button.textContent = defaultLabel; }, 1800);
  };

  const buildSummary = () => {
    const option = selectedRoute();
    return [
      option?.dataset.template ?? '',
      '',
      `Name: ${fieldValue('name')}`,
      `Organization: ${fieldValue('organization')}`,
      `Email: ${fieldValue('email')}`,
      `Role: ${fieldValue('role') || 'Not provided'}`,
      `Inquiry type: ${option?.textContent?.trim() || fieldValue('inquiryType')}`,
      `Geography: ${fieldValue('geography') || 'Not provided'}`,
      '',
      'Message:',
      fieldValue('message'),
    ].join('\n');
  };

  const showSummary = () => {
    const text = buildSummary();
    if (summaryText) summaryText.textContent = text;
    if (summary instanceof HTMLElement) summary.hidden = false;
    return text;
  };

  const setRoute = (routeKey, { announce = false } = {}) => {
    if (!(routeSelect instanceof HTMLSelectElement)) return;
    const option = Array.from(routeSelect.options).find((item) => item.value === routeKey);
    if (!option) return;
    routeSelect.value = routeKey;
    routeCards.forEach((button) => {
      const selected = button.getAttribute('data-contact-route') === routeKey;
      if (button instanceof HTMLButtonElement) button.setAttribute('aria-pressed', String(selected));
      button.closest('[data-contact-route-card]')?.classList.toggle('is-selected', selected);
    });
    if (form.dataset.formMode === 'mailto' && option.dataset.recipient) {
      form.action = `mailto:${option.dataset.recipient}`;
    }
    if (message instanceof HTMLTextAreaElement) message.placeholder = option.dataset.template ?? '';
    if (summary instanceof HTMLElement && !summary.hidden) showSummary();
    if (announce) setStatus(`Inquiry type set to ${option.textContent?.trim() || 'selected route'}. This opens your email app with a prepared message.`);
  };

  const getErrorMessage = (field) => {
    if (field.validity.valid) return '';
    if (field.validity.valueMissing) return 'This field is required.';
    if (field instanceof HTMLInputElement && field.type === 'email') return 'Enter a valid email address.';
    return 'Check this field.';
  };

  const validateField = (field, showError) => {
    const error = document.querySelector(`[data-error-for="${field.id}"]`);
    const errorText = showError ? getErrorMessage(field) : '';
    if (errorText) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    if (error) error.textContent = errorText;
    return !errorText;
  };

  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      touchedFields.add(field);
      validateField(field, true);
    });
    ['input', 'change'].forEach((eventName) => field.addEventListener(eventName, () => {
      if (touchedFields.has(field) || attemptedSubmit) validateField(field, true);
    }));
  });

  const labelForField = (field) => form.querySelector(`label[for="${field.id}"]`)
    ?.textContent?.replace(/\(required\)/i, '').trim() || field.name || field.id;

  const updateErrorSummary = (invalidFields) => {
    if (!(errorSummary instanceof HTMLElement) || !(errorSummaryList instanceof HTMLElement)) return;
    errorSummaryList.replaceChildren();
    errorSummary.hidden = invalidFields.length === 0;
    invalidFields.forEach((field) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${field.id}`;
      link.textContent = labelForField(field);
      link.addEventListener('click', (event) => {
        event.preventDefault();
        field.focus();
      });
      item.append(link);
      errorSummaryList.append(item);
    });
  };

  const validate = () => {
    attemptedSubmit = true;
    const invalid = fields.filter((field) => !validateField(field, true));
    updateErrorSummary(invalid);
    if (invalid.length === 0) {
      setStatus('');
      return true;
    }
    if (errorSummary instanceof HTMLElement) errorSummary.focus();
    else invalid[0].focus();
    setStatus('Please complete the required fields before sending.');
    return false;
  };

  setRoute(new URLSearchParams(window.location.search).get('type')
    || (routeSelect instanceof HTMLSelectElement ? routeSelect.value : 'investor'));
  routeSelect?.addEventListener('change', () => {
    if (routeSelect instanceof HTMLSelectElement) setRoute(routeSelect.value, { announce: true });
  });
  routeCards.forEach((button) => button.addEventListener('click', () => {
    const routeKey = button.getAttribute('data-contact-route');
    if (routeKey) setRoute(routeKey, { announce: true });
    form.scrollIntoView({ block: 'start', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }));

  copySummary?.addEventListener('click', async () => {
    if (!validate()) return;
    const copied = await copyText(showSummary());
    setTemporaryButtonLabel(copySummary, copied ? 'Copied' : 'Copy failed');
    setStatus(copied ? 'Inquiry summary copied.' : 'Copy failed. The summary remains visible below.');
    if (copyStatus) copyStatus.textContent = copied
      ? 'Inquiry summary copied.'
      : 'Copy failed. The inquiry summary remains visible and selectable.';
  });

  form.addEventListener('submit', (event) => {
    if (!validate()) {
      event.preventDefault();
      return;
    }
    if (form.dataset.formMode !== 'mailto') return;
    event.preventDefault();
    const option = selectedRoute();
    const recipient = option?.dataset.recipient || 'info@biomassresourcegroup.com';
    const subject = option?.dataset.subject || 'General BRG inquiry';
    setStatus('Opening your email app with a prepared inquiry. If it does not open, copy the summary below.');
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(showSummary())}`;
  });
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupContactForm);
else setupContactForm();
