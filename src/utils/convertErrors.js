const convertErrors = (error) => {
  const errorMessages = {};

  if (error)
    error?.forEach((detail) => {
      const key = detail.context.key;
      const message = detail.message;

      if (errorMessages[key]) {
        errorMessages[key].push(message);
      } else {
        errorMessages[key] = [message];
      }
    });
  return errorMessages;
};

export default convertErrors;
