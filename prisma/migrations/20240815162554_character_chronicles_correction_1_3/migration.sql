/*
  Warnings:

  - You are about to drop the column `strenghMod` on the `Attributes` table. All the data in the column will be lost.
  - Added the required column `strengthMod` to the `Attributes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attributes" DROP COLUMN "strenghMod",
ADD COLUMN     "strengthMod" INTEGER NOT NULL;
