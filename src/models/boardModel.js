import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { getDatabase } from '~/config/mongodb';
import {
  ApiError,
  boardType,
  convertStringToObjectId,
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE
} from '~/utils';
import { cardModel } from './cardModel';
import { columnModel } from './columnModel';

const BOARD_COLLECTION_NAME = 'boards';
const boardCollectionSchema = Joi.object({
  type: Joi.string().valid(boardType.private, boardType.public).required(),
  title: Joi.string().required().min(3).max(30).trim().strict(),
  description: Joi.string().required().min(3).max(300).trim().strict(),
  slug: Joi.string().required().min(3).max(30).strict(),
  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now()),
  _destroy: Joi.boolean().default(false) // giá trị xác định bản ghi có được xoá chưa
});

const validateBeforeCreate = async (data) => {
  return await boardCollectionSchema.validateAsync(data, {
    abortEarly: true
  });
};

const createNew = async (data) => {
  try {
    const validate = await validateBeforeCreate(data);
    const createBoard = await getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .insertOne(validate);

    return createBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const findOneById = await getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({
        _id: id
      });
    if (!findOneById) {
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'No data valid', []);
    }
    return findOneById;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetailBoard = async (id) => {
  try {
    // aggregate dạng query tổng hợp. lookup => tìm các data ở các bảng khác
    // localField: tương tự khoá chính, foreignField: tương tự khoá ngoại của các bảng, as: trả về data với tên field tương ứng
    // match: dùng để làm điều kiện truy vấn lên db
    const findOneById = await getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: id,
            _destroy: false
          }
        },
        {
          $lookup: {
            from: columnModel.COLUMN_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns'
          }
        },
        {
          $lookup: {
            from: cardModel.CARD_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards'
          }
        }
      ])
      .toArray();

    return findOneById[0] || null;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllBoards = async () => {
  try {
    const boards = await getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .find()
      .toArray();
    return boards || [];
  } catch (error) {
    throw new Error(error);
  }
};

const pushColumnIds = async (column) => {
  try {
    const data = await getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: convertStringToObjectId(column.boardId)
        },
        {
          $push: {
            columnOrderIds: convertStringToObjectId(column._id)
          }
        },
        { returnDocument: 'after' }
      );

    return data.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const boardModel = {
  boardCollectionSchema,
  BOARD_COLLECTION_NAME,
  createNew,
  findOneById,
  getAllBoards,
  getDetailBoard,
  pushColumnIds
};
