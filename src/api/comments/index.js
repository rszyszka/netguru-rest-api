import {Router} from 'express';
import {create, index} from "./controller";

const router = new Router();

router.get('/', index);
router.post('/', create);

export default router;