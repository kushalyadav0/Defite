import { useEffect, useState } from 'react';
import { ExternalLink, Shield } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/product.service';

const STATUS_LABELS = {
  live: 'Live',
  beta: 'Beta',
  coming_soon: 'Coming soon',
};

const STATUS_STYLES = {
  live: 'bg-green-100 text-green-800',
  beta: 'bg-yellow-100 text-yellow-800',
  coming_soon: 'bg-gray-200 text-gray-700',
};

const emptyForm = {
  name: '',
  slug: '',
  tagline: '',
  tags: '',
  description: '',
  audience: '',
  features: '',
  appUrl: '',
  demoUrl: '',
  superadminUrl: '',
  status: 'coming_soon',
  accent: '#6366f1',
  order: 0,
  isPublished: true,
};

const toForm = (p) => ({
  ...emptyForm,
  ...p,
  tags: (p.tags || []).join(', '),
  features: (p.features || []).join('\n'),
});

const toPayload = (f) => ({
  name: f.name.trim(),
  slug: f.slug.trim(),
  tagline: f.tagline,
  tags: f.tags.split(',').map((t) => t.trim()).filter(Boolean),
  description: f.description,
  audience: f.audience,
  features: f.features.split('\n').map((t) => t.trim()).filter(Boolean),
  appUrl: f.appUrl.trim(),
  demoUrl: f.demoUrl.trim(),
  superadminUrl: f.superadminUrl.trim(),
  status: f.status,
  accent: f.accent,
  order: Number(f.order) || 0,
  isPublished: Boolean(f.isPublished),
});

const LinkOut = ({ href, icon: Icon = ExternalLink, children }) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
    >
      <Icon size={14} />
      {children}
    </a>
  ) : null;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setProducts((await getAdminProducts()) || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let active = true;
    getAdminProducts()
      .then((data) => active && setProducts(data || []))
      .catch((err) => console.log(err));
    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setSaving(true);
      const payload = toPayload(form);
      if (editingId) await updateProduct(editingId, payload);
      else await createProduct(payload);
      resetForm();
      fetchProducts();
    } catch (err) {
      const data = err.response?.data;
      setError(data?.message || 'Could not save the product. Check the links start with https://');
      console.log(data || err);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm(toForm(product));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete ${product.name}? This cannot be undone.`)) return;
    try {
      await deleteProduct(product._id);
      if (editingId === product._id) resetForm();
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const input = 'border px-4 py-3 rounded-lg w-full';

  return (
    <DashboardLayout>
      <div>
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Products</h1>
          <p className="text-gray-600 mt-2">
            Defite's products and the links the website opens for each one.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-2xl font-semibold mb-6">
            {editingId ? `Edit ${form.name}` : 'Add Product'}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className={input} required />
            <input name="slug" placeholder="Slug (e.g. rivao)" value={form.slug} onChange={handleChange} className={input} required />
            <input name="tagline" placeholder="One-line tagline" value={form.tagline} onChange={handleChange} className={`${input} md:col-span-2`} />
            <input name="tags" placeholder="Tags, comma separated (Retail, POS)" value={form.tags} onChange={handleChange} className={input} />
            <input name="audience" placeholder="Who it's for" value={form.audience} onChange={handleChange} className={input} />

            <label className="text-sm text-gray-600">
              App link (opened from the website)
              <input name="appUrl" placeholder="https://app.rivao.defite.in" value={form.appUrl} onChange={handleChange} className={input} />
            </label>
            <label className="text-sm text-gray-600">
              Demo link (optional, if different from the app)
              <input name="demoUrl" placeholder="https://..." value={form.demoUrl} onChange={handleChange} className={input} />
            </label>
            <label className="text-sm text-gray-600">
              Superadmin link (only shown here, never on the website)
              <input name="superadminUrl" placeholder="https://superadmin.rivao.defite.in" value={form.superadminUrl} onChange={handleChange} className={input} />
            </label>
            <label className="text-sm text-gray-600">
              Status
              <select name="status" value={form.status} onChange={handleChange} className={input}>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>

            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className={`${input} md:col-span-2`} rows={3} />
            <textarea name="features" placeholder="Features, one per line (only what is live today)" value={form.features} onChange={handleChange} className={`${input} md:col-span-2`} rows={4} />

            <label className="text-sm text-gray-600">
              Accent colour
              <input type="color" name="accent" value={form.accent} onChange={handleChange} className="block h-12 w-24 border rounded-lg" />
            </label>
            <label className="text-sm text-gray-600">
              Display order
              <input type="number" name="order" value={form.order} onChange={handleChange} className={input} />
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 md:col-span-2">
              <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} />
              Show on the website
            </label>

            {error && <p className="text-red-600 text-sm md:col-span-2">{error}</p>}

            <div className="flex gap-3 md:col-span-2">
              <button type="submit" disabled={saving} className="bg-black text-white py-3 px-6 rounded-lg flex-1">
                {saving ? 'Saving...' : editingId ? 'Save changes' : 'Create Product'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="border py-3 px-6 rounded-lg">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-6">All Products</h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product._id} className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-3 h-12 rounded-full shrink-0" style={{ background: product.accent }} />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${STATUS_STYLES[product.status]}`}>
                        {STATUS_LABELS[product.status]}
                      </span>
                      {!product.isPublished && (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Hidden</span>
                      )}
                    </div>
                    <p className="text-gray-600">{product.tagline}</p>
                    <div className="flex gap-4 mt-2 flex-wrap">
                      <LinkOut href={product.appUrl}>App</LinkOut>
                      <LinkOut href={product.demoUrl}>Demo</LinkOut>
                      <LinkOut href={product.superadminUrl} icon={Shield}>Superadmin</LinkOut>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(product)} className="border px-4 py-2 rounded-lg">Edit</button>
                  <button onClick={() => handleDelete(product)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
                </div>
              </div>
            ))}
            {!products.length && <p className="text-gray-500">No products yet.</p>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Products;
