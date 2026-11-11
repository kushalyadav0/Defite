import React, { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, PlayCircle, Clock } from 'lucide-react';
import { getProducts } from '../services/product.service';
import { FALLBACK_PRODUCTS } from '../data/products';

const STATUS_LABELS = { live: 'Live', beta: 'Beta', coming_soon: 'Coming soon' };

// Dark text on light accents (e.g. yellow) so button labels stay readable.
const textOn = (hex) => {
  const h = (hex || '').replace('#', '');
  if (h.length !== 6) return '#fff';
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 170 ? '#111827' : '#fff';
};

const scrollToContact = () =>
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

const ProductCard = ({ product }) => {
  const comingSoon = product.status === 'coming_soon' || !product.appUrl;
  const accent = product.accent || '#6366f1';

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col"
      style={{ '--accent': accent }}
    >
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ background: accent }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg"
            style={{ background: accent, color: textOn(accent) }}
          >
            {product.name.charAt(0)}
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              comingSoon
                ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
            }`}
          >
            {comingSoon ? 'Coming soon' : STATUS_LABELS[product.status] || 'Live'}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h3>

        {product.tags?.length > 0 && (
          <p className="text-sm font-medium mb-4" style={{ color: accent }}>
            {product.tags.join(' · ')}
          </p>
        )}

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-1">
          {product.description || product.tagline}
        </p>

        {product.features?.length > 0 && (
          <ul className="mb-6 space-y-1 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-3">
          {comingSoon ? (
            <button
              onClick={scrollToContact}
              className="inline-flex items-center px-5 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:border-gray-400 transition-colors"
            >
              <Clock size={16} className="mr-2" />
              Get notified
            </button>
          ) : (
            <>
              <a
                href={product.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
                style={{ background: accent, color: textOn(accent) }}
              >
                Open {product.name}
                <ExternalLink size={16} className="ml-2" />
              </a>
              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg border-2 font-semibold transition-colors"
                  style={{ borderColor: accent, color: accent }}
                >
                  <PlayCircle size={16} className="mr-2" />
                  Try demo
                </a>
              )}
              <button
                onClick={scrollToContact}
                className="inline-flex items-center px-3 py-2.5 font-semibold text-gray-700 dark:text-gray-200 hover:translate-x-1 transition-transform"
              >
                Book a demo
                <ArrowRight size={16} className="ml-1" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);

  useEffect(() => {
    let active = true;
    getProducts()
      .then((data) => {
        if (active && Array.isArray(data) && data.length) setProducts(data);
      })
      .catch((error) => console.log(error));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="products" className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Software built for the way independent businesses actually run. Open any product to try it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug || product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
