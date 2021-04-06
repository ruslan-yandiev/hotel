import { Router } from 'express';
const router = Router();

import { getAll, selectRooms } from '../controllers/index_page.js';

router.get('/', getAll);
router.post('/', selectRooms);

export default router;
