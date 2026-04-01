const redirectScript = document.currentScript;

if (redirectScript instanceof HTMLScriptElement) {
  const target = redirectScript.dataset.redirectTarget;
  const { pathname } = window.location;

  if (target && (pathname === '/company' || pathname === '/company/')) {
    window.location.replace(target);
  }
}
