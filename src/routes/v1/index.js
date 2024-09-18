import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRoutes } from './boardRoutes';

const router = express.Router();

router.get('/status', async (req, res) => {
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Server is running!'
  });
});

router.use('/boards', boardRoutes);

export const APIs_v1 = router;
