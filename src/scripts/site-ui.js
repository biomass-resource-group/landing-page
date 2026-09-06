document.documentElement.classList.add('js');

const setupSiteUi = () => {
  const header = document.querySelector('[data-site-header]');
  const menu = document.querySelector('[data-menu]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const toggleLabel = document.querySelector('[data-menu-toggle-label]');
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

  const syncScrollState = () => {
    scrollFrame = 0;
    syncHeader();
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
    if (!(menu instanceof HTMLElement) || !menu.classList.contains('is-open') || event.key !== 'Tab') return;
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

  const syncViewportState = () => {
    if (!mobileNavQuery.matches) closeMenu(false);
  };

  syncScrollState();
  closeMenu(false);
  syncViewportState();
  window.addEventListener('scroll', requestScrollSync, { passive: true });
  if (typeof mobileNavQuery.addEventListener === 'function') mobileNavQuery.addEventListener('change', syncViewportState);
  else mobileNavQuery.addListener?.(syncViewportState);

  skipLink?.addEventListener('click', () => {
    if (content instanceof HTMLElement) window.requestAnimationFrame(() => content.focus());
  });
  toggle?.addEventListener('click', () => {
    if (menu instanceof HTMLElement) setMenuState(!menu.classList.contains('is-open'));
  });
  menu?.querySelectorAll('a').forEach((anchor) => anchor.addEventListener('click', () => closeMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu instanceof HTMLElement && menu.classList.contains('is-open')) closeMenu(true);
    trapFocus(event);
  });
  document.addEventListener('click', (event) => {
    if (!(menu instanceof HTMLElement) || !(toggle instanceof HTMLElement) || !menu.classList.contains('is-open')) return;
    if (event.target instanceof Node && !menu.contains(event.target) && !toggle.contains(event.target)) closeMenu(true);
  });

  const copyStatus = document.querySelector('[data-copy-status]');
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
  document.querySelectorAll('[data-copy-value]').forEach((button) => {
    button.addEventListener('click', async () => {
      if (!(button instanceof HTMLButtonElement)) return;
      const copied = await copyText(button.dataset.copyValue ?? '');
      const defaultLabel = button.dataset.defaultLabel || button.textContent?.trim() || 'Copy';
      button.dataset.defaultLabel = defaultLabel;
      button.textContent = copied ? 'Copied' : 'Copy failed';
      window.setTimeout(() => { button.textContent = defaultLabel; }, 1800);
      if (copyStatus) copyStatus.textContent = copied
        ? `${button.dataset.copyFeedback || 'Text'} copied.`
        : `Copy failed. The ${button.dataset.copyFeedback || 'text'} remains visible and selectable.`;
    });
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  revealElements.forEach((element) => {
    if (element.getBoundingClientRect().top <= window.innerHeight * 0.92) element.classList.add('is-visible');
    else observer.observe(element);
  });
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupSiteUi);
else setupSiteUi();
