import {
  useEffect,
  useState,
  useRef,
} from 'react';

import DashboardLayout from '../layouts/DashboardLayout';

import {
  getSettings,
  updateSettings,
} from '../services/settings.service';

import { uploadImage } from '../services/upload.service';

const Settings = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    responseTime: '',
    logo: '',
  });

  const [loading, setLoading] = useState(
    false
  );

  const [uploading, setUploading] =
    useState(false);

  const fileInputRef = useRef(null);

  // Fetch settings
  const fetchSettings = async () => {
    try {
      const data = await getSettings();

      setFormData({
        companyName:
          data.companyName || '',

        email: data.email || '',

        phone: data.phone || '',

        address: data.address?.trim() || '',

        responseTime:
          data.responseTime || '',

        logo: data.logo || '',
      });
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // Logo Upload
  const handleImageUpload = async (
    e
  ) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const data = await uploadImage(
        file
      );

      setFormData((prev) => ({
        ...prev,
        logo: data.url,
      }));
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    } finally {
      setUploading(false);
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateSettings(formData);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value =
          '';
      }

      // Remove preview after update
      setFormData((prev) => ({
        ...prev,
        logo: '',
      }));

      alert('Settings Updated');
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
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Settings
          </h1>

          <p className="text-gray-600 mt-2">
            Manage company settings here.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Company Name */}
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
            />

            {/* Phone */}
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
            />

            {/* Address */}
        <input
  type="text"
  name="address"
  placeholder="Enter Company Address"
  value={formData.address || ''}
  onChange={handleChange}
  className="border px-4 py-3 rounded-lg"
/>

            {/* Response Time */}
            <input
              type="text"
              name="responseTime"
              placeholder="Response Time"
              value={formData.responseTime}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
            />

            {/* Logo Upload */}
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-black-300 rounded-lg px-4 py-3 file:border file:border-gray-400 file:bg-transparent file:px-3 file:py-1 file:rounded-md file:mr-4"
              />

              {uploading && (
                <p className="text-blue-600 text-sm">
                  Uploading logo...
                </p>
              )}

              {formData.logo &&
                !uploading && (
                  <img
                    src={`http://localhost:5000${formData.logo}`}
                    alt="Logo Preview"
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={
                loading || uploading
              }
              className="bg-black text-white py-3 rounded-lg md:col-span-2"
            >
              {loading
                ? 'Updating...'
                : 'Update Settings'}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;