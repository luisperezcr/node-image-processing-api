import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/');

routes.use('/images', images);

export default routes;
