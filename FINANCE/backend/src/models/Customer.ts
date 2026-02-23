import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
    fullName: string;
    mobileNumber: string;
    address: string;
    idProofReference?: string;
    notes?: string;
    dateAdded: Date;
}

const customerSchema: Schema = new Schema(
    {
        fullName: { type: String, required: true },
        mobileNumber: { type: String, required: true },
        address: { type: String, required: true },
        idProofReference: { type: String },
        notes: { type: String },
        dateAdded: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model<ICustomer>('Customer', customerSchema);
