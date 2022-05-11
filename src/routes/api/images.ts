import express from 'express';
import resizer from '../../utilities/resizerMiddleware';

const images = express.Router();

images.use(resizer);

images.get('/');

export default images;
