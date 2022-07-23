import React from "react";
import { IAuthContext } from "../interfaces";
import {
    IAddLocationState,
    IBusContext,
    ICoachContext,
} from "../interfaces/index";

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

export const BusContext = React.createContext<IBusContext>({
    isLoading: false,
    error: null,
    add: async () => {},
    clean: () => {},
    delete: async () => {},
    update: async () => {},
    get: async () => {},
    getById: async () => {},
    buses: [],
});

export const CoachContext = React.createContext<ICoachContext>({
    isLoading: false,
    error: null,
    add: async () => {},
    clean: () => {},
    delete: async () => {},
    update: async () => {},
    get: async () => {},
    getById: async () => {},
    search: async () => {},
    coaches: [],
});
