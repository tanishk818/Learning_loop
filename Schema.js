const Joi = require('joi');

module.exports.userSchema = Joi.object({
        name: Joi.string().min(1).required(),
        username: Joi.string().min(1).required(),
        password: Joi.string().min(6).required()

});


module.exports.LoginSchema = Joi.object({
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()

});
