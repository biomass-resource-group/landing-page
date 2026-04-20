document.documentElement.classList.add('js');

// When JS is available, hide the mobile menu from assistive tech by default.
// Without JS, the menu is visible as a fallback (via html:not(.js) .mobile-menu)
// and must remain reachable, so aria-hidden is set here rather than in HTML.
const initialMenu = document.querySelector('[data-menu]');
if (initialMenu) initialMenu.setAttribute('aria-hidden', 'true');

const setupSiteUi = () => {
  const header = document.querySelector('[data-site-header]');
  const menu = document.querySelector('[data-menu]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const hero = document.querySelector('[data-hero]');
  const emailLinks = Array.from(document.querySelectorAll('[data-email-link]'));
  const content = document.getElementById('content');
  const skipLink = document.querySelector('.skip-link');
  const body = document.body;
  const mobileNavQuery = window.matchMedia('(max-width: 820px)');
  const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let scrollFrame = 0;

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

  const closeMenu = (returnFocus) => {
    if (!(menu instanceof HTMLElement) || !(toggle instanceof HTMLElement)) return;

    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');

    if (returnFocus) {
      toggle.focus();
    }
  };

  const trapFocus = (event) => {
    if (!(menu instanceof HTMLElement) || !menu.classList.contains('is-open')) return;

    const focusable = Array.from(menu.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])'));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
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
    if (!mobileNavQuery.matches) {
      closeMenu();
    }
  };

  emailLinks.forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) return;

    const localPart = link.dataset.emailLocal;
    const domain = link.dataset.emailDomain;

    if (!localPart || !domain) return;

    const address = `${localPart}@${domain}`;
    link.href = `mailto:${address}`;
    link.textContent = address;
  });

  syncScrollState();
  syncViewportState();
  window.addEventListener('scroll', requestScrollSync, { passive: true });
  subscribeToViewportChanges(syncViewportState);

  skipLink?.addEventListener('click', () => {
    if (!(content instanceof HTMLElement)) return;

    window.requestAnimationFrame(() => {
      content.focus();
    });
  });

  toggle?.addEventListener('click', () => {
    if (!(menu instanceof HTMLElement) || !(toggle instanceof HTMLElement)) return;

    const isOpen = menu.classList.toggle('is-open');
    menu.setAttribute('aria-hidden', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(isOpen));
    body.classList.toggle('menu-open', isOpen);
  });

  menu?.querySelectorAll('a').forEach((anchor) => {
    anchor.addEventListener('click', () => closeMenu(true));
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

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => {
      element.classList.add('is-visible');
    });
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
    {
      threshold: 0.18,
      rootMargin: '0px 0px -10% 0px',
    },
  );

  revealElements.forEach((element) => {
    if (element.getBoundingClientRect().top <= window.innerHeight * 0.9) {
      element.classList.add('is-visible');
      return;
    }

    element.classList.add('reveal-pending');
    observer.observe(element);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupSiteUi, { once: true });
} else {
  setupSiteUi();
}
