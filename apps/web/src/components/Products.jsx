import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ArrowRight, ExternalLink, PlayCircle, Clock, Hand } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useInView, prefersReducedMotion } from '../hooks/useInView';
import SceneBoundary, { webglAvailable } from '../three/SceneBoundary';
import { onSelectProduct } from '../three/selectProduct';

const ProductStage = lazy(() => import('../three/ProductStage'));

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

const isComingSoon = (p) => p.status === 'coming_soon' || !p.appUrl;

const StageFallback = ({ accent }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-40 h-40 rounded-full blur-2xl opacity-60" style={{ background: accent }} />
  </div>
);

const ProductActions = ({ product }) => {
  const accent = product.accent;
  if (isComingSoon(product)) {
    return (
      <button
        onClick={scrollToContact}
        className="inline-flex items-center px-5 py-3 rounded-xl border border-gray-300 dark:border-white/15 text-gray-800 dark:text-gray-100 font-semibold hover:border-gray-400 transition-colors"
      >
        <Clock size={16} className="mr-2" />
        Get notified
      </button>
    );
  }
  return (
    <>
      <a
        href={product.appUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-5 py-3 rounded-xl font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
        style={{ background: accent, color: textOn(accent), boxShadow: `0 10px 30px -10px ${accent}` }}
      >
        Open {product.name}
        <ExternalLink size={16} className="ml-2" />
      </a>
      {product.demoUrl && (
        <a
          href={product.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 rounded-xl border-2 font-semibold transition-colors"
          style={{ borderColor: accent, color: accent }}
        >
          <PlayCircle size={16} className="mr-2" />
          Try demo
        </a>
      )}
      <button
        onClick={scrollToContact}
        className="inline-flex items-center px-3 py-3 font-semibold text-gray-700 dark:text-gray-200 hover:translate-x-1 transition-transform"
      >
        Book a demo
        <ArrowRight size={16} className="ml-1" />
      </button>
    </>
  );
};

const Products = () => {
  const products = useProducts();
  const [selected, setSelected] = useState(products[0]?.slug);
  const stageRef = useRef(null);
  const inView = useInView(stageRef);
  const [canRender3D, setCanRender3D] = useState(false);
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    setCanRender3D(webglAvailable());
    setCalm(prefersReducedMotion());
  }, []);

  useEffect(() => onSelectProduct(setSelected), []);

  const product = products.find((p) => p.slug === selected) || products[0];
  if (!product) return null;
  const accent = product.accent;

  return (
    <section id="products" className="relative py-24 overflow-hidden bg-white dark:bg-[#0b0c1d]">
      <div
        className="pointer-events-none absolute -top-32 right-0 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20 transition-colors duration-700"
        style={{ background: accent }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              products
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Software built for the way independent businesses actually run. Pick one to explore it, then open it to try.
          </p>
        </div>

        {/* Product picker */}
        <div role="tablist" aria-label="Defite products" className="flex gap-2 overflow-x-auto pb-2 mb-8 justify-start md:justify-center">
          {products.map((p) => {
            const isActive = p.slug === product.slug;
            return (
              <button
                key={p.slug}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelected(p.slug)}
                className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border transition-all ${
                  isActive
                    ? 'text-white border-transparent shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-gray-400'
                }`}
                style={isActive ? { background: p.accent, color: textOn(p.accent) } : undefined}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: isActive ? textOn(p.accent) : p.accent, opacity: isActive ? 0.8 : 1 }}
                />
                {p.name}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          className="grid lg:grid-cols-2 gap-8 items-center rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur p-6 md:p-10 shadow-xl"
        >
          <div ref={stageRef} className="relative h-[260px] md:h-[420px]">
            {canRender3D ? (
              <SceneBoundary fallback={<StageFallback accent={accent} />}>
                <Suspense fallback={<StageFallback accent={accent} />}>
                  <ProductStage product={product} active={inView} calm={calm} />
                </Suspense>
              </SceneBoundary>
            ) : (
              <StageFallback accent={accent} />
            )}
            {canRender3D && (
              <p className="pointer-events-none absolute bottom-1 left-0 right-0 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Hand size={14} /> Drag to rotate
              </p>
            )}
          </div>

          <div key={product.slug} className="hero-enter">
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  isComingSoon(product)
                    ? 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300'
                    : 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-300'
                }`}
              >
                {isComingSoon(product) ? 'Coming soon' : STATUS_LABELS[product.status] || 'Live'}
              </span>
              {product.tags?.length > 0 && (
                <span className="text-sm font-medium" style={{ color: accent }}>
                  {product.tags.join(' · ')}
                </span>
              )}
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">{product.name}</h3>
            {product.tagline && (
              <p className="text-xl text-gray-800 dark:text-gray-100 mb-4">{product.tagline}</p>
            )}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{product.description}</p>

            {product.features?.length > 0 && (
              <ul className="mb-6 grid sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-3">
              <ProductActions product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
