// src/components/PokemonCard.js
import { useEffect, useState } from "react";
import { iPokemon, usePokemon } from "../contexts/PokemonContext";
import { useQuery } from "@tanstack/react-query";

interface Pokemon {
  species: {
    name: string;
    url: string;
  };
  evolves_to: Pokemon[];
}

interface EvolutionChain {
  name: string;
  spriteUrl: string;
}

const PokemonCard = ({ name, url }: iPokemon) => {
  const { selectedPokemon, addPokemon, removePokemon } = usePokemon();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddRemoveClick = () => {
    if (isAdded) {
      removePokemon(name);
    } else {
      addPokemon({ name, url });
    }
    setIsAdded((prevState) => !prevState);
  };

  useEffect(() => {
    const filterPokemon = selectedPokemon.filter(
      (value) => value.name === name
    );
    if (filterPokemon.length > 0) {
      setIsAdded(true);
      return;
    }
    setIsAdded(false);
  }, [selectedPokemon]);

  const fetchEvolution = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const speciesUrl = data.species.url;
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();
    const evolutionChainUrl = speciesData.evolution_chain.url;
    const evolutionChainResponse = await fetch(evolutionChainUrl);
    const evolutionChainData = await evolutionChainResponse.json();
    return parseEvolutionChain(evolutionChainData.chain);
  };

  const { data: evolutionChain } = useQuery({
    queryKey: ["evolution", url],
    queryFn: fetchEvolution,
  });

  const parseEvolutionChain = (chain: Pokemon): EvolutionChain[] => {
    const evolutionChain: EvolutionChain[] = [];
    parseEvolutionChainHelper(chain, evolutionChain);
    return evolutionChain;
  };

  const parseEvolutionChainHelper = (
    chain: Pokemon,
    result: EvolutionChain[]
  ) => {
    result.push({
      name: chain.species.name,
      spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species.url
        .split("/")
        .slice(-2, -1)}.png`,
    });
    if (chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((e) => parseEvolutionChainHelper(e, result));
    }
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <div className="mt-2">
        <h3 className="text-lg font-semibold">Evolução:</h3>
        <div className="flex flex-wrap">
          {evolutionChain &&
            evolutionChain.map((pokemon, index) => (
              <div key={index} className="text-center">
                <p className="mb-1">{pokemon.name}</p>
                <img
                  src={pokemon.spriteUrl}
                  alt={pokemon.name}
                  className="mx-auto"
                />
              </div>
            ))}
        </div>
      </div>
      <button
        onClick={handleAddRemoveClick}
        disabled={(selectedPokemon.length === 5 && true) || (isAdded && true)}
        className={`mt-2 px-4 py-2 rounded-md disabled:bg-slate-200 ${"bg-green-500 text-white"}`}
      >
        Adicionar
      </button>
    </div>
  );
};

export default PokemonCard;
