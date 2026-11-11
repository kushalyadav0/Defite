// Lets the 3D hero tell the product showcase which product was clicked.
const EVENT = 'defite:select-product';

export const selectProduct = (slug) => {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: slug }));
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
};

export const onSelectProduct = (handler) => {
  const listener = (e) => handler(e.detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
};
