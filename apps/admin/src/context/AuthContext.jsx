import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(
    true
  );

  useEffect(() => {
    const token = localStorage.getItem(
      'admin_token'
    );

    if (token) {
      setUser({ token });
    }

    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem(
      'admin_token',
      token
    );

    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem(
      'admin_token'
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);