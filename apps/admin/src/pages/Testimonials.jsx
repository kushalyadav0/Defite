import {
  useEffect,
  useState,
  useRef,
} from 'react';

import DashboardLayout from '../layouts/DashboardLayout';

import {
  getTestimonials,
  createTestimonial,
  deleteTestimonial,
} from '../services/testimonial.service';

import { uploadImage } from '../services/upload.service';

const Testimonials = () => {
  const [testimonials, setTestimonials] =
    useState([]);

  const [loading, setLoading] = useState(
    false
  );

  const [uploading, setUploading] =
    useState(false);

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    message: '',
    image: '',
    rating: 5,
  });

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      const data =
        await getTestimonials();

      setTestimonials(data);
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Image Upload
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
        image: data.url,
      }));
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    } finally {
      setUploading(false);
    }
  };

  // Create
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createTestimonial({
        ...formData,
        rating: Number(formData.rating),
      });

      fetchTestimonials();

      setFormData({
        name: '',
        designation: '',
        message: '',
        image: '',
        rating: 5,
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value =
          '';
      }
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteTestimonial(id);

      fetchTestimonials();
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    }
  };

  return (
    <DashboardLayout>
      <div>
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Testimonials
          </h1>

          <p className="text-gray-600 mt-2">
            Manage client testimonials here.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-2xl font-semibold mb-6">
            Add Testimonial
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Client Name"
              value={formData.name}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="designation"
              placeholder="CEO at Company"
              value={formData.designation}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
            />

            {/* Image Upload */}
            <div className="border rounded-lg">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 file:border file:border-gray-400 file:bg-transparent file:px-3 file:py-1 file:rounded-md file:mr-4"
              />

              {uploading && (
                <p className="text-blue-600 text-sm">
                  Uploading image...
                </p>
              )}

              {formData.image && (
                <img
                  src={`http://defite.cloud${formData.image}`}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border"
                />
              )}
            </div>

            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
              min="1"
              max="5"
            />

            <textarea
              name="message"
              placeholder="Client Message"
              value={formData.message}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg md:col-span-2"
              rows={4}
              required
            />

            <button
              type="submit"
              disabled={
                loading || uploading
              }
              className="bg-black text-white py-3 rounded-lg md:col-span-2"
            >
              {loading
                ? 'Creating...'
                : 'Create Testimonial'}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-6">
            All Testimonials
          </h2>

          <div className="space-y-4">
            {testimonials.map(
              (testimonial) => (
                <div
                  key={testimonial._id}
                  className="border rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {/* Client Image */}
                    <img
                      src={`http://defite.cloud${testimonial.image}`}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border"
                    />

                    <div>
                      <h3 className="text-xl font-bold">
                        {testimonial.name}
                      </h3>

                      <p className="text-gray-600">
                        {
                          testimonial.designation
                        }
                      </p>

                      <p className="mt-2 text-gray-700">
                        {testimonial.message}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        testimonial._id
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Testimonials;