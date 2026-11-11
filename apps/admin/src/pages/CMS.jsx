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
  mainHeading: '',

  heroSubtitle: '',

  projectsDelivered: '',

  aboutText: '',

  missionText: '',
});

  const [loading, setLoading] =
    useState(false);

  const fetchCMS = async () => {
    try {
      const data =
        await getHomepageCMS();

     setContent({
  mainHeading:
    data.content?.mainHeading || '',

  heroSubtitle:
    data.content?.heroSubtitle || '',

  projectsDelivered:
    data.content?.projectsDelivered ||
    '',

  aboutText:
    data.content?.aboutText || '',

  missionText:
    data.content?.missionText || '',
});
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
      setLoading(true);

      await updateHomepageCMS({
        content,
      });

      alert('CMS Updated');
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Homepage CMS
          </h1>

          <p className="text-gray-600 mt-2">
            Manage homepage content.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <form
  onSubmit={handleSubmit}
  className="space-y-6"
>
  {/* Main Heading */}
  <div>
    <label className="block mb-2 font-medium text-gray-700">
      Main Heading
    </label>

    <textarea
      name="mainHeading"
      placeholder="Enter main heading"
      value={content.mainHeading}
      onChange={handleChange}
      rows={3}
      className="w-full border px-4 py-3 rounded-lg"
    />
  </div>

  {/* Hero Subtitle */}
  <div>
    <label className="block mb-2 font-medium text-gray-700">
      Hero Subtitle
    </label>

    <textarea
      name="heroSubtitle"
      placeholder="Enter hero subtitle"
      value={content.heroSubtitle}
      onChange={handleChange}
      rows={4}
      className="w-full border px-4 py-3 rounded-lg"
    />
  </div>

  {/* Projects Delivered */}
  <div>
    <label className="block mb-2 font-medium text-gray-700">
      Projects Delivered
    </label>

    <input
      type="text"
      name="projectsDelivered"
      placeholder="50+"
      value={content.projectsDelivered}
      onChange={handleChange}
      className="w-full border px-4 py-3 rounded-lg"
    />
  </div>

  {/* About Text */}
  <div>
    <label className="block mb-2 font-medium text-gray-700">
      About Section Text
    </label>

    <textarea
      name="aboutText"
      placeholder="Enter about section text"
      value={content.aboutText}
      onChange={handleChange}
      rows={4}
      className="w-full border px-4 py-3 rounded-lg"
    />
  </div>

  {/* Mission */}
  <div>
    <label className="block mb-2 font-medium text-gray-700">
      Mission Statement
    </label>

    <textarea
      name="missionText"
      placeholder="Enter mission statement"
      value={content.missionText}
      onChange={handleChange}
      rows={4}
      className="w-full border px-4 py-3 rounded-lg"
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className="bg-black text-white px-6 py-3 rounded-lg"
  >
    {loading
      ? 'Updating...'
      : 'Update CMS'}
  </button>
</form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CMS;