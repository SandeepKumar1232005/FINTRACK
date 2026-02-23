import { Request, Response } from 'express';
import Customer from '../models/Customer';
import Loan from '../models/Loan';
import Payment from '../models/Payment';

export const getDashboardMetrics = async (req: Request, res: Response) => {
    try {
        const totalCustomers = await Customer.countDocuments();
        const activeLoans = await Loan.countDocuments({ status: 'Active' });
        const overdueLoans = await Loan.countDocuments({ status: 'Overdue' });

        const loans = await Loan.find();
        let totalAmountDisbursed = 0;
        let totalOutstandingAmount = 0;

        loans.forEach((loan) => {
            totalAmountDisbursed += loan.loanAmount;
            totalOutstandingAmount += loan.outstandingBalance;
        });

        const payments = await Payment.find();
        let totalRepaymentsReceived = 0;

        payments.forEach((payment) => {
            totalRepaymentsReceived += payment.amountPaid;
        });

        // Approximate interest earnings = (Total Disbursed + Total Expected Interest) - Remaining Outstanding? 
        // Simplified: we can just fetch totalPayableAmount - loanAmount to see expected interest over all loans.
        let expectedTotalInterestEarnings = 0;
        loans.forEach((loan) => {
            expectedTotalInterestEarnings += (loan.totalPayableAmount - loan.loanAmount);
        });

        res.json({
            totalCustomers,
            activeLoans,
            totalAmountDisbursed,
            totalRepaymentsReceived,
            totalOutstandingAmount,
            overdueLoans,
            expectedTotalInterestEarnings,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching metrics', error });
    }
};
