import { Request, Response, Router } from "express";
import { prisma } from "./utils/prisma";

import bcrypt from "bcrypt";

export const route = Router();

route.get("/", (req: Request, res: Response) => {
  res.send("Backend está funcionando!");
});

route.get("/myteams/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const teams = await prisma.team.findMany({
    where: {
      user_id: id,
    },
    include: {
      PokemonTeam: { include: { pokemon: true } },
    },
  });

  return res.status(200).json(teams);
});

route.post("/create-team", async (req: Request, res: Response) => {
  const { teamName, userId, pokemons } = req.body;

  const createdTeam = await prisma.team.create({
    data: {
      name: teamName,
      user_id: userId,
    },
    include: {
      PokemonTeam: true,
    },
  });

  for (const pokemon of pokemons) {
    const pokemonAlreadyExists = await prisma.pokemon.findFirst({
      where: {
        name: pokemon.name,
      },
    });

    if (pokemonAlreadyExists) {
      await prisma.pokemonTeam.create({
        data: {
          team_id: createdTeam.id,
          pokemon_id: pokemonAlreadyExists.id,
        },
      });
    } else {
      const createdPokemon = await prisma.pokemon.create({
        data: {
          name: pokemon.name,
        },
      });

      await prisma.pokemonTeam.create({
        data: {
          team_id: createdTeam.id,
          pokemon_id: createdPokemon.id,
        },
      });
    }
  }

  return res.status(200).json({ message: "Time criado com sucesso" });
});

route.post("/register", async (req: Request, res: Response) => {
  const { name, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { name },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
      include: {
        teams: true,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro durante o registro:", error);
    res.status(500).json({ error: "Erro durante o registro do usuário" });
  }
});

route.post("/login", async (req: Request, res: Response) => {
  const { name, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { name },
      include: {
        teams: true,
      },
    });

    if (!existingUser) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    res.status(200).json({ message: "Login bem-sucedido", existingUser });
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(500).json({ error: "Erro durante o login" });
  }
});
