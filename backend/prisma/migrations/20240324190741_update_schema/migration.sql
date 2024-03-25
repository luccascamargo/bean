/*
  Warnings:

  - The primary key for the `PokemonTeam` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "PokemonTeam" DROP CONSTRAINT "PokemonTeam_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PokemonTeam_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PokemonTeam_id_seq";
