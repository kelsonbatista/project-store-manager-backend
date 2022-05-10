const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const validateProduct = (req, _res, next) => {
  const productSchema = Joi.object({
    name: Joi.string().required().min(5),
    quantity: Joi.number().integer().required().min(1),
  });

  const { name, quantity } = req.body;
  const { error } = productSchema.validate({ name, quantity });
  let type = '';
  if (error) type = error.details[0].type;
  let status = '';
  const types = ['string.min', 'string.max', 'string.base',
    'number.min', 'number.max', 'number.base'];
  const resultType = types.some((item) => item === type);
  if (resultType) status = StatusCodes.UNPROCESSABLE_ENTITY;
  if (type === 'any.required') status = StatusCodes.BAD_REQUEST;
  if (error) next({ status, message: error.message });
  next();
};

module.exports = validateProduct;
