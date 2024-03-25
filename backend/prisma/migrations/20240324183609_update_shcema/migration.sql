/*
  Warnings:

  - You are about to drop the column `teamId` on the `Pokemon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_teamId_fkey";

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "teamId",
ADD COLUMN     "team_id" TEXT;

-- CreateTable
CREATE TABLE "PokemonTeam" (
    "id" SERIAL NOT NULL,
    "team_id" TEXT NOT NULL,
    "pokemon_id" TEXT NOT NULL,

    CONSTRAINT "PokemonTeam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PokemonTeam" ADD CONSTRAINT "PokemonTeam_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonTeam" ADD CONSTRAINT "PokemonTeam_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
