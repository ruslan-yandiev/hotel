import { Router } from 'express';
const router = Router();

import { getAll, selectRooms } from '../controllers/rooms_page.js';

router.get('/rooms', getAll);
router.post('/rooms', selectRooms);

export default router;
