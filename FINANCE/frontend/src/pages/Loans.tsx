import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Plus, Search, FileText } from 'lucide-react';
import { InterestType } from '../../../backend/src/models/Loan';

interface Customer {
    _id: string;
    fullName: string;
}

interface Loan {
    _id: string;
    customerId: Customer;
    loanAmount: number;
    interestRate: number;
    interestType: InterestType;
    startDate: string;
    tenureMonths: number;
    emiAmount: number;
    totalPayableAmount: number;
    outstandingBalance: number;
    status: string;
}

const Loans = () => {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        customerId: '',
        loanAmount: 10000,
        interestRate: 12,
        interestType: 'Flat',
        startDate: new Date().toISOString().split('T')[0],
        tenureMonths: 12
    });

    const fetchLoans = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/loans');
            setLoans(data);
        } catch (error) {
            console.error('Error fetching loans', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomers = async () => {
        try {
            const { data } = await api.get('/customers');
            setCustomers(data);
            if (data.length > 0 && !formData.customerId) {
                setFormData(prev => ({ ...prev, customerId: data[0]._id }));
            }
        } catch (error) {
            console.error('Error fetching customers', error);
        }
    };

    useEffect(() => {
        fetchLoans();
        fetchCustomers();
    }, []);

    const handleCreateLoan = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/loans', formData);
            setShowModal(false);
            fetchLoans();
        } catch (error) {
            console.error('Error creating loan', error);
        }
    };

    const filteredLoans = loans.filter(l =>
        l.customerId?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        l.status.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Loans</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus size={20} />
                    <span>New Loan</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by customer name or status..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading loans...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-sm border-b uppercase tracking-wider">
                                    <th className="p-4 font-semibold">Customer</th>
                                    <th className="p-4 font-semibold">Amount</th>
                                    <th className="p-4 font-semibold">Terms (Months)</th>
                                    <th className="p-4 font-semibold">Outstanding</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLoans.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-500">No loans found.</td>
                                    </tr>
                                ) : (
                                    filteredLoans.map((l) => (
                                        <tr key={l._id} className="border-b hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{l.customerId?.fullName || 'Unknown'}</p>
                                                        <p className="text-xs text-gray-500 truncate">{l.interestType} - {l.interestRate}%/yr</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 font-medium">₹{l.loanAmount.toLocaleString()}</td>
                                            <td className="p-4">{l.tenureMonths} mos<br /><span className="text-xs text-gray-500">₹{Math.round(l.emiAmount)}/mo</span></td>
                                            <td className="p-4 font-bold text-orange-600">₹{Math.round(l.outstandingBalance).toLocaleString()}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${l.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                        l.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                                                            'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {l.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Details</button>
                                            </td>
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">Create New Loan</h3>
                        <form onSubmit={handleCreateLoan} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Select Customer *</label>
                                <select required className="w-full border p-2 rounded" value={formData.customerId} onChange={e => setFormData({ ...formData, customerId: e.target.value })}>
                                    {customers.map(c => <option key={c._id} value={c._id}>{c.fullName}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Principal Amount *</label>
                                    <input required type="number" min="1000" className="w-full border p-2 rounded" value={formData.loanAmount} onChange={e => setFormData({ ...formData, loanAmount: Number(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Interest Rate (%) *</label>
                                    <input required type="number" step="0.1" className="w-full border p-2 rounded" value={formData.interestRate} onChange={e => setFormData({ ...formData, interestRate: Number(e.target.value) })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Interest Type *</label>
                                    <select required className="w-full border p-2 rounded" value={formData.interestType} onChange={e => setFormData({ ...formData, interestType: e.target.value })}>
                                        <option value="Flat">Flat Rate</option>
                                        <option value="Reducing">Reducing Balance</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tenure (Months) *</label>
                                    <input required type="number" min="1" className="w-full border p-2 rounded" value={formData.tenureMonths} onChange={e => setFormData({ ...formData, tenureMonths: Number(e.target.value) })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Start Date *</label>
                                <input required type="date" className="w-full border p-2 rounded" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} />
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Approve Loan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Loans;
