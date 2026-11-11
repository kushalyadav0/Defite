// Lets the 3D hero tell the product showcase which product was clicked.
const EVENT = 'defite:select-product';

export const selectProduct = (slug) => {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: slug }));
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
};

// Opens the contact form with the subject filled in, e.g. "Demo request: Verso".
const CONTACT_EVENT = 'defite:contact-subject';

export const requestDemo = (productName) => {
  window.dispatchEvent(
    new CustomEvent(CONTACT_EVENT, { detail: productName ? `Demo request: ${productName}` : 'Demo request' })
  );
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

export const onContactSubject = (handler) => {
  const listener = (e) => handler(e.detail);
  window.addEventListener(CONTACT_EVENT, listener);
  return () => window.removeEventListener(CONTACT_EVENT, listener);
};

export const onSelectProduct = (handler) => {
  const listener = (e) => handler(e.detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
};
