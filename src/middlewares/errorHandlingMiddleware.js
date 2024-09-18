/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { env } from '~/config/environment';

// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  const responseError = {
    status: 'error',
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack,
    errors: err.errors || []
  };

  if (env.build_mode !== 'dev') delete responseError.stack;

  res.status(responseError.statusCode).json(responseError);
};
export default errorHandlingMiddleware;
