import React, { useState } from 'react';
import api from '../api/axios';
import { Download, FileText } from 'lucide-react';

const Reports = () => {
    const [loading, setLoading] = useState(false);

    const downloadCSV = (content: string, fileName: string) => {
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportLoans = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/loans');
            if (!data || data.length === 0) return alert('No Data available');

            const headers = 'ID,Customer Name,Loan Amount,Interest Rate,Interest Type,Outstanding Balance,Status\n';
            const rows = data.map((l: any) =>
                `${l._id},"${l.customerId?.fullName || ''}",${l.loanAmount},${l.interestRate},${l.interestType},${l.outstandingBalance},${l.status}`
            ).join('\n');

            downloadCSV(headers + rows, 'loan_report.csv');
        } catch (error) {
            console.error('Failed to export', error);
            alert('Failed to generate export');
        } finally {
            setLoading(false);
        }
    };

    const handleExportPayments = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/payments');
            if (!data || data.length === 0) return alert('No Data available');

            const headers = 'Date,Loan ID,Amount Paid,Method,Remaining Balance\n';
            const rows = data.map((p: any) =>
                `${new Date(p.paymentDate).toLocaleDateString()},${p.loanId?._id || ''},${p.amountPaid},${p.paymentMethod},${p.remainingBalance}`
            ).join('\n');

            downloadCSV(headers + rows, 'payment_report.csv');
        } catch (error) {
            console.error('Failed to export', error);
            alert('Failed to generate export');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Reports & Exports</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2">
                        <FileText size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Loan Statements</h3>
                    <p className="text-gray-500 text-sm max-w-sm">Download a comprehensive report of all active and closed loans, including outstanding balances and customer information.</p>
                    <button
                        onClick={handleExportLoans}
                        disabled={loading}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
                    >
                        <Download size={18} />
                        <span>Export to CSV</span>
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                        <FileText size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Payment History</h3>
                    <p className="text-gray-500 text-sm max-w-sm">Export a timeline of all recorded payments, including transaction methods and balances for accurate accounting.</p>
                    <button
                        onClick={handleExportPayments}
                        disabled={loading}
                        className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
                    >
                        <Download size={18} />
                        <span>Export to CSV</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reports;
