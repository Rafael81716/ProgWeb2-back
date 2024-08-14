import Joi from 'joi';
 
const characterSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .required(),
    class: Joi.string()
        .alphanum()
        .required(),
    level: Joi.number()
        .min(1)
        .max(20)
        .required(),
    background: Joi.string()
        .alphanum()
        .required(),
    race: Joi.string()
        .alphanum()
        .required(),
    attributes: Joi.object({
        strengthValue: Joi.number().min(1).max(30).required(),
        strenghMod: Joi.number().min(-5).required(),
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
    savingThrow: Joi.object({
        strenghMod: Joi.number().min(-5).required(),
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
    speed: Joi.string()
        .alphanum()
        .required(),
    HitPoint: Joi.number()
    .min(0)
    .required(),
    weapons: Joi.array().items(
        Joi.object({
            name: Joi.string().alphanum(),
            attackBonus: Joi.number(),
            damageDie: Joi.string().alphanum()
        })
    ),
    inventory: Joi.array().items(
        Joi.object({
            name: Joi.string().alphanum(),
            quantity: Joi.number().min(1),
            description: Joi.string().alphanum(),
        })
    ),
    spellcasting: Joi.array().items(
        Joi.object({
            name: Joi.string().alphanum(),
            effect: Joi.string().alphanum()
        })
    ),
    history: Joi.string()
    .alphanum(),
    notes: Joi.string()
    .alphanum(),
})
 
module.exports = {
    characterSchema
}