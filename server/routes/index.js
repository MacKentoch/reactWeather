import express from 'express';
import path    from 'path';

const router = express.Router();

router.get('/', (req, res, next) => {
  res
    .sendFile(path.join(__dirname, './public', 'index.html'));
  next();
});

export default router;
