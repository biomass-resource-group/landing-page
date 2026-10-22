export const copyText = async (value) => {
  if (!value) return false;
  let textarea;
  let previousFocus;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
    previousFocus = document.activeElement;
    textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:fixed;inset:0 auto auto 0;opacity:0';
    document.body.append(textarea);
    textarea.select();
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    textarea?.remove();
    if (previousFocus?.isConnected && typeof previousFocus.focus === 'function') {
      try {
        previousFocus.focus({ preventScroll: true });
      } catch {
        // Focus refusal must not change the clipboard result.
      }
    }
  }
};
