import express from 'express';
import resizerMiddleware from '../../utilities/resizerMiddleware';

const images = express.Router();

images.use(resizerMiddleware);

images.get('/', () => console.log('All good!'));

export default images;
