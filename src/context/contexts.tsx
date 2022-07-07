import React from "react";
import { IAuthContext } from "../interfaces";
import { IAddLocationState } from "../interfaces/index";

export const AuthContext = React.createContext<IAuthContext>({
    isAuthenticated: false,
    user: null,
    login: async () => {},
    logout: () => {},
    register: async () => {},
    isLoading: false,
    validateToken: async () => {},
    clean: () => {},
});

export const LocationContext = React.createContext<IAddLocationState>({
    isLoading: false,
    error: null,
    addLocation: async () => {},
    clean: () => {},
    deleteLocation: async () => {},
    updateLocation: async () => {},
    getLocations: async () => {},
    getLoationById: async () => {},
    locations: [],
});
