import express from 'express';
import { getUserByUid} from '../controllers/userController.js';

const router = express.Router();

router.get('/:uid', getUserByUid);

export default router;