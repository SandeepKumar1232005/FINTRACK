import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminUser {
    _id: string;
    name: string;
    email: string;
    token: string;
}

interface AuthContextType {
    admin: AdminUser | null;
    login: (userData: AdminUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [admin, setAdmin] = useState<AdminUser | null>(() => {
        const savedUser = localStorage.getItem('adminInfo');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData: AdminUser) => {
        setAdmin(userData);
        localStorage.setItem('adminInfo', JSON.stringify(userData));
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem('adminInfo');
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
