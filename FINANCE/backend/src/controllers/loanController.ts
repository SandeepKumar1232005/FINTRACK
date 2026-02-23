import { Request, Response } from 'express';
import Loan from '../models/Loan';
import Customer from '../models/Customer';

export const createLoan = async (req: Request, res: Response) => {
    try {
        const {
            customerId,
            loanAmount,
            interestRate,
            interestType,
            startDate,
            tenureMonths,
        } = req.body;

        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        let emiAmount = 0;
        let totalPayableAmount = 0;

        if (interestType === 'Flat') {
            const totalInterest = (loanAmount * interestRate * (tenureMonths / 12)) / 100;
            totalPayableAmount = loanAmount + totalInterest;
            emiAmount = totalPayableAmount / tenureMonths;
        } else if (interestType === 'Reducing') {
            const monthlyRate = interestRate / (12 * 100);
            emiAmount =
                (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);
            totalPayableAmount = emiAmount * tenureMonths;
        }

        const loan = await Loan.create({
            customerId,
            loanAmount,
            interestRate,
            interestType,
            startDate,
            tenureMonths,
            emiAmount,
            totalPayableAmount,
            outstandingBalance: totalPayableAmount,
            status: 'Active',
        });

        res.status(201).json(loan);
    } catch (error) {
        res.status(400).json({ message: 'Invalid loan data', error });
    }
};

export const getLoans = async (req: Request, res: Response) => {
    try {
        const loans = await Loan.find().populate('customerId', 'fullName mobileNumber');
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const getLoanById = async (req: Request, res: Response) => {
    try {
        const loan = await Loan.findById(req.params.id).populate('customerId', 'fullName mobileNumber address');
        if (loan) {
            res.json(loan);
        } else {
            res.status(404).json({ message: 'Loan not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const updateLoanStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const loan = await Loan.findById(req.params.id);

        if (loan) {
            loan.status = status;
            const updatedLoan = await loan.save();
            res.json(updatedLoan);
        } else {
            res.status(404).json({ message: 'Loan not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid update data', error });
    }
};
