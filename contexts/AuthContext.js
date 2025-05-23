import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";  

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        checkUser();
    },[])

    const checkUser = async () => {
        setLoading(true);
            const response = await authService.getUser();
            if(response?.error){
                setUser(null);
            }
            else{
                setUser(response);
            }
            setLoading(false);
        }

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        if(response?.error){
            setUser(null);
            return response
        }
        await checkUser();
        return {success: true};
    }

    const register = async (email, password) => {
        const response = await authService.register(email, password);
        if(response?.error){
            setUser(null);
            return response
        }
        return login(email, password); // login after registration
    }

    const logout = async () => {
        console.log("Logging out...");
        const response = await authService.logout();
        if(response?.error){
            console.log("Logout failed ❌❌", response.error);
            return response
        }
        setUser(null);
        console.log("Logged out successfully ✅✅");
        return {success: true}; 
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
    
    };

export const useAuth = () => useContext(AuthContext);
