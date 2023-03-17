import Joi from 'joi';

export const buildingsSchema = Joi.object().keys({
  name: Joi.string().required(),
  country: Joi.string().required(),
  postal_code: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
});
