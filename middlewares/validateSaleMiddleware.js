const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const productSchema = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().required().min(1),
});
const validateSale = (req, _res, next) => {
  const { productId, quantity } = req.body;
  const { error } = productSchema.validate({ productId, quantity });
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

const validateSaleProduct = (req, _res, next) => {
  // const [{ productId, quantity }] = req.body;
  (req.body).map(({ productId, quantity }) => {
    const { error } = productSchema.validate({ productId, quantity });
    let type = '';
    if (error) type = error.details[0].type;
    let status = '';
    const types = ['string.min', 'string.max', 'string.base',
      'number.min', 'number.max', 'number.base'];
    const resultType = types.some((item) => item === type);
    if (resultType) status = StatusCodes.UNPROCESSABLE_ENTITY;
    if (type === 'any.required') status = StatusCodes.BAD_REQUEST;
    if (error) return next({ status, message: error.message });
    return true;
  });
  next();
};

module.exports = {
  validateSale,
  validateSaleProduct,
};
