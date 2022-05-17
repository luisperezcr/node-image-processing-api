import { Request, Response, NextFunction } from 'express';
import resize from './resizer';

const resizerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filename = req.query.filename;
  const newWidth = req.query.width;
  const newHeight = req.query.height;

  if (!filename) {
    return res.send(`An error has ocurred: Invalid filename, please enter a valid image name.`);
  } else if (!newWidth || isNaN(Number(newWidth))) {
    return res.send(`An error has ocurred: Invalid width, please enter a valid value for width.`);
  } else if (!newHeight || isNaN(Number(newHeight))) {
    return res.send(`An error has ocurred: Invalid height, please enter a valid value for height.`);
  }

  try {
    if (filename && newWidth && newHeight) {
      // If all parameters provided, perform resize
      const result = await resize(filename, +newWidth, +newHeight);
      res.status(200).sendFile(result, { root: './' });
    }
  } catch (error) {
    res.status(404).send(`Sorry, we couldn't find an image with that name.`);
  }

  next();
};

export default resizerMiddleware;
