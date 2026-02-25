import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Plus, Search, User, Phone, MapPin } from 'lucide-react';

interface Customer {
    _id: string;
    fullName: string;
    mobileNumber: string;
    address: string;
    idProofReference?: string;
    notes?: string;
}

const Customers = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', mobileNumber: '', address: '', idProofReference: '', notes: '' });

    const fetchCustomers = async (keyword = '') => {
        setLoading(true);
        try {
            const { data } = await api.get(`/customers?keyword=${keyword}`);
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers(search);
    }, [search]);

    const handleCreateCustomer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/customers', formData);
            setShowModal(false);
            setFormData({ fullName: '', mobileNumber: '', address: '', idProofReference: '', notes: '' });
            fetchCustomers();
        } catch (error) {
            console.error('Error creating customer', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-100">Customers</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus size={20} />
                    <span>Add Customer</span>
                </button>
            </div>

            <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 overflow-hidden">
                <div className="p-4 border-b border-slate-700 flex items-center bg-slate-900/50">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name or mobile..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 placeholder-slate-400"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-slate-400">Loading customers...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900/50 text-slate-400 text-sm border-b border-slate-700 uppercase tracking-wider">
                                    <th className="p-4 font-semibold">Name</th>
                                    <th className="p-4 font-semibold">Contact</th>
                                    <th className="p-4 font-semibold">Address</th>
                                    <th className="p-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-slate-400">No customers found.</td>
                                    </tr>
                                ) : (
                                    customers.map((c) => (
                                        <tr key={c._id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-blue-400">
                                                        <User size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-100">{c.fullName}</p>
                                                        <p className="text-xs text-slate-400">{c.idProofReference || 'No ID'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center space-x-2 text-slate-300">
                                                    <Phone size={16} className="text-slate-500" />
                                                    <span>{c.mobileNumber}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center space-x-2 text-slate-300">
                                                    <MapPin size={16} className="text-slate-500" />
                                                    <span className="truncate max-w-[200px]">{c.address}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">View Profile</button>
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
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800 rounded-xl shadow-xl w-full max-w-md p-6 border border-slate-700 text-slate-100">
                        <h3 className="text-xl font-bold mb-4">Add New Customer</h3>
                        <form onSubmit={handleCreateCustomer} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slate-300">Full Name *</label>
                                <input required type="text" className="w-full border border-slate-600 bg-slate-900 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slate-300">Mobile Number *</label>
                                <input required type="text" className="w-full border border-slate-600 bg-slate-900 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" value={formData.mobileNumber} onChange={e => setFormData({ ...formData, mobileNumber: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slate-300">Address *</label>
                                <textarea required className="w-full border border-slate-600 bg-slate-900 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slate-300">ID Proof Ref (Optional)</label>
                                <input type="text" className="w-full border border-slate-600 bg-slate-900 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" value={formData.idProofReference} onChange={e => setFormData({ ...formData, idProofReference: e.target.value })} />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-700 rounded transition-colors">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Save Customer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
