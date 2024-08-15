/*
  Warnings:

  - You are about to drop the column `constituitionMod` on the `SavingThrows` table. All the data in the column will be lost.
  - Added the required column `constitutionMod` to the `SavingThrows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavingThrows" DROP COLUMN "constituitionMod",
ADD COLUMN     "constitutionMod" INTEGER NOT NULL;
