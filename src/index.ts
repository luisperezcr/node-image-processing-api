import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

// Apply routes to the express app
app.use('/api', routes, (req, res) => res.sendStatus(200));

/**
 * Start server
 */
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
