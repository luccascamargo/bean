import { usePokemon } from "@/contexts/PokemonContext";
import { useUser } from "@/contexts/UserContext";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [teamName, setTeamName] = useState("");
  const navigate = useNavigate();
  const { selectedPokemon, removeAllPokemons } = usePokemon();
  const { handleUser, user } = useUser();

  const handleCreateTeam = useMutation({
    mutationKey: ["createATeam", user?.id],
    mutationFn: async () => {
      const result = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/create-team`,
        {
          method: "POST",
          body: JSON.stringify({
            teamName,
            userId: user?.id,
            pokemons: selectedPokemon,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const data = await result.json();
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      removeAllPokemons();
      setTeamName("");
      return alert("Time criado com sucesso");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSignOut = () => {
    handleUser(null);
    return navigate("/signin");
  };

  return (
    <div className="w-screen max-w-[1200px] m-auto flex items-center justify-between p-8 rounded border my-10">
      <Link
        to={"/"}
        className={`mt-2 px-4 py-2 rounded-md disabled:bg-slate-200 ${"bg-green-500 text-white"}`}
      >
        Inicio
      </Link>
      <span>Olá, {user?.name}</span>
      <input
        className="mt-2 px-4 py-2 rounded-md border"
        type="text"
        placeholder="Nome do time"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <div className="flex items-center gap-5">
        <Link
          to={"/my-teams"}
          className={`mt-2 px-4 py-2 rounded-md disabled:bg-slate-200 ${"bg-green-500 text-white"}`}
        >
          Meus times
        </Link>

        <button
          type="button"
          onClick={() => handleCreateTeam.mutate()}
          disabled={(selectedPokemon.length === 0 && true) || teamName === ""}
          className={`mt-2 px-4 py-2 rounded-md disabled:bg-slate-200 ${"bg-green-500 text-white"}`}
        >
          Salvar time
        </button>
        <button
          type="button"
          onClick={handleSignOut}
          className={`mt-2 px-4 py-2 rounded-md`}
        >
          Sair
        </button>
      </div>
    </div>
  );
}
