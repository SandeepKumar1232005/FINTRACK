import express from 'express';
import {
    createLoan,
    getLoans,
    getLoanById,
    updateLoanStatus,
} from '../controllers/loanController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
    .post(protect, createLoan)
    .get(protect, getLoans);

router.route('/:id')
    .get(protect, getLoanById);

router.route('/:id/status')
    .put(protect, updateLoanStatus);

export default router;
