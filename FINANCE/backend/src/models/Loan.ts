import mongoose, { Schema, Document } from 'mongoose';

export type InterestType = 'Flat' | 'Reducing';
export type LoanStatus = 'Active' | 'Closed' | 'Overdue';

export interface ILoan extends Document {
    customerId: mongoose.Types.ObjectId;
    loanAmount: number;
    interestRate: number; // monthly or annual depending on convention, let's assume annual %
    interestType: InterestType;
    startDate: Date;
    tenureMonths: number;
    emiAmount: number;
    totalPayableAmount: number;
    outstandingBalance: number;
    status: LoanStatus;
}

const loanSchema: Schema = new Schema(
    {
        customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
        loanAmount: { type: Number, required: true },
        interestRate: { type: Number, required: true },
        interestType: { type: String, enum: ['Flat', 'Reducing'], required: true },
        startDate: { type: Date, required: true },
        tenureMonths: { type: Number, required: true },
        emiAmount: { type: Number, required: true },
        totalPayableAmount: { type: Number, required: true },
        outstandingBalance: { type: Number, required: true },
        status: { type: String, enum: ['Active', 'Closed', 'Overdue'], default: 'Active' },
    },
    { timestamps: true }
);

export default mongoose.model<ILoan>('Loan', loanSchema);
