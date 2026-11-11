import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, MousePointerClick } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useInView, prefersReducedMotion } from '../hooks/useInView';
import SceneBoundary, { webglAvailable } from '../three/SceneBoundary';
import { useProducts } from '../hooks/useProducts';

const HeroScene = lazy(() => import('../three/HeroScene'));

const scrollToSection = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

// Shown while the 3D scene loads, and instead of it when WebGL is unavailable.
const SceneFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-60 blur-2xl animate-pulse" />
  </div>
);

const STATS = (cms, count) => [
  { value: cms?.content?.projectsDelivered || '50+', label: 'Software solutions', color: 'text-blue-500 dark:text-blue-400' },
  { value: String(count), label: 'Products', color: 'text-purple-500 dark:text-purple-400' },
  { value: '24/7', label: 'Technical support', color: 'text-pink-500 dark:text-pink-400' },
];

const Hero = () => {
  const { homepageCMS } = useAppContext();
  const products = useProducts();
  const sceneRef = useRef(null);
  const inView = useInView(sceneRef);
  const [canRender3D, setCanRender3D] = useState(false);
  const [calm, setCalm] = useState(false);
  const [wide, setWide] = useState(true);

  useEffect(() => {
    setCanRender3D(webglAvailable());
    setCalm(prefersReducedMotion());
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  return (
    <section
      id="home"
      className="relative pt-16 min-h-screen flex items-center overflow-hidden bg-slate-50 dark:bg-[#070815]"
    >
      {/* Backdrop: soft glows and a faint grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 w-[36rem] h-[36rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-48 right-0 w-[40rem] h-[40rem] rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute inset-0 hero-grid opacity-60 dark:opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 grid lg:grid-cols-2 gap-8 items-center">
        {/* Copy */}
        <div className="text-center lg:text-left hero-enter">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2 backdrop-blur mb-6">
            <Sparkles className="text-indigo-500 dark:text-indigo-300" size={16} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Build Systems. Scale Businesses.
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.05]">
            {homepageCMS?.content?.mainHeaing ? (
              homepageCMS.content.mainHeaing
            ) : (
              <>
                Engineering{' '}
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  scalable software
                </span>{' '}
                for modern businesses
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {homepageCMS?.content?.heroSubtitle ||
              'We help businesses reduce manual work, automate operations, and build scalable digital systems — from idea to deployment.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => scrollToSection('products')}
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center">
                Explore products
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </span>
            </button>
            <button
              onClick={() => scrollToSection('solutions')}
              className="group px-8 py-4 rounded-xl border border-gray-300 dark:border-white/15 bg-white/60 dark:bg-white/5 text-gray-900 dark:text-white text-lg font-semibold backdrop-blur hover:border-indigo-400 transition-all hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center">
                Our solutions
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </span>
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto lg:mx-0">
            {STATS(homepageCMS, products.length).map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 backdrop-blur"
              >
                <div className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D scene */}
        <div ref={sceneRef} className="relative h-[380px] sm:h-[460px] lg:h-[640px]">
          {canRender3D ? (
            <SceneBoundary fallback={<SceneFallback />}>
              <Suspense fallback={<SceneFallback />}>
                <HeroScene products={products} active={inView} calm={calm} showLabels={wide} />
              </Suspense>
            </SceneBoundary>
          ) : (
            <SceneFallback />
          )}
          <p className="pointer-events-none absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <MousePointerClick size={14} /> Tap a product to see it
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
