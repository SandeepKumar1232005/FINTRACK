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
                <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus size={20} />
                    <span>Add Customer</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name or mobile..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading customers...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-sm border-b uppercase tracking-wider">
                                    <th className="p-4 font-semibold">Name</th>
                                    <th className="p-4 font-semibold">Contact</th>
                                    <th className="p-4 font-semibold">Address</th>
                                    <th className="p-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-500">No customers found.</td>
                                    </tr>
                                ) : (
                                    customers.map((c) => (
                                        <tr key={c._id} className="border-b hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                        <User size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{c.fullName}</p>
                                                        <p className="text-xs text-gray-500">{c.idProofReference || 'No ID'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <Phone size={16} className="text-gray-400" />
                                                    <span>{c.mobileNumber}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <MapPin size={16} className="text-gray-400" />
                                                    <span className="truncate max-w-[200px]">{c.address}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View Profile</button>
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <h3 className="text-xl font-bold mb-4">Add New Customer</h3>
                        <form onSubmit={handleCreateCustomer} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name *</label>
                                <input required type="text" className="w-full border p-2 rounded" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Mobile Number *</label>
                                <input required type="text" className="w-full border p-2 rounded" value={formData.mobileNumber} onChange={e => setFormData({ ...formData, mobileNumber: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Address *</label>
                                <textarea required className="w-full border p-2 rounded" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">ID Proof Ref (Optional)</label>
                                <input type="text" className="w-full border p-2 rounded" value={formData.idProofReference} onChange={e => setFormData({ ...formData, idProofReference: e.target.value })} />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Customer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
