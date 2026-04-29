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

  const copyText = async (value) => {
    if (!value) return false;
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      return false;
    }
  };

  document.querySelectorAll('[data-copy-value]').forEach((button) => {
    button.addEventListener('click', async () => {
      if (!(button instanceof HTMLButtonElement)) return;
      const value = button.dataset.copyValue ?? '';
      const copied = await copyText(value);
      button.textContent = copied ? 'Copied' : 'Copy failed';
      window.setTimeout(() => {
        button.textContent = 'Copy';
      }, 1800);
    });
  });

  const form = document.querySelector('[data-contact-form]');
  if (form instanceof HTMLFormElement) {
    const routeSelect = form.querySelector('[data-inquiry-type]');
    const message = form.querySelector('[data-message]');
    const status = form.querySelector('[data-form-status]');
    const summary = form.querySelector('[data-inquiry-summary]');
    const summaryText = form.querySelector('[data-inquiry-summary-text]');
    const copySummary = form.querySelector('[data-copy-inquiry]');
    const routeCards = Array.from(document.querySelectorAll('[data-contact-route]'));

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

    const setRoute = (routeKey) => {
      if (!(routeSelect instanceof HTMLSelectElement)) return;
      const option = Array.from(routeSelect.options).find((item) => item.value === routeKey);
      if (!option) return;
      routeSelect.value = routeKey;
      routeCards.forEach((button) => {
        const card = button.closest('[data-contact-route-card]');
        card?.classList.toggle('is-selected', button.getAttribute('data-contact-route') === routeKey);
      });
      const template = option.dataset.template ?? '';
      if (message instanceof HTMLTextAreaElement) message.placeholder = template;
    };

    const params = new URLSearchParams(window.location.search);
    setRoute(params.get('type') || (routeSelect instanceof HTMLSelectElement ? routeSelect.value : 'investor'));

    routeSelect?.addEventListener('change', () => {
      if (routeSelect instanceof HTMLSelectElement) setRoute(routeSelect.value);
    });

    routeCards.forEach((button) => {
      button.addEventListener('click', () => {
        const routeKey = button.getAttribute('data-contact-route');
        if (routeKey) setRoute(routeKey);
        form.scrollIntoView({ block: 'start', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });

    const setError = (field, messageText) => {
      if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return;
      const error = document.querySelector(`[data-error-for="${field.id}"]`);
      field.setAttribute('aria-invalid', messageText ? 'true' : 'false');
      if (error) error.textContent = messageText;
    };

    const validate = () => {
      const requiredFields = Array.from(form.querySelectorAll('[required]'));
      let firstInvalid = null;

      requiredFields.forEach((field) => {
        if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return;
        const messageText = field.validity.valid ? '' : field.type === 'email' && field.value ? 'Enter a valid email address.' : 'This field is required.';
        setError(field, messageText);
        if (messageText && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        firstInvalid.focus();
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
      setStatus(copied ? 'Inquiry summary copied.' : 'Copy failed. The summary is visible below.');
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
