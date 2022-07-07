export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    termsAccepted?: boolean;
    role?: string;
}

export interface IAuthContext {
    isAuthenticated: boolean;
    user: IUser | null;
    login?: (email: string, password: string) => Promise<void>;
    logout?: () => void;
    validateToken?: () => Promise<void>;
    register?: (user: IUser) => Promise<void>;
    isLoading: boolean;
    clean?: () => void;
}

export interface ILocation {
    _id?: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    image?: string;
}

export interface IAddLocationState {
    locations: ILocation[] | null;
    isLoading: boolean;
    error: string | null;
    addLocation?: (location: ILocation) => Promise<void>;
    getAllLocations?: () => Promise<void>;
    getLoationById?: (id: string) => Promise<void>;
    updateLocation?: (location: ILocation) => Promise<void>;
    deleteLocation?: (id: string) => Promise<void>;
    clean?: () => void;
}
