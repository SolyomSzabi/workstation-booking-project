import Joi from 'joi';

export const bookingsSchema = Joi.object().keys({
  user: Joi.number().required(),
  date: Joi.date().required(),
  workstation: Joi.number().required(),
});
