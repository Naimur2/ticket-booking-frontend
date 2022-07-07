import { IAuthContext, IUser } from "../interfaces/index";
import React from "react";
import { AuthContext } from "./contexts";
import axios, { AxiosResponse } from "axios";

interface IData {
    message: string;
    access_token?: string;
    user?: IUser;
}

const api = import.meta.env.VITE_API_URL;

const defaultState: IAuthContext = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
};

const reducer = (state: IAuthContext, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                user: null,
            };
        case "LOADING":
            return {
                ...state,
                isLoading: true,
            };
        default:
            return state;
    }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(reducer, defaultState);

    const values = React.useMemo(() => {
        const loginHandler = async (email: string, password: string) => {
            try {
                dispatch({ type: "LOADING" });
                const response: AxiosResponse<IData> = await axios.post(
                    `/api/auth/login`,
                    { email, password },
                    { withCredentials: true }
                );
                if (res.status === 200 || res.status === 201) {
                    localStorage.setItem(
                        "token",
                        response?.data?.access_token as string
                    );
                    dispatch({ type: "LOGIN", payload: response.data.user });
                } else {
                    alert(response.data.message);
                }
            } catch (error: any) {
                alert("Authentication failed");
            }
        };

        const logoutHandler = () => {
            console.log("logout");
            dispatch({ type: "LOGOUT" });
        };

        const registerHandler = async (user: IUser) => {
            console.log("register", user);
            try {
                dispatch({ type: "LOADING" });
                const res: AxiosResponse<IData> = await axios.post(
                    "/api/auth/register",
                    user
                );

                console.log(res);

                if (res.status === 200 || res.status === 201) {
                    localStorage.setItem(
                        "token",
                        res?.data?.access_token as string
                    );
                    dispatch({ type: "LOGIN", payload: res?.data?.user });
                } else {
                    alert("Registration failed");
                }
            } catch (error: any) {
                alert(error.message);
            }
        };

        const validateTokenHandler = async () => {
            try {
                dispatch({ type: "LOADING" });
                const token = localStorage.getItem("token");

                const res: AxiosResponse<IData> = await axios.get(
                    "/api/auth/validate",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (res.status === 200 || res.status === 201) {
                    console.log(res.data);
                    dispatch({ type: "LOGIN", payload: res?.data?.user });
                } else {
                    alert("Validation failed");
                }
            } catch (error: any) {
                alert("validation", error.message);
            }
        };

        const returntVal: IAuthContext = {
            isAuthenticated: state.isAuthenticated,
            isLoading: state.isLoading,
            user: state.user,
            login: loginHandler,
            logout: logoutHandler,
            register: registerHandler,
            validateToken: validateTokenHandler,
        };

        return returntVal;
    }, [state]);

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
