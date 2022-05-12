import express from 'express';
import resizerMiddleware from '../../utilities/resizerMiddleware';

const images = express.Router();

images.use(resizerMiddleware);

images.get('/');

export default images;
