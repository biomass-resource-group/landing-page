document.documentElement.classList.add('js');

const setupSiteUi = () => {
  const header = document.querySelector('[data-site-header]');
  const menu = document.querySelector('[data-menu]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const toggleLabel = document.querySelector('[data-menu-toggle-label]');
  const hero = document.querySelector('[data-hero]');
  const content = document.getElementById('content');
  const skipLink = document.querySelector('.skip-link');
  const body = document.body;
  const mobileNavQuery = window.matchMedia('(max-width: 820px)');
  const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let scrollFrame = 0;

  const setInert = (element, value) => {
    if (!(element instanceof HTMLElement)) return;
    element.toggleAttribute('inert', value);
  };

  const syncHeader = () => {
    if (!(header instanceof HTMLElement)) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };

  const syncHero = () => {
    if (prefersReducedMotion || !(hero instanceof HTMLElement)) return;
    const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    hero.style.setProperty('--hero-progress', progress.toFixed(3));
  };

  const syncScrollState = () => {
    scrollFrame = 0;
    syncHeader();
    syncHero();
  };

  const requestScrollSync = () => {
    if (scrollFrame !== 0) return;
    scrollFrame = window.requestAnimationFrame(syncScrollState);
  };

  const setMenuState = (isOpen, returnFocus = false) => {
    if (!(menu instanceof HTMLElement) || !(toggle instanceof HTMLElement)) return;

    menu.classList.toggle('is-open', isOpen);
    menu.hidden = !isOpen;
    menu.setAttribute('aria-hidden', String(!isOpen));
    setInert(menu, !isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    if (toggleLabel) toggleLabel.textContent = isOpen ? 'Close navigation' : 'Open navigation';
    body.classList.toggle('menu-open', isOpen);

    if (isOpen) {
      const firstLink = menu.querySelector('a[href]');
      if (firstLink instanceof HTMLElement) firstLink.focus();
      else menu.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  };

  const closeMenu = (returnFocus = false) => setMenuState(false, returnFocus);

  const trapFocus = (event) => {
    if (!(menu instanceof HTMLElement) || !menu.classList.contains('is-open')) return;
    if (event.key !== 'Tab') return;

    const focusable = Array.from(menu.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])'))
      .filter((item) => item instanceof HTMLElement && !item.hasAttribute('disabled'));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const subscribeToViewportChanges = (handler) => {
    if (typeof mobileNavQuery.addEventListener === 'function') {
      mobileNavQuery.addEventListener('change', handler);
      return;
    }

    if (typeof mobileNavQuery.addListener === 'function') {
      mobileNavQuery.addListener(handler);
    }
  };

  const syncViewportState = () => {
    if (!mobileNavQuery.matches) closeMenu(false);
  };

  syncScrollState();
  closeMenu(false);
  syncViewportState();
  window.addEventListener('scroll', requestScrollSync, { passive: true });
  subscribeToViewportChanges(syncViewportState);

  skipLink?.addEventListener('click', () => {
    if (!(content instanceof HTMLElement)) return;
    window.requestAnimationFrame(() => content.focus());
  });

  toggle?.addEventListener('click', () => {
    if (!(menu instanceof HTMLElement)) return;
    setMenuState(!menu.classList.contains('is-open'));
  });

  menu?.querySelectorAll('a').forEach((anchor) => {
    anchor.addEventListener('click', () => closeMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu instanceof HTMLElement && menu.classList.contains('is-open')) {
      closeMenu(true);
    }
    trapFocus(event);
  });

  document.addEventListener('click', (event) => {
    if (!(menu instanceof HTMLElement) || !(toggle instanceof HTMLElement)) return;
    if (!menu.classList.contains('is-open')) return;
    if (!(event.target instanceof Node)) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu(true);
  });

  const copyStatus = document.querySelector('[data-copy-status]');
  const announceCopy = (message) => {
    if (copyStatus) copyStatus.textContent = message;
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
      textarea.style.position = 'fixed';
      textarea.style.inset = '0 auto auto 0';
      textarea.style.opacity = '0';
      document.body.append(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      textarea.remove();
      return copied;
    } catch {
      return false;
    }
  };

  const setTemporaryButtonLabel = (button, label, duration = 1800) => {
    if (!(button instanceof HTMLButtonElement)) return;
    const defaultLabel = button.dataset.defaultLabel || button.textContent?.trim() || 'Copy';
    button.dataset.defaultLabel = defaultLabel;
    button.textContent = label;
    window.setTimeout(() => {
      button.textContent = defaultLabel;
    }, duration);
  };

  document.querySelectorAll('[data-copy-value]').forEach((button) => {
    button.addEventListener('click', async () => {
      if (!(button instanceof HTMLButtonElement)) return;
      const value = button.dataset.copyValue ?? '';
      const copied = await copyText(value);
      const feedbackLabel = button.dataset.copyFeedback || 'text';
      setTemporaryButtonLabel(button, copied ? 'Copied' : 'Copy failed');
      announceCopy(
        copied
          ? `${feedbackLabel} copied.`
          : `Copy failed. The ${feedbackLabel} remains visible and selectable.`,
      );
    });
  });

  const form = document.querySelector('[data-contact-form]');
  if (form instanceof HTMLFormElement) {
    form.noValidate = true;
    const routeSelect = form.querySelector('[data-inquiry-type]');
    const message = form.querySelector('[data-message]');
    const status = form.querySelector('[data-form-status]');
    const summary = form.querySelector('[data-inquiry-summary]');
    const summaryText = form.querySelector('[data-inquiry-summary-text]');
    const copySummary = form.querySelector('[data-copy-inquiry]');
    const routeCards = Array.from(document.querySelectorAll('[data-contact-route]'));
    const fields = Array.from(form.querySelectorAll('input, select, textarea'))
      .filter((field) => field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement);
    const touchedFields = new WeakSet();
    let attemptedSubmit = false;

    const getSelectedRoute = () => {
      if (!(routeSelect instanceof HTMLSelectElement)) return null;
      return routeSelect.selectedOptions[0] ?? null;
    };

    const setStatus = (text) => {
      if (status) status.textContent = text;
    };

    const getField = (name) => form.elements.namedItem(name);
    const fieldValue = (name) => {
      const field = getField(name);
      return field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement
        ? field.value.trim()
        : '';
    };

    const setRoute = (routeKey, options = {}) => {
      if (!(routeSelect instanceof HTMLSelectElement)) return;
      const option = Array.from(routeSelect.options).find((item) => item.value === routeKey);
      if (!option) return;
      routeSelect.value = routeKey;
      routeCards.forEach((button) => {
        if (button instanceof HTMLButtonElement) {
          button.setAttribute('aria-pressed', String(button.getAttribute('data-contact-route') === routeKey));
        }
        const card = button.closest('[data-contact-route-card]');
        card?.classList.toggle('is-selected', button.getAttribute('data-contact-route') === routeKey);
      });
      if (form.dataset.formMode === 'mailto' && option.dataset.recipient) {
        form.action = `mailto:${option.dataset.recipient}`;
      }
      const template = option.dataset.template ?? '';
      if (message instanceof HTMLTextAreaElement) message.placeholder = template;
      if (summary instanceof HTMLElement && !summary.hidden) showSummary();
      if (options.announce) {
        setStatus(`Inquiry type set to ${option.textContent?.trim() || 'selected route'}. This opens your email app with a prepared message.`);
      }
    };

    const params = new URLSearchParams(window.location.search);
    setRoute(params.get('type') || (routeSelect instanceof HTMLSelectElement ? routeSelect.value : 'investor'));

    routeSelect?.addEventListener('change', () => {
      if (routeSelect instanceof HTMLSelectElement) setRoute(routeSelect.value, { announce: true });
    });

    routeCards.forEach((button) => {
      button.addEventListener('click', () => {
        const routeKey = button.getAttribute('data-contact-route');
        if (routeKey) setRoute(routeKey, { announce: true });
        form.scrollIntoView({ block: 'start', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });

    const getErrorMessage = (field) => {
      if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return;
      if (field.validity.valid) return '';
      if (field.validity.valueMissing) return 'This field is required.';
      if (field instanceof HTMLInputElement && field.type === 'email') return 'Enter a valid email address.';
      return 'Check this field.';
    };

    const setError = (field, messageText) => {
      if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return true;
      const error = document.querySelector(`[data-error-for="${field.id}"]`);
      if (messageText) field.setAttribute('aria-invalid', 'true');
      else field.removeAttribute('aria-invalid');
      if (error) error.textContent = messageText;
      return !messageText;
    };

    const validateField = (field, showError) => {
      const messageText = showError ? getErrorMessage(field) : '';
      return setError(field, messageText);
    };

    fields.forEach((field) => {
      field.addEventListener('blur', () => {
        touchedFields.add(field);
        validateField(field, true);
      });
      field.addEventListener('input', () => {
        if (touchedFields.has(field) || attemptedSubmit) validateField(field, true);
      });
      field.addEventListener('change', () => {
        if (touchedFields.has(field) || attemptedSubmit) validateField(field, true);
      });
    });

    const errorSummary = form.querySelector('[data-error-summary]');
    const errorSummaryList = form.querySelector('[data-error-summary-list]');

    const labelForField = (field) => {
      const label = form.querySelector(`label[for="${field.id}"]`);
      if (!(label instanceof HTMLElement)) return field.name || field.id;
      return label.textContent?.replace(/\(required\)/i, '').trim() || field.id;
    };

    const updateErrorSummary = (invalidFields) => {
      if (!(errorSummary instanceof HTMLElement) || !(errorSummaryList instanceof HTMLElement)) return;
      errorSummaryList.replaceChildren();
      if (invalidFields.length === 0) {
        errorSummary.hidden = true;
        return;
      }
      for (const field of invalidFields) {
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
      }
      errorSummary.hidden = false;
    };

    const validate = () => {
      attemptedSubmit = true;
      const invalid = [];

      fields.forEach((field) => {
        if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return;
        const isValid = validateField(field, true);
        if (!isValid) invalid.push(field);
      });

      updateErrorSummary(invalid);

      if (invalid.length > 0) {
        if (errorSummary instanceof HTMLElement) errorSummary.focus();
        else invalid[0].focus();
        setStatus('Please complete the required fields before sending.');
        return false;
      }

      setStatus('');
      return true;
    };

    const buildSummary = () => {
      const option = getSelectedRoute();
      const subject = option?.dataset.subject ?? 'General BRG inquiry';
      const starter = option?.dataset.template ?? '';

      return [
        starter,
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

    copySummary?.addEventListener('click', async () => {
      if (!validate()) return;
      const text = showSummary();
      const copied = await copyText(text);
      if (copySummary instanceof HTMLButtonElement) {
        setTemporaryButtonLabel(copySummary, copied ? 'Copied' : 'Copy failed');
      }
      setStatus(copied ? 'Inquiry summary copied.' : 'Copy failed. The summary remains visible below.');
      announceCopy(copied ? 'Inquiry summary copied.' : 'Copy failed. The inquiry summary remains visible and selectable.');
    });

    form.addEventListener('submit', (event) => {
      if (!validate()) {
        event.preventDefault();
        return;
      }

      const mode = form.dataset.formMode;
      if (mode !== 'mailto') return;

      event.preventDefault();
      const option = getSelectedRoute();
      const recipient = option?.dataset.recipient || 'info@biomassresourcegroup.com';
      const subject = option?.dataset.subject || 'General BRG inquiry';
      const body = showSummary();
      setStatus('Opening your email app with a prepared inquiry. If it does not open, copy the summary below.');
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  revealElements.forEach((element) => {
    if (element.getBoundingClientRect().top <= window.innerHeight * 0.92) {
      element.classList.add('is-visible');
      return;
    }
    observer.observe(element);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupSiteUi);
} else {
  setupSiteUi();
}
