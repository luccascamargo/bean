import { createContext, useState, useContext, ReactNode } from "react";

interface iPokemonContext {
  addPokemon: (pokemon: iPokemon) => void;
  removePokemon: (pokemonName: string) => void;
  selectedPokemon: iPokemon[];
  removeAllPokemons: () => void;
}

interface iPokemonProvider {
  children: ReactNode;
}

export interface iPokemon {
  name: string;
  url: string;
}

const PokemonContext = createContext<iPokemonContext>({} as iPokemonContext);

export const PokemonProvider = ({ children }: iPokemonProvider) => {
  const [selectedPokemon, setSelectedPokemon] = useState<iPokemon[]>([]);

  const addPokemon = (pokemon: iPokemon) => {
    setSelectedPokemon((prevState) => [...prevState, pokemon]);
  };

  const removePokemon = (pokemonName: string) => {
    setSelectedPokemon((prevState) =>
      prevState.filter((pokemon) => pokemon.name !== pokemonName)
    );
  };

  const removeAllPokemons = () => {
    setSelectedPokemon([]);
  };

  return (
    <PokemonContext.Provider
      value={{ selectedPokemon, addPokemon, removePokemon, removeAllPokemons }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export function usePokemon() {
  const context = useContext(PokemonContext);
  return context;
}
