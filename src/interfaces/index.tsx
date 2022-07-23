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

export interface IBus {
    _id?: string;
    busName: string;
    busLiscenseNumber: string;
    busType: "AC" | "Non-AC";
    busDescription: string;
    busImage: File | string;
    seatNumber: string;
}

export interface ICommon {
    isLoading: boolean;
    error: any | null;
    add?: (bus: IBus) => Promise<void>;
    clean?: () => void;
    delete?: (id: string) => Promise<void>;
    update?: (bus: IBus, id: string) => Promise<void>;
    get?: () => Promise<void>;
    getById?: (id: string) => Promise<void>;
    search?: (search: any) => Promise<void>;
}

export interface IBusContext extends ICommon {
    buses: IBus[];
}

export interface IConfig {
    [key: string]: string;
}

export interface ICoach {
    _id?: string;
    startingPoint: ILocation | string;
    destination: ILocation | string;
    bus?: IBus | string;
    startingTime?: string;
    price?: number;
    date?: Date | string;
}

export interface ICoachContext extends ICommon {
    coaches: ICoach[];
}
