-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_abilityCheckId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_savingThrowId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_spellLevel0Id_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_spellLevel1Id_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_spellLevel2Id_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_spellLevel3Id_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_spellLevel4Id_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_spellLevel5Id_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_spellLevel6Id_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_spellLevel7Id_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_spellLevel8Id_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_spellLevel9Id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_characterId_fkey";

-- DropForeignKey
ALTER TABLE "Spell" DROP CONSTRAINT "Spell_spellLevelId_fkey";

-- DropForeignKey
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_characterId_fkey";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spell" ADD CONSTRAINT "Spell_spellLevelId_fkey" FOREIGN KEY ("spellLevelId") REFERENCES "SpellLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_savingThrowId_fkey" FOREIGN KEY ("savingThrowId") REFERENCES "SavingThrows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_abilityCheckId_fkey" FOREIGN KEY ("abilityCheckId") REFERENCES "AbilityCheck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel0Id_fkey" FOREIGN KEY ("spellLevel0Id") REFERENCES "SpellLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel1Id_fkey" FOREIGN KEY ("spellLevel1Id") REFERENCES "SpellLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel2Id_fkey" FOREIGN KEY ("spellLevel2Id") REFERENCES "SpellLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel3Id_fkey" FOREIGN KEY ("spellLevel3Id") REFERENCES "SpellLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel4Id_fkey" FOREIGN KEY ("spellLevel4Id") REFERENCES "SpellLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel5Id_fkey" FOREIGN KEY ("spellLevel5Id") REFERENCES "SpellLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel6Id_fkey" FOREIGN KEY ("spellLevel6Id") REFERENCES "SpellLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel7Id_fkey" FOREIGN KEY ("spellLevel7Id") REFERENCES "SpellLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel8Id_fkey" FOREIGN KEY ("spellLevel8Id") REFERENCES "SpellLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_spellLevel9Id_fkey" FOREIGN KEY ("spellLevel9Id") REFERENCES "SpellLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
