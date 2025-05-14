import Joi from 'joi';

export const idParam = Joi.number()
  .integer()
  .positive()
  .required()
  .description('Unique identifier for the item');

export const createItemSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(255)
    .required()
    .description('Name of the item'),
  price: Joi.number()
    .required()
    .positive()
    .messages({
      'any.required': 'Field "price" is required',
      'number.base': 'Field "price" is required',
      'number.positive': 'Field "price" cannot be negative'
    })
    .description('Price of the item')
})
  .label('CreateItem')
  .description('Payload to create a new item')
  .meta({ className: 'CreateItem', tags: ['Item'] });

export const updateItemSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(255)
    .description('Name of the item'),
  price: Joi.number()
    .positive()
    .messages({
      'number.positive': 'Field "price" cannot be negative'
    })
    .description('Price of the item')
})
  .label('UpdateItem')
  .description('Payload to update an existing item')
  .meta({ className: 'UpdateItem', tags: ['Item'] });