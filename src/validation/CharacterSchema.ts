import Joi from 'joi';
 
export const characterSchema = Joi.object({
    name: Joi.string()
        .required(),
    charClass: Joi.string()
        .required(),
    level: Joi.number()
        .min(1)
        .max(20)
        .required(),
    background: Joi.string()
        .required(),
    race: Joi.string()
        .required(),
    attributes: Joi.object({
        strengthValue: Joi.number().min(1).max(30).required(),
        strengthMod: Joi.number().min(-5).required(),
        dexterityValue: Joi.number().min(1).max(30).required(),
        dexterityMod: Joi.number().min(-5).required(),
        constitutionValue: Joi.number().min(1).max(30).required(),
        constitutionMod: Joi.number().min(-5).required(),
        wisdomValue: Joi.number().min(1).max(30).required(),
        wisdomMod: Joi.number().min(-5).required(),
        intelligenceValue: Joi.number().min(1).max(30).required(),
        intelligenceMod: Joi.number().min(-5).required(),
        charismaValue: Joi.number().min(1).max(30).required(),
        charismaMod: Joi.number().min(-5).required(),
    }),
    savingThrows: Joi.object({
        strengthMod: Joi.number().min(-5).required(),
        dexterityMod: Joi.number().min(-5).required(),
        constitutionMod: Joi.number().min(-5).required(),
        wisdomMod: Joi.number().min(-5).required(),
        intelligenceMod: Joi.number().min(-5).required(),
        charismaMod: Joi.number().min(-5).required(),
    }),
    abilityCheck: Joi.object({
        acrobatics: Joi.number().min(-5).required(),
        animalHandling: Joi.number().min(-5).required(),
        arcana: Joi.number().min(-5).required(),
        athletics: Joi.number().min(-5).required(),
        deception: Joi.number().min(-5).required(),
        history : Joi.number().min(-5).required(),
        insight: Joi.number().min(-5).required(),
        intidimation: Joi.number().min(-5).required(),
        investigation: Joi.number().min(-5).required(),
        medicine: Joi.number().min(-5).required(),
        nature: Joi.number().min(-5).required(),
        perception : Joi.number().min(-5).required(),
        perfomance: Joi.number().min(-5).required(),
        persuasion: Joi.number().min(-5).required(),
        religion: Joi.number().min(-5).required(),
        sleightOfHand: Joi.number().min(-5).required(),
        stealth: Joi.number().min(-5).required(),
        survival : Joi.number().min(-5).required(),
    }),
    armorClass: Joi.number()
        .min(5)
        .required(),
    initiative: Joi.number()
        .min(-5)
        .required(),
    failCounter: Joi.number()
        .min(0)
        .max(3)
        .required(),
    successCounter: Joi.number()
        .min(0)
        .max(3)
        .required(),
    speed: Joi.number()
        .required(),
    hitPoints: Joi.number()
    .min(0)
    .required(),
    weapons: Joi.array().items(
        Joi.object({
            name: Joi.string(),
            attackBonus: Joi.number(),
            damageDie: Joi.string()
        })
    ),
    inventory: Joi.array().items(
        Joi.object({
            name: Joi.string(),
            quantity: Joi.number().min(1),
            description: Joi.string(),
        })
    ),
    spellCasting: Joi.array().items(
        Joi.object({
            name: Joi.string(),
            effect: Joi.string()
        })
    ),
    history: Joi.string(),
    notes: Joi.string(),
})

export const characterSchemaPatch = Joi.object({
    name: Joi.string(),
    charClass: Joi.string(),
    level: Joi.number()
        .min(1)
        .max(20),
    background: Joi.string(),
    race: Joi.string(),
    attributes: Joi.object({
        strengthValue: Joi.number().min(1).max(30),
        strengthMod: Joi.number().min(-5),
        dexterityValue: Joi.number().min(1).max(30),
        dexterityMod: Joi.number().min(-5),
        constitutionValue: Joi.number().min(1).max(30),
        constitutionMod: Joi.number().min(-5),
        wisdomValue: Joi.number().min(1).max(30),
        wisdomMod: Joi.number().min(-5),
        intelligenceValue: Joi.number().min(1).max(30),
        intelligenceMod: Joi.number().min(-5),
        charismaValue: Joi.number().min(1).max(30),
        charismaMod: Joi.number().min(-5),
    }),
    savingThrow: Joi.object({
        strenghMod: Joi.number().min(-5),
        dexterityMod: Joi.number().min(-5),
        constitutionMod: Joi.number().min(-5),
        wisdomMod: Joi.number().min(-5),
        intelligenceMod: Joi.number().min(-5),
        charismaMod: Joi.number().min(-5),
    }),
    abilityCheck: Joi.object({
        acrobatics: Joi.number().min(-5),
        animalHandling: Joi.number().min(-5),
        arcana: Joi.number().min(-5),
        athletics: Joi.number().min(-5),
        deception: Joi.number().min(-5),
        history : Joi.number().min(-5),
        insight: Joi.number().min(-5),
        intidimation: Joi.number().min(-5),
        investigation: Joi.number().min(-5),
        medicine: Joi.number().min(-5),
        nature: Joi.number().min(-5),
        perception : Joi.number().min(-5),
        perfomance: Joi.number().min(-5),
        persuasion: Joi.number().min(-5),
        religion: Joi.number().min(-5),
        sleightOfHand: Joi.number().min(-5),
        stealth: Joi.number().min(-5),
        survival : Joi.number().min(-5),
    }),
    armorClass: Joi.number()
        .min(5),
    initiative: Joi.number()
        .min(-5),
    failCounter: Joi.number()
        .min(0)
        .max(3),
    successCounter: Joi.number()
        .min(0)
        .max(3),
    speed: Joi.string(),
    HitPoint: Joi.number()
        .min(0),
    weapons: Joi.array().items(
        Joi.object({
            name: Joi.string(),
            attackBonus: Joi.number(),
            damageDie: Joi.string()
        })
    ),
    inventory: Joi.array().items(
        Joi.object({
            name: Joi.string(),
            quantity: Joi.number().min(1),
            description: Joi.string(),
        })
    ),
    spellCasting: Joi.array().items(
        Joi.object({
            name: Joi.string(),
            effect: Joi.string()
        })
    ),
    history: Joi.string(),
    notes: Joi.string(),
})
 
module.exports = {
    characterSchema, characterSchemaPatch
}