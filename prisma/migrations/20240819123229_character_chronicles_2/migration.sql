/*
  Warnings:

  - You are about to drop the column `hitPoints` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `Spell` table. All the data in the column will be lost.
  - Added the required column `XP` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alignment` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hitPointsActual` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hitPointsMax` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lifeDie` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerName` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proficiencyBonus` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalLifeDie` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `casted` to the `Spell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spellLevelId` to the `Spell` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Spell" DROP CONSTRAINT "Spell_characterId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "hitPoints",
ADD COLUMN     "XP" INTEGER NOT NULL,
ADD COLUMN     "alignment" TEXT NOT NULL,
ADD COLUMN     "bonds" TEXT,
ADD COLUMN     "conjurerAttribute" TEXT,
ADD COLUMN     "conjurerClass" TEXT,
ADD COLUMN     "hitPointsActual" INTEGER NOT NULL,
ADD COLUMN     "hitPointsMax" INTEGER NOT NULL,
ADD COLUMN     "ideals" TEXT,
ADD COLUMN     "inspiration" BOOLEAN DEFAULT false,
ADD COLUMN     "lifeDie" TEXT NOT NULL,
ADD COLUMN     "personalityTrait" TEXT,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "playerName" TEXT NOT NULL,
ADD COLUMN     "proficiency" TEXT,
ADD COLUMN     "proficiencyBonus" INTEGER NOT NULL,
ADD COLUMN     "spellAttackModifier" INTEGER,
ADD COLUMN     "spellCD" INTEGER,
ADD COLUMN     "talents" TEXT,
ADD COLUMN     "temporaryHitPoints" INTEGER,
ADD COLUMN     "totalLifeDie" TEXT NOT NULL,
ADD COLUMN     "weakness" TEXT;

-- AlterTable
ALTER TABLE "Spell" DROP COLUMN "characterId",
ADD COLUMN     "casted" BOOLEAN NOT NULL,
ADD COLUMN     "spellLevelId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SpellLevel" (
    "id" SERIAL NOT NULL,
    "totalSpells" INTEGER NOT NULL,
    "usedSpells" INTEGER,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "SpellLevel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Spell" ADD CONSTRAINT "Spell_spellLevelId_fkey" FOREIGN KEY ("spellLevelId") REFERENCES "SpellLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellLevel" ADD CONSTRAINT "SpellLevel_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
