import express from 'express';
import { authAdmin, registerAdmin } from '../controllers/authController';

const router = express.Router();

router.post('/login', authAdmin);
// In a real scenario, register might be locked down or a one-time script. For this internal system, we'll expose it for initial setup.
router.post('/register', registerAdmin);

export default router;
