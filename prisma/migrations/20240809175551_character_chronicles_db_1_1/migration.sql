/*
  Warnings:

  - You are about to drop the column `abilityCheckId` on the `Attributes` table. All the data in the column will be lost.
  - You are about to drop the column `savingThrowId` on the `Attributes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[savingThrowId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[abilityCheckId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `abilityCheckId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `savingThrowId` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attributes" DROP CONSTRAINT "Attributes_abilityCheckId_fkey";

-- DropForeignKey
ALTER TABLE "Attributes" DROP CONSTRAINT "Attributes_savingThrowId_fkey";

-- DropIndex
DROP INDEX "Attributes_abilityCheckId_key";

-- DropIndex
DROP INDEX "Attributes_savingThrowId_key";

-- AlterTable
ALTER TABLE "Attributes" DROP COLUMN "abilityCheckId",
DROP COLUMN "savingThrowId";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "abilityCheckId" INTEGER NOT NULL,
ADD COLUMN     "savingThrowId" INTEGER NOT NULL,
ALTER COLUMN "failCounter" DROP NOT NULL,
ALTER COLUMN "failCounter" SET DEFAULT 0,
ALTER COLUMN "successCounter" DROP NOT NULL,
ALTER COLUMN "successCounter" SET DEFAULT 0,
ALTER COLUMN "history" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Character_savingThrowId_key" ON "Character"("savingThrowId");

-- CreateIndex
CREATE UNIQUE INDEX "Character_abilityCheckId_key" ON "Character"("abilityCheckId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_savingThrowId_fkey" FOREIGN KEY ("savingThrowId") REFERENCES "SavingThrows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_abilityCheckId_fkey" FOREIGN KEY ("abilityCheckId") REFERENCES "AbilityCheck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
