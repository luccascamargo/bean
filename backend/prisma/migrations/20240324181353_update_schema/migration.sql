/*
  Warnings:

  - You are about to drop the `TeamsOnPokemons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeamsOnPokemons" DROP CONSTRAINT "TeamsOnPokemons_pokemon_id_fkey";

-- DropForeignKey
ALTER TABLE "TeamsOnPokemons" DROP CONSTRAINT "TeamsOnPokemons_team_id_fkey";

-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "teamId" TEXT;

-- DropTable
DROP TABLE "TeamsOnPokemons";

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
