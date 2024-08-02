/*
  Warnings:

  - Added the required column `characterId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "characterId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Weapon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "attackBonus" TEXT NOT NULL,
    "damageDie" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavingThrows" (
    "id" SERIAL NOT NULL,
    "strengthMod" INTEGER NOT NULL,
    "dexterityMod" INTEGER NOT NULL,
    "constituitionMod" INTEGER NOT NULL,
    "wisdomMod" INTEGER NOT NULL,
    "intelligenceMod" INTEGER NOT NULL,
    "charismaMod" INTEGER NOT NULL,

    CONSTRAINT "SavingThrows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AbilityCheck" (
    "id" SERIAL NOT NULL,
    "acrobatics" INTEGER NOT NULL,
    "animalHandling" INTEGER NOT NULL,
    "arcana" INTEGER NOT NULL,
    "athletics" INTEGER NOT NULL,
    "deception" INTEGER NOT NULL,
    "history" INTEGER NOT NULL,
    "insight" INTEGER NOT NULL,
    "intidimation" INTEGER NOT NULL,
    "investigation" INTEGER NOT NULL,
    "medicine" INTEGER NOT NULL,
    "nature" INTEGER NOT NULL,
    "perception" INTEGER NOT NULL,
    "perfomance" INTEGER NOT NULL,
    "persuasion" INTEGER NOT NULL,
    "religion" INTEGER NOT NULL,
    "sleightOfHand" INTEGER NOT NULL,
    "stealth" INTEGER NOT NULL,
    "survival" INTEGER NOT NULL,

    CONSTRAINT "AbilityCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attributes" (
    "id" SERIAL NOT NULL,
    "strengthValue" INTEGER NOT NULL,
    "strenghMod" INTEGER NOT NULL,
    "dexterityValue" INTEGER NOT NULL,
    "dexterityMod" INTEGER NOT NULL,
    "constitutionValue" INTEGER NOT NULL,
    "constitutionMod" INTEGER NOT NULL,
    "wisdomValue" INTEGER NOT NULL,
    "wisdomMod" INTEGER NOT NULL,
    "intelligenceValue" INTEGER NOT NULL,
    "intelligenceMod" INTEGER NOT NULL,
    "charismaValue" INTEGER NOT NULL,
    "charismaMod" INTEGER NOT NULL,
    "savingThrowId" INTEGER NOT NULL,
    "abilityCheckId" INTEGER NOT NULL,

    CONSTRAINT "Attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "background" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "attributeId" INTEGER NOT NULL,
    "armorClass" INTEGER NOT NULL,
    "initiative" INTEGER NOT NULL,
    "failCounter" INTEGER NOT NULL,
    "successCounter" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "hitPoints" INTEGER NOT NULL,
    "history" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attributes_savingThrowId_key" ON "Attributes"("savingThrowId");

-- CreateIndex
CREATE UNIQUE INDEX "Attributes_abilityCheckId_key" ON "Attributes"("abilityCheckId");

-- CreateIndex
CREATE UNIQUE INDEX "Character_attributeId_key" ON "Character"("attributeId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spell" ADD CONSTRAINT "Spell_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attributes" ADD CONSTRAINT "Attributes_savingThrowId_fkey" FOREIGN KEY ("savingThrowId") REFERENCES "SavingThrows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attributes" ADD CONSTRAINT "Attributes_abilityCheckId_fkey" FOREIGN KEY ("abilityCheckId") REFERENCES "AbilityCheck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
