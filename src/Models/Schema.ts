
import Joi from "joi";

export const PostSchema = Joi
  .object({
    
    author: Joi.string(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    published: Joi.boolean(),
  })


  export const UserSchema = Joi
  .object({
    
    username: Joi.string().min(3)
    .max(30),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().min(7),
    repeat_password: Joi.ref('password'),
    
  })
