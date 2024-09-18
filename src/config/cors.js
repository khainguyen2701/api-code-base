import { StatusCodes } from 'http-status-codes';
import { ApiError, whiteList } from '~/utils';
import { env } from './environment';

// Cấu hình CORS Option trong dự án thực tế
export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin && env.build_mode === 'dev') {
      return callback(null, true);
    }

    if (whiteList.includes(origin)) {
      return callback(null, true);
    }

    return callback(
      new ApiError(
        StatusCodes.FORBIDDEN,
        `${origin} not allowed by our CORS Policy.`,
        []
      )
    );
  },

  optionsSuccessStatus: 200,

  // CORS sẽ cho phép nhận cookies từ request
  credentials: true
};
