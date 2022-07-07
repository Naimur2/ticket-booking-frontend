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
}
