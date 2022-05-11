import express from 'express';
import resizer from '../../utilities/resizerMiddleware';

const images = express.Router();

images.use(resizer);

images.get('/', (req, res) => {});

export default images;
