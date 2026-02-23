import { Request, Response } from 'express';
import Payment from '../models/Payment';
import Loan from '../models/Loan';

export const createPayment = async (req: Request, res: Response) => {
    try {
        const { loanId, paymentDate, amountPaid, paymentMethod, interestApplied, lateFee } = req.body;

        const loan = await Loan.findById(loanId);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        // New remaining balance (simplistic calculation)
        const newRemainingBalance = loan.outstandingBalance - amountPaid + (lateFee || 0);

        const payment = await Payment.create({
            loanId,
            paymentDate: paymentDate || Date.now(),
            amountPaid,
            paymentMethod,
            remainingBalance: newRemainingBalance,
            interestApplied: interestApplied || 0,
            lateFee: lateFee || 0,
        });

        loan.outstandingBalance = newRemainingBalance;
        if (newRemainingBalance <= 0) {
            loan.status = 'Closed';
        }

        await loan.save();

        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: 'Invalid payment data', error });
    }
};

export const getPaymentsByLoan = async (req: Request, res: Response) => {
    try {
        const payments = await Payment.find({ loanId: req.params.loanId }).sort({ paymentDate: -1 });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching payments', error });
    }
};

export const getAllPayments = async (req: Request, res: Response) => {
    try {
        const payments = await Payment.find().populate('loanId').sort({ paymentDate: -1 });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching all payments', error });
    }
};
