import { useEffect, useState } from 'react';
import { getProducts } from '../services/product.service';
import { FALLBACK_PRODUCTS } from '../data/products';

// Products from the admin panel, with the built-in list until (or unless) the API answers.
let cache = null;
let pending = null;

export const useProducts = () => {
  const [products, setProducts] = useState(cache || FALLBACK_PRODUCTS);

  useEffect(() => {
    let active = true;
    pending =
      pending ||
      getProducts()
        .then((data) => {
          if (Array.isArray(data) && data.length)
            cache = data.map((p) => ({ ...p, accent: p.accent || '#6366f1' }));
          return cache;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    pending.then((data) => {
      if (active && data) setProducts(data);
    });
    return () => {
      active = false;
    };
  }, []);

  return products;
};
