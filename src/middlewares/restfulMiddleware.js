//Error dùng cho API
const actionResponseMiddleware = (req, res, next) => {
  res.actionResponse = (action, data, message, statusCode) => {
    const defaultMessages = {
      create: 'Created successfully',
      edit: 'Updated item successfully',
      delete: 'Deleted item successfully',
      gets: 'Get list items successfully',
      get: 'Get one item successfully'
    };

    const responseMessage = message || defaultMessages[action];

    res.status(statusCode).json({
      status: 'success',
      statusCode: statusCode,
      message: responseMessage,
      data: data || null
    });
  };
  next();
};

export default actionResponseMiddleware;
