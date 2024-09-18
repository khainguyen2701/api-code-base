import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { ApiError, boardType, convertErrors } from '~/utils';

const createNew = async (req, res, next) => {
  const schema = Joi.object({
    type: Joi.string().valid(boardType.private, boardType.public).required(),
    title: Joi.string().required().min(3).max(30).trim().strict().messages({
      'any.required': 'Title is required!',
      'string.trim': 'Title is not allowed to be empty!',
      'string.max': 'Title min 3 characters!',
      'string.min': 'Title max 30 characters!'
    }),
    description: Joi.string()
      .required()
      .min(3)
      .max(300)
      .trim()
      .strict()
      .messages({
        'any.required': 'Description is required!',
        'string.trim': 'Description is not allowed to be empty!',
        'string.max': 'Description min 3 characters!',
        'string.min': 'Description max 300 characters!'
      })
  });
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false
    });
    next();
  } catch (error) {
    // next(error);
    const errors = convertErrors(error?.details ?? []);
    const errorMessage = new Error(error).message;
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage,
      errors
    );
    next(customError);
  }
};

const getOneBoardById = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required().messages({
      'any.required': 'Id is required!',
      'string.base': 'Id must be a string!'
    })
  });
  try {
    await schema.validateAsync(req.params, {
      abortEarly: false
    });
    next();
  } catch (error) {
    const errorMessage = new Error(error).message;
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage,
      []
    );
    next(customError);
  }
};

export const boardValidation = {
  createNew,
  getOneBoardById
};
