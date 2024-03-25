import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";

export default function SignIn() {
  const { handleUser } = useUser();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const handleLoginAccount = useMutation({
    mutationKey: ["createAccount"],
    mutationFn: async () => {
      const result = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/login`,
        {
          method: "POST",
          body: JSON.stringify({
            name: userInput,
            password: pass,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const data = await result.json();
      return data;
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      if (data?.error) {
        return alert(data.error);
      }
      console.log(data);
      handleUser({
        id: data.existingUser.id,
        name: data.existingUser.name,
        teams: data.existingUser.teams,
      });
      alert(data.message);
      return navigate("/");
    },
  });

  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="max-w-96 rounded border p-8 flex flex-col items-start gap-8">
        <input
          type="text"
          placeholder="Usuario"
          className="border rounded p-3"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border rounded p-3"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <div className="flex items-center gap-5">
          <button
            type="submit"
            className="border rounded p-3"
            onClick={() => handleLoginAccount.mutate()}
            disabled={pass === "" && true}
          >
            Entrar
          </button>
          <Link to={"/signup"}>Criar conta</Link>
        </div>
      </div>
    </div>
  );
}
