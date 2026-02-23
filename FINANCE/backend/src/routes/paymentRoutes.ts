import express from 'express';
import {
    createPayment,
    getPaymentsByLoan,
    getAllPayments
} from '../controllers/paymentController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
    .post(protect, createPayment)
    .get(protect, getAllPayments);

router.route('/loan/:loanId')
    .get(protect, getPaymentsByLoan);

export default router;
