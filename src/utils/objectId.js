import { ObjectId } from 'mongodb';

const convertStringToObjectId = (id) => {
  if (id && ObjectId.isValid(id)) {
    return new ObjectId(id);
  }
  throw new Error('Invalid ObjectId');
};

export default convertStringToObjectId;
