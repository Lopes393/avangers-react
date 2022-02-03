import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface Character {
  id: number;
  name: string;
  type: string;
  description: string;
  category: string;
  especie: string;
  createdAt: string;
}

interface CharactersProviderProps {
  children: ReactNode;
}

interface CharactersContextData {
  characters: Character[];
}
const CharactersContext = createContext<CharactersContextData>(
  {} as CharactersContextData
);

export function CharactersProvider({ children }: CharactersProviderProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  useEffect(() => {
    api
      .get("/characters")
      .then((response) => setCharacters(response.data.transactions));
  }, []);
  return (
    <CharactersContext.Provider value={{ characters }}>
      {children}
    </CharactersContext.Provider>
  );
}

export function useCharacters() {
  const context = useContext(CharactersContext);

  return context;
}
