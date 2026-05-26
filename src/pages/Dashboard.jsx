import DashboardLayout from '../layouts/DashboardLayout';

const Dashboard = () => {
  const cards = [
    {
      title: 'Projects',
      value: 'Manage',
    },

    {
      title: 'Testimonials',
      value: 'Manage',
    },

    {
      title: 'CMS',
      value: 'Homepage',
    },

    {
      title: 'Contacts',
      value: 'Messages',
    },
  ];

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-4xl font-bold mb-10">
          Welcome Admin 👋
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white p-6 rounded-xl shadow"
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