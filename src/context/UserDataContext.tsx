import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import API_CONSTANTS from "@/services/config";

interface User {
  id: number;
  userName: string;
  profilePhoto: string;
}

interface Profile {
  id: number;
  userName: string;
  profilePhoto: string;
  city: string;
  country: string;
}

interface UserDataState {
  profiles: Profile[] | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

type UserDataAction =
  | { type: "FETCH_PROFILES_SUCCESS"; payload: Profile[] }
  | { type: "FETCH_USER_SUCCESS"; payload: User }
  | { type: "FETCH_ERROR"; payload: string };

const initialState: UserDataState = {
  profiles: null,
  user: null,
  loading: true,
  error: null,
};

const userDataReducer = (
  state: UserDataState,
  action: UserDataAction
): UserDataState => {
  switch (action.type) {
    case "FETCH_PROFILES_SUCCESS":
      return {
        ...state,
        profiles: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_USER_SUCCESS":
      return { ...state, user: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return {
        ...state,
        profiles: null,
        user: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const UserDataContext = createContext<UserDataState | undefined>(undefined);

interface UserDataProviderProps {
  children: ReactNode;
}

const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userDataReducer, initialState);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`${API_CONSTANTS.API_HOME}/profiles`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Error al cargar perfiles");
        }
        const data = await response.json();
        dispatch({ type: "FETCH_PROFILES_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: (error as Error).message });
      }
    };

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_CONSTANTS.API_BASE_URL}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Error al cargar usuario");
        }
        const data = await response.json();
        dispatch({ type: "FETCH_USER_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: (error as Error).message });
      }
    };

    fetchProfiles();
    fetchUser();
  }, []);

  return (
    <UserDataContext.Provider value={state}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData debe usarse dentro de un UserDataProvider");
  }
  return context;
};

export default UserDataProvider;
