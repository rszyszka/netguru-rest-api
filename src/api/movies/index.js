import { Router } from 'express';
import {fetchMovie, index, searchByYear} from "./controller";

const router = new Router();
router.post('/',fetchMovie);
router.get('/',index);
router.get('/:minYear/:maxYear', searchByYear);

export default router;