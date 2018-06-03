import { Router } from 'express';
import movie from './movies';
import comments from './comments';

const router = new Router();

router.use('/movies',movie);
router.use('/comments', comments);

export default router;