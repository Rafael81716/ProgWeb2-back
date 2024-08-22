/*
  Warnings:

  - You are about to drop the column `characterId` on the `SpellLevel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[spellLevel0Id]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spellLevel1Id]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spellLevel2Id]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spellLevel3Id]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spellLevel4Id]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spellLevel5Id]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spellLevel6Id]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spellLevel7Id]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spellLevel8Id]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spellLevel9Id]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spellLevel0Id` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spellLevel1Id` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spellLevel2Id` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spellLevel3Id` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spellLevel4Id` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spellLevel5Id` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spellLevel6Id` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spellLevel7Id` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spellLevel8Id` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spellLevel9Id` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SpellLevel" DROP CONSTRAINT "SpellLevel_characterId_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "spellLevel0Id" INTEGER NOT NULL,
ADD COLUMN     "spellLevel1Id" INTEGER NOT NULL,
ADD COLUMN     "spellLevel2Id" INTEGER NOT NULL,
ADD COLUMN     "spellLevel3Id" INTEGER NOT NULL,
ADD COLUMN     "spellLevel4Id" INTEGER NOT NULL,
ADD COLUMN     "spellLevel5Id" INTEGER NOT NULL,
ADD COLUMN     "spellLevel6Id" INTEGER NOT NULL,
ADD COLUMN     "spellLevel7Id" INTEGER NOT NULL,
ADD COLUMN     "spellLevel8Id" INTEGER NOT NULL,
ADD COLUMN     "spellLevel9Id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SpellLevel" DROP COLUMN "characterId";

-- CreateIndex
CREATE UNIQUE INDEX "Character_spellLevel0Id_key" ON "Character"("spellLevel0Id");

-- CreateIndex
CREATE UNIQUE INDEX "Character_spellLevel1Id_key" ON "Character"("spellLevel1Id");

-- CreateIndex
CREATE UNIQUE INDEX "Character_spellLevel2Id_key" ON "Character"("spellLevel2Id");

-- CreateIndex
CREATE UNIQUE INDEX "Character_spellLevel3Id_key" ON "Character"("spellLevel3Id");

-- CreateIndex
CREATE UNIQUE INDEX "Character_spellLevel4Id_key" ON "Character"("spellLevel4Id");

-- CreateIndex
CREATE UNIQUE INDEX "Character_spellLevel5Id_key" ON "Character"("spellLevel5Id");

-- CreateIndex
CREATE UNIQUE INDEX "Character_spellLevel6Id_key" ON "Character"("spellLevel6Id");

-- CreateIndex
CREATE UNIQUE INDEX "Character_spellLevel7Id_key" ON "Character"("spellLevel7Id");

-- CreateIndex
CREATE UNIQUE INDEX "Character_spellLevel8Id_key" ON "Character"("spellLevel8Id");

-- CreateIndex
CREATE UNIQUE INDEX "Character_spellLevel9Id_key" ON "Character"("spellLevel9Id");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel0Id_fkey" FOREIGN KEY ("spellLevel0Id") REFERENCES "SpellLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel1Id_fkey" FOREIGN KEY ("spellLevel1Id") REFERENCES "SpellLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel2Id_fkey" FOREIGN KEY ("spellLevel2Id") REFERENCES "SpellLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel3Id_fkey" FOREIGN KEY ("spellLevel3Id") REFERENCES "SpellLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel4Id_fkey" FOREIGN KEY ("spellLevel4Id") REFERENCES "SpellLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel5Id_fkey" FOREIGN KEY ("spellLevel5Id") REFERENCES "SpellLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel6Id_fkey" FOREIGN KEY ("spellLevel6Id") REFERENCES "SpellLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel7Id_fkey" FOREIGN KEY ("spellLevel7Id") REFERENCES "SpellLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel8Id_fkey" FOREIGN KEY ("spellLevel8Id") REFERENCES "SpellLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel9Id_fkey" FOREIGN KEY ("spellLevel9Id") REFERENCES "SpellLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
