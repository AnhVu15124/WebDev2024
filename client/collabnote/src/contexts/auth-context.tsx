import { Dispatch, SetStateAction, createContext, useState } from "react";

interface AuthContextInterface {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loadingAuth: boolean;
  setLoadingAuth: Dispatch<SetStateAction<boolean>>;
  errors: Array<string>;
  setErrors: Dispatch<SetStateAction<Array<string>>>;
  userID: number | null;
  setUserID: Dispatch<SetStateAction<number | null>>;
  email: string | null;
  setEmail: Dispatch<SetStateAction<string | null>>;
}

const defaultValues = {
  accessToken: null,
  setAccessToken: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  loading: false,
  setLoading: () => {},
  loadingAuth: true,
  setLoadingAuth: () => {},
  errors: [],
  setErrors: () => {},
  userID: null,
  setUserID: () => {},
  email: null,
  setEmail: () => {},
};

export const AuthContext = createContext<AuthContextInterface>(defaultValues);

interface AuthProviderInterface {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    defaultValues.accessToken
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultValues.isAuthenticated
  );
  const [loading, setLoading] = useState<boolean>(defaultValues.loading);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(
    defaultValues.loadingAuth
  );
  const [errors, setErrors] = useState<Array<string>>(defaultValues.errors);
  const [userID, setUserID] = useState<number | null>(defaultValues.userID);
  const [email, setEmail] = useState<string | null>(defaultValues.email);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        loadingAuth,
        setLoadingAuth,
        errors,
        setErrors,
        userID,
        setUserID,
        email,
        setEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};