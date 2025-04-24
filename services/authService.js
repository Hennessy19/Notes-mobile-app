import {account } from './appwrite';
import { ID } from 'react-native-appwrite';

const authService = {

    // Register a new user
    register: async (email, password) => {
        try {
            const response = await account.create(ID.unique(), email, password);
            return response;
        } catch (error) {
            return { error: error.message || "Registration Failed please try again" };
        }
    },

    // Login a user
    login: async (email, password) => {
        try {
            const response = await account.createEmailPasswordSession(email, password);
            return response;
        } catch (error) {
            return { error: error.message || "Login Failed please check your cridentials" };
        }
    },

    // Logout a user
    logout: async () => {
        try {
            const response = await account.deleteSession('current'); // 'current' is the session ID for the current session
            return response;
        } catch (error) {
            return { error: error.message || "Logout Failed. Please try again" };
        }
    },

    // Get the current user
    getUser: async () => {
        try {
            const response = await account.get();
            return response;
        } catch (error) {
            return { error: error.message || "Failed to fetch user data" };
        }
    },


};

export default authService;