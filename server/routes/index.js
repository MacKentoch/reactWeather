import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res
    .status(200)
    .sendFile('./public/index.html');
  next();
});

export default router;
