import React from "react";
import { IAuthContext } from "../interfaces";

export const AuthContext = React.createContext<IAuthContext>({
    isAuthenticated: false,
    user: null,
    login: async () => {},
    logout: () => {},
    register: async () => {},
    isLoading: false,
    validateToken: async () => {},
});
