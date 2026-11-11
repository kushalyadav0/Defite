import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getSettings } from '../services/settings.service';

import { getHomepageCMS } from '../services/cms.service';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState(
    null
  );

  const [homepageCMS, setHomepageCMS] =
    useState(null);

  const [loading, setLoading] = useState(
    true
  );

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const [settingsData, cmsData] =
          await Promise.all([
            getSettings(),
            getHomepageCMS(),
          ]);

        setSettings(settingsData);

        setHomepageCMS(cmsData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        settings,
        homepageCMS,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () =>
  useContext(AppContext);