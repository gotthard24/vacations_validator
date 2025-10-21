import express from 'express';
import { getVacations, updateStatus, requestVacation} from '../controllers/vacationController.js';

const router = express.Router();

router.get('/', getVacations);
router.post('/:id/status', updateStatus);
router.post('/request', requestVacation);

export default router;
