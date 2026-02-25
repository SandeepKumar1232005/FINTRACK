import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, Banknote, FileText } from 'lucide-react';

const Sidebar = () => {
    const links = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: 'Customers', path: '/customers', icon: <Users className="w-5 h-5" /> },
        { name: 'Loans', path: '/loans', icon: <CreditCard className="w-5 h-5" /> },
        { name: 'Payments', path: '/payments', icon: <Banknote className="w-5 h-5" /> },
        { name: 'Reports', path: '/reports', icon: <FileText className="w-5 h-5" /> },
    ];

    return (
        <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col shadow-xl">
            <div className="p-6 text-2xl font-bold border-b border-slate-700 tracking-wider">
                FINTRACK
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        {link.icon}
                        <span className="font-medium">{link.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
