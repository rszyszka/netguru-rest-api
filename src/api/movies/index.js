import { Router } from 'express';
import {fetchMovie, index} from "./controller";

const router = new Router();
router.post('/',fetchMovie);
router.get('/',index);

export default router;