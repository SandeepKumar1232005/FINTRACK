import express from 'express';
import { getDashboardMetrics } from '../controllers/analyticsController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/dashboard').get(protect, getDashboardMetrics);

export default router;
