import { StatusCodes } from 'http-status-codes';
import { boardService } from '~/services';

const createNew = async (req, res, next) => {
  try {
    const createBoard = await boardService.createNew(req.body);
    res.actionResponse('create', createBoard, null, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

const getOneBoardById = async (req, res, next) => {
  try {
    const board = await boardService.getOneBoardById(req.params.boardId);
    if (!board) {
      throw new Error('Board not found');
    }
    res.actionResponse('get', board, null, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getListBoards = async (req, res, next) => {
  try {
    const boards = await boardService.getListBoards();
    res.actionResponse('get', boards, null, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
  getOneBoardById,
  getListBoards
};
