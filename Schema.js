const Joi = require('joi');

module.exports.userSchema = Joi.object({
        
            username: Joi.string() .min(1) .required(),
            email: Joi.string() .min(6) .required() .email(),
            password: Joi.string() .min(6) .required()
        
    });
    

module.exports.LoginSchema = Joi.object({
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required()
    
});
