import express from 'express';
import resize from './resizer';

const resizerMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const filename = req.query.filename || null;
  const newWidth = req.query.width || 0;
  const newHeight = req.query.height || 0;

  try {
    if (filename && newWidth && newHeight) {
      // If all parameters provided, perform resize
      const result = await resize(filename, +newWidth, +newHeight);
      res.sendFile(result, { root: './' });
    }
  } catch (error) {
    res.status(404).send(`Sorry, we couldn't find an image with that name.`);
  }

  next();
};

export default resizerMiddleware;
