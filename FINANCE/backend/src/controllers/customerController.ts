import { Request, Response } from 'express';
import Customer from '../models/Customer';

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const { fullName, mobileNumber, address, idProofReference, notes } = req.body;

        const customer = await Customer.create({
            fullName,
            mobileNumber,
            address,
            idProofReference,
            notes,
        });

        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ message: 'Invalid customer data', error });
    }
};

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const keyword = req.query.keyword
            ? {
                $or: [
                    { fullName: { $regex: req.query.keyword, $options: 'i' } },
                    { mobileNumber: { $regex: req.query.keyword, $options: 'i' } },
                ],
            }
            : {};

        const customers = await Customer.find({ ...keyword }).sort({ createdAt: -1 });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching customers', error });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const { fullName, mobileNumber, address, idProofReference, notes } = req.body;

        const customer = await Customer.findById(req.params.id);

        if (customer) {
            customer.fullName = fullName || customer.fullName;
            customer.mobileNumber = mobileNumber || customer.mobileNumber;
            customer.address = address || customer.address;
            customer.idProofReference = idProofReference || customer.idProofReference;
            customer.notes = notes || customer.notes;

            const updatedCustomer = await customer.save();
            res.json(updatedCustomer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid customer data', error });
    }
};

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (customer) {
            await customer.deleteOne();
            res.json({ message: 'Customer removed' });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
