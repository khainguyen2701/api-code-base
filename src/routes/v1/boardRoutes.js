import express from 'express';
import { boardController } from '~/controllers';
import { boardValidation } from '~/validations';

const router = express.Router();

// Router cho boards
router
  .route('/')
  .get(boardController.getListBoards)
  .post(boardValidation.createNew, boardController.createNew);

router.route('/:boardId').get(boardController.getOneBoardById);

export const boardRoutes = router;
