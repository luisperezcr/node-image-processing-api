import express from 'express';
import sharp from 'sharp';
import { isInCache, saveToCache } from './cache';

const resizerMiddleware = async(req: express.Request, res: express.Response, next: Function) => {
  const filename = req.query.filename || null;
  const newWidth = req.query.width || 0;
  const newHeight = req.query.height || 0;

  try {
    if (filename && newWidth && newHeight) {
      const pathToFull = 'images/full';
      const pathToThumb = 'images/thumb';
      const fullImage = `${filename}.jpg`;
      const thumbImage = `${filename}_thumb_${newWidth}x${newHeight}.jpg`;

      const isCached = await isInCache(thumbImage);
      if (isCached) {
        res.sendFile(`${pathToThumb}/${thumbImage}`, { root: './' });
      } else {
        await sharp(`${pathToFull}/${fullImage}`)
          .resize(+newWidth, +newHeight)
          .toFile(`${pathToThumb}/${thumbImage}`);
        
        await saveToCache(thumbImage);
        res.sendFile(`${pathToThumb}/${thumbImage}`, { root: './' });
      }
    }
  } catch (error) {
      res.status(404).send(`Sorry, we couldn't find an image with that name.`);
  }

  next();
};

export default resizerMiddleware;