import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Plus, Search, CheckCircle } from 'lucide-react';

interface Loan {
    _id: string;
    customerId: { fullName: string };
    loanAmount: number;
    outstandingBalance: number;
}

interface Payment {
    _id: string;
    loanId: Loan;
    paymentDate: string;
    amountPaid: number;
    paymentMethod: string;
    remainingBalance: number;
}

const Payments = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loans, setLoans] = useState<Loan[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        loanId: '',
        amountPaid: 0,
        paymentMethod: 'Cash',
        paymentDate: new Date().toISOString().split('T')[0]
    });

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/payments');
            setPayments(data);
        } catch (error) {
            console.error('Error fetching payments', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchActiveLoans = async () => {
        try {
            const { data } = await api.get('/loans');
            const active = data.filter((l: any) => l.status !== 'Closed');
            setLoans(active);
            if (active.length > 0 && !formData.loanId) {
                setFormData(prev => ({ ...prev, loanId: active[0]._id, amountPaid: 0 }));
            }
        } catch (error) {
            console.error('Error fetching loans for payments', error);
        }
    };

    useEffect(() => {
        fetchPayments();
        fetchActiveLoans();
    }, []);

    const handleCreatePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/payments', formData);
            setShowModal(false);
            fetchPayments();
            // Reset form partially
            setFormData(prev => ({ ...prev, amountPaid: 0 }));
        } catch (error) {
            console.error('Error creating payment', error);
        }
    };

    const filteredPayments = payments.filter(p =>
        p.loanId?.customerId?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        p.paymentMethod.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Payments & Collections</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus size={20} />
                    <span>Record Payment</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by customer name or method..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading payments...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-sm border-b uppercase tracking-wider">
                                    <th className="p-4 font-semibold">Date</th>
                                    <th className="p-4 font-semibold">Customer (Loan ID)</th>
                                    <th className="p-4 font-semibold">Amount Paid</th>
                                    <th className="p-4 font-semibold">Method</th>
                                    <th className="p-4 font-semibold">Remaining Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayments.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">No payments found.</td>
                                    </tr>
                                ) : (
                                    filteredPayments.map((p) => (
                                        <tr key={p._id} className="border-b hover:bg-gray-50 transition-colors">
                                            <td className="p-4 text-sm text-gray-600">
                                                {new Date(p.paymentDate).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <p className="font-semibold text-gray-800">{p.loanId?.customerId?.fullName || 'Unknown'}</p>
                                                <p className="text-xs text-gray-500">ID: {p.loanId?._id?.substring(18)}...</p>
                                            </td>
                                            <td className="p-4 font-bold text-emerald-600">₹{p.amountPaid.toLocaleString()}</td>
                                            <td className="p-4">
                                                <div className="flex items-center space-x-1">
                                                    <CheckCircle size={14} className="text-emerald-500" />
                                                    <span className="text-sm font-medium text-gray-600">{p.paymentMethod}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 font-medium text-orange-600">₹{Math.round(p.remainingBalance).toLocaleString()}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <h3 className="text-xl font-bold mb-4">Record Repayment</h3>
                        <form onSubmit={handleCreatePayment} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Select Active Loan *</label>
                                <select required className="w-full border p-2 rounded" value={formData.loanId} onChange={e => {
                                    const loan = loans.find(l => l._id === e.target.value);
                                    setFormData({ ...formData, loanId: e.target.value });
                                }}>
                                    {loans.length === 0 && <option value="">No Active Loans</option>}
                                    {loans.map(l => (
                                        <option key={l._id} value={l._id}>
                                            {l.customerId?.fullName} - Bal: ₹{Math.round(l.outstandingBalance)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Amount Paid (₹) *</label>
                                <input required type="number" min="1" className="w-full border p-2 rounded" value={formData.amountPaid} onChange={e => setFormData({ ...formData, amountPaid: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Payment Method *</label>
                                <select required className="w-full border p-2 rounded" value={formData.paymentMethod} onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank">Bank Transfer</option>
                                    <option value="UPI">UPI</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Payment Date *</label>
                                <input required type="date" className="w-full border p-2 rounded" value={formData.paymentDate} onChange={e => setFormData({ ...formData, paymentDate: e.target.value })} />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button type="submit" disabled={loans.length === 0} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50">Record Payment</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payments;
