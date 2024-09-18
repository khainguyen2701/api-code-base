class ApiError extends Error {
  constructor(statusCode, message, errors) {
    super(message, errors);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;

    // Ghi lại Stack Trace (dấu vết ngăn xếp) để thuận tiện cho việc debug
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
