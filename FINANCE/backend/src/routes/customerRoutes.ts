import express from 'express';
import {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
} from '../controllers/customerController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
    .post(protect, createCustomer)
    .get(protect, getCustomers);

router.route('/:id')
    .get(protect, getCustomerById)
    .put(protect, updateCustomer)
    .delete(protect, deleteCustomer);

export default router;
