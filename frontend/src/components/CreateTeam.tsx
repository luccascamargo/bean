import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PokemonCard from "./PokemonCard";
import { iPokemon, usePokemon } from "../contexts/PokemonContext";

export default function CreateTeam() {
  const [searchText, setSearchText] = useState("");

  const { data, isError } = useQuery<iPokemon[]>({
    queryKey: ["getPokemons"],
    queryFn: async () => {
      const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30", {
        method: "GET",
      });
      const res = await data.json();
      return res.results;
    },
  });

  if (isError || data === undefined) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <span>Falha ao carregar os pokemons</span>
      </div>
    );
  }

  const filteredPokemon = data?.filter((pokemon: iPokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <SelectedPokemonList />
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Lista de Pokémon</h1>
        <input
          type="text"
          placeholder="Buscar Pokémon"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredPokemon.length === 0 && (
            <span>Nenhum pokemon encontrado</span>
          )}
          {filteredPokemon.map((pokemon: iPokemon, index: number) => (
            <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
          ))}
        </div>
      </div>
    </>
  );
}

const SelectedPokemonList = () => {
  const { selectedPokemon, removePokemon } = usePokemon();

  const handleRemovePokemon = (name: string) => {
    removePokemon(name);
  };

  return (
    <div className="container mx-auto mb-24">
      <h2 className="text-2xl font-semibold mb-4">Pokémon Selecionados</h2>
      {selectedPokemon.length === 0 ? (
        <p>Nenhum Pokémon selecionado</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {selectedPokemon.map((pokemon, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-md p-4 mb-4"
            >
              <h2 className="text-xl font-semibold mb-2">{pokemon.name}</h2>
              <button
                type="button"
                onClick={() => handleRemovePokemon(pokemon.name)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
