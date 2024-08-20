/*
  Warnings:

  - Added the required column `spellLevelName` to the `SpellLevel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SpellLevel" ADD COLUMN     "spellLevelName" TEXT NOT NULL;
