import Joi from 'joi';

export const userSchema = Joi.object().keys({
  email: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string().required(),
});
