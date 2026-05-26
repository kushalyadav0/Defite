import {
  useEffect,
  useState,
} from 'react';

import DashboardLayout from '../layouts/DashboardLayout';

import { getContacts } from '../services/contact.service';

const Contacts = () => {
  const [contacts, setContacts] = useState(
    []
  );

  const fetchContacts = async () => {
    try {
      const data = await getContacts();

      setContacts(data);
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-4xl font-bold mb-8">
          Contact Messages
        </h1>

        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">
                    {contact.name}
                  </h2>

                  <p className="text-gray-600">
                    {contact.email}
                  </p>
                </div>

                <span className="text-sm text-gray-500">
                  {new Date(
                    contact.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              <h3 className="font-semibold mb-2">
                {contact.subject}
              </h3>

              <p className="text-gray-700">
                {contact.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Contacts;