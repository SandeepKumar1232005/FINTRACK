import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import {
    Users,
    CreditCard,
    TrendingUp,
    AlertCircle,
    Banknote,
    PieChart as PieChartIcon
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

interface DashboardMetrics {
    totalCustomers: number;
    activeLoans: number;
    totalAmountDisbursed: number;
    totalRepaymentsReceived: number;
    totalOutstandingAmount: number;
    overdueLoans: number;
    expectedTotalInterestEarnings: number;
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981'];

const Dashboard = () => {
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const { data } = await api.get('/analytics/dashboard');
                setMetrics(data);
            } catch (error) {
                console.error('Failed to parse dashboard metrics', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMetrics();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    }

    if (!metrics) return <div className="text-red-500">Failed to load data.</div>;

    const summaryCards = [
        { title: 'Total Customers', value: metrics.totalCustomers, icon: <Users className="text-blue-500" />, bg: 'bg-blue-50' },
        { title: 'Active Loans', value: metrics.activeLoans, icon: <CreditCard className="text-indigo-500" />, bg: 'bg-indigo-50' },
        { title: 'Disbursed', value: `₹${metrics.totalAmountDisbursed.toLocaleString()}`, icon: <TrendingUp className="text-emerald-500" />, bg: 'bg-emerald-50' },
        { title: 'Recovered', value: `₹${metrics.totalRepaymentsReceived.toLocaleString()}`, icon: <Banknote className="text-cyan-500" />, bg: 'bg-cyan-50' },
        { title: 'Outstanding', value: `₹${metrics.totalOutstandingAmount.toLocaleString()}`, icon: <PieChartIcon className="text-orange-500" />, bg: 'bg-orange-50' },
        { title: 'Overdue', value: metrics.overdueLoans, icon: <AlertCircle className="text-red-500" />, bg: 'bg-red-50' },
    ];

    const loanStatusData = [
        { name: 'Active', value: metrics.activeLoans },
        { name: 'Overdue', value: metrics.overdueLoans },
    ];

    const financialData = [
        { name: 'Disbursed', amount: metrics.totalAmountDisbursed },
        { name: 'Recovered', amount: metrics.totalRepaymentsReceived },
        { name: 'Outstanding', amount: metrics.totalOutstandingAmount },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {summaryCards.map((card, idx) => (
                    <div key={idx} className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
                        <div className={`p-4 rounded-full ${card.bg.replace('50', '900/50')}`}>
                            {card.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-400 mb-1">{card.title}</p>
                            <h3 className="text-2xl font-bold text-slate-100">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700">
                    <h3 className="text-lg font-bold text-slate-100 mb-6">Financial Overview (₹)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={financialData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value.toLocaleString()}`} stroke="#94a3b8" />
                                <Tooltip cursor={{ fill: '#334155' }} formatter={(value: any) => `₹${Number(value).toLocaleString()}`} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                                    {financialData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-100 mb-6">Loan Portfolio Status</h3>
                    <div className="flex-1 flex justify-center items-center h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={loanStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                >
                                    {loanStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
