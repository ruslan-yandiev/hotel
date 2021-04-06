import { Router } from 'express';
const router = Router();

import { getAll } from '../controllers/room_page.js';

router.get('/room', getAll);

export default router;
