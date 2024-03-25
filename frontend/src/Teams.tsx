import { useQuery } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import { useUser } from "./contexts/UserContext";

export type TeamRoot = Team[];

export interface Team {
  id: string;
  name: string;
  user_id: string;
  PokemonTeam: PokemonTeam[];
}

export interface PokemonTeam {
  id: string;
  team_id: string;
  pokemon_id: string;
  pokemon: Pokemon;
}

export interface Pokemon {
  id: string;
  name: string;
  team_id: string | null;
}

export default function Teams() {
  const { user } = useUser();

  const handleTeams = useQuery({
    queryKey: ["myTeams", user?.id],
    enabled: user && true,
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/myteams/${user?.id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <Navbar />
      <div className="container flex items-center justify-evenly">
        {handleTeams.data?.map((value: Team) => (
          <div
            className="rounded-md border p-8 flex flex-col items-center justify-center gap-8"
            key={value.id}
          >
            <span>{value.name}</span>
            <ul>
              {value.PokemonTeam.map((value) => (
                <li key={value.pokemon_id}>{value.pokemon.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
