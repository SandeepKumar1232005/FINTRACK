import mongoose, { Schema, Document } from 'mongoose';

export type PaymentMethod = 'Cash' | 'Bank' | 'UPI';

export interface IPayment extends Document {
    loanId: mongoose.Types.ObjectId;
    paymentDate: Date;
    amountPaid: number;
    paymentMethod: PaymentMethod;
    remainingBalance: number; // Balance at the time of payment
    interestApplied?: number;
    lateFee?: number;
}

const paymentSchema: Schema = new Schema(
    {
        loanId: { type: Schema.Types.ObjectId, ref: 'Loan', required: true },
        paymentDate: { type: Date, required: true, default: Date.now },
        amountPaid: { type: Number, required: true },
        paymentMethod: { type: String, enum: ['Cash', 'Bank', 'UPI'], required: true },
        remainingBalance: { type: Number, required: true },
        interestApplied: { type: Number, default: 0 },
        lateFee: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<IPayment>('Payment', paymentSchema);
