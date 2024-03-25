import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { iPokemon } from "./PokemonContext";

export interface iUser {
  id: string;
  name: string;
  teams: iTeam[];
}

interface iUserContext {
  user: iUser;
  handleUser: (user: iUser | null) => void;
}

interface iUserProvider {
  children: ReactNode;
}

export interface iTeam {
  name: string;
  pokemons: iPokemon[];
}

const UserContext = createContext<iUserContext>({} as iUserContext);

export const UserProvider = ({ children }: iUserProvider) => {
  const [user, setUser] = useState<iUser | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const saveUserToLocalStorage = (user: iUser | null) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    saveUserToLocalStorage(user);
  }, [user]);

  const handleUser = (user: iUser | null) => {
    setUser(user || null);
  };

  return (
    <UserContext.Provider value={{ user: user!, handleUser: handleUser! }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
