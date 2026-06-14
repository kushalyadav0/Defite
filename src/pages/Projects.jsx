import {
  useEffect,
  useState,
  useRef,
} from 'react';

import DashboardLayout from '../layouts/DashboardLayout';

import {
  getProjects,
  createProject,
  deleteProject,
} from '../services/project.service';

import { uploadImage } from '../services/upload.service';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    thumbnail: '',
    projectUrl: '',
    category: '',
    gradient:
      'from-blue-500 to-purple-600',
    technologies: '',
  });

  const fileInputRef = useRef(null);

  const formatImageUrl = (url) => {
    if (!url) return '';

    if (
      url.startsWith('http://') ||
      url.startsWith('https://')
    ) {
      return url;
    }

    return `https://defite.cloud${url}`;
  };

  const fetchProjects = async () => {
    try {
      const data = await getProjects();

      setProjects(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

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
        thumbnail:
          data?.url ||
          data?.path ||
          data?.filePath ||
          '',
      }));
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        technologies:
          formData.technologies
            .split(',')
            .map((tech) =>
              tech.trim()
            )
            .filter(Boolean),
      };

      await createProject(payload);

      fetchProjects();

      setFormData({
        title: '',
        slug: '',
        description: '',
        thumbnail: '',
        projectUrl: '',
        category: '',
        gradient:
          'from-blue-500 to-purple-600',
        technologies: '',
      });

      if (fileInputRef.current) {
        fileInputRef.current.value =
          '';
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Projects
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your projects here.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-2xl font-semibold mb-6">
            Add Project
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="slug"
              placeholder="Slug"
              value={formData.slug}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
              required
            />

            <div className="border rounded-lg p-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={
                  handleImageUpload
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 file:border file:border-gray-400 file:bg-transparent file:px-3 file:py-1 file:rounded-md file:mr-4"
              />

              {uploading && (
                <p className="text-sm text-blue-600 mt-2">
                  Uploading image...
                </p>
              )}

              {formData.thumbnail && (
                <img
                  src={formatImageUrl(
                    formData.thumbnail
                  )}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border mt-3"
                />
              )}
            </div>

            <input
              type="text"
              name="projectUrl"
              placeholder="Project URL"
              value={formData.projectUrl}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
            />

            <input
              type="text"
              name="technologies"
              placeholder="React, Node.js"
              value={
                formData.technologies
              }
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={
                formData.description
              }
              onChange={handleChange}
              className="border px-4 py-3 rounded-lg md:col-span-2"
              rows={4}
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
                : 'Create Project'}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-6">
            All Projects
          </h2>

          <div className="space-y-4">
            {projects.map(
              (project) => (
                <div
                  key={project._id}
                  className="border rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={formatImageUrl(
                        project.thumbnail
                      )}
                      alt={
                        project.title
                      }
                      className="w-20 h-20 object-cover rounded-lg border"
                    />

                    <div>
                      <h3 className="text-xl font-bold">
                        {
                          project.title
                        }
                      </h3>

                      <p className="text-gray-600">
                        {
                          project.category
                        }
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        project._id
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

export default Projects;