import Joi from 'joi';

export const workstationSchema = Joi.object().keys({
  floor: Joi.number().required(),
});
