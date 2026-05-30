import DashboardLayout from '../layouts/DashboardLayout';

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Projects',
      value: 'Manage',
      path: '/projects',
    },

    {
      title: 'Testimonials',
      value: 'Manage',
      path: '/testimonials',
    },

    {
      title: 'CMS',
      value: 'Homepage',
      path: '/cms',
    },

    {
      title: 'Contacts',
      value: 'Messages',
      path: '/contacts',
    },

    {
      title: 'Settings',
      value: 'Company Info',
      path: '/settings',
    },
  ];

  return (
    <DashboardLayout>
      <div>
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Welcome Admin 👋
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your platform content from
            here.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              onClick={() =>
                navigate(card.path)
              }
              className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <h2 className="text-xl font-semibold mb-2">
                {card.title}
              </h2>

              <p className="text-gray-600">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;