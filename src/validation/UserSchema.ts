import Joi from 'joi';
 
export const userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
    .email()
    .required(), 

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
})

export const userSchemaPatch = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    email: Joi.string()
    .email(), 

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),
})
module.exports = {
    userSchema,
    userSchemaPatch
}