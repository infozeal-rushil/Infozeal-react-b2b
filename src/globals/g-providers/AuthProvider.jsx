import { createContext, useContext, useState } from 'react';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
    const login = (token, userName, userId) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userName', userName);
        localStorage.setItem('UserID', userId);
        setIsAuthenticated(true);
    };
    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('UserID');
        setIsAuthenticated(false);
    };
    return (<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>);
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
