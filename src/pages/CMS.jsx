import {
  useEffect,
  useState,
} from 'react';

import DashboardLayout from '../layouts/DashboardLayout';

import {
  getHomepageCMS,
  updateHomepageCMS,
} from '../services/cms.service';

const CMS = () => {
  const [content, setContent] = useState({
    heroTitle: '',
    heroSubtitle: '',
    ctaText: '',
  });

  const fetchCMS = async () => {
    try {
      const data =
        await getHomepageCMS();

      setContent(data.content);
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    }
  };

  useEffect(() => {
    fetchCMS();
  }, []);

  const handleChange = (e) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateHomepageCMS({
        content,
      });

      alert('CMS Updated');
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-4xl font-bold mb-8">
          Homepage CMS
        </h1>

        <div className="bg-white p-6 rounded-xl shadow">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              name="heroTitle"
              placeholder="Hero Title"
              value={content.heroTitle}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <textarea
              name="heroSubtitle"
              placeholder="Hero Subtitle"
              value={content.heroSubtitle}
              onChange={handleChange}
              rows={4}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              type="text"
              name="ctaText"
              placeholder="CTA Text"
              value={content.ctaText}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <button className="bg-black text-white px-6 py-3 rounded-lg">
              Update CMS
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CMS;