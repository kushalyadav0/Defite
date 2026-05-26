import {
  useEffect,
  useState,
} from 'react';

import DashboardLayout from '../layouts/DashboardLayout';

import {
  getSettings,
  updateSettings,
} from '../services/settings.service';

const Settings = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    logo: '',
  });

  const fetchSettings = async () => {
    try {
      const data = await getSettings();

      setFormData(data);
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateSettings(formData);

      alert('Settings Updated');
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
          Settings
        </h1>

        <div className="bg-white p-6 rounded-xl shadow">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
            />

            <input
              type="text"
              name="logo"
              placeholder="Logo URL"
              value={formData.logo}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg md:col-span-2"
            />

            <button className="bg-black text-white py-3 rounded-lg md:col-span-2">
              Update Settings
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;