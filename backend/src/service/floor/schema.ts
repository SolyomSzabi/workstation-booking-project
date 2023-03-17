import Joi from 'joi';

export const floorSchema = Joi.object().keys({
  building: Joi.number().required(),
  capacity: Joi.number().required(),
  floorName: Joi.string().required(),
});
