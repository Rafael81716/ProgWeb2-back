import Joi from 'joi';
 
const userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
    .email()
    .required(), 

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),
})
 
module.exports = {
    userSchema
}