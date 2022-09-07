import { IAuthContext, IData, IUser } from "../interfaces/index";
import React from "react";
import { AuthContext } from "./contexts";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const defaultState: IAuthContext = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
};

const reducer = (
    state: IAuthContext,
    action: { type: string; payload: any }
) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case "SET_USER":
            return {
                ...state,
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
                isLoading: action.payload,
            };
        case "CLEAN":
            return {
                ...defaultState,
            };

        default:
            return state;
    }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [state, dispatch] = React.useReducer(reducer, defaultState);

    const values = React.useMemo(() => {
        const loginHandler = async (
            email: string,
            password: string,
            coachId = ""
        ) => {
            try {
                dispatch({ type: "LOADING", payload: true });
                const response: AxiosResponse<IData> = await axios.post(
                    `/api/auth/login`,
                    { email, password },
                    { withCredentials: true }
                );
                dispatch({ type: "LOADING", payload: false });
                if (response.status === 200 || response.status === 201) {
                    localStorage.setItem(
                        "token",
                        response?.data?.access_token as string
                    );
                    dispatch({
                        type: "LOGIN",
                        payload: { ...response.data.user, coachId },
                    });
                } else {
                    alert(response.data.message);
                }
            } catch (error: any) {
                console.log(error);
                dispatch({ type: "LOADING", payload: false });
                alert("Authentication failed");
            }
        };

        const logoutHandler = () => {
            localStorage.removeItem("token");
            dispatch({ type: "LOGOUT" });
            navigate("/");
        };

        const registerHandler = async (user: IUser) => {
            try {
                dispatch({ type: "LOADING", payload: true });
                const res: AxiosResponse<IData> = await axios.post(
                    "/api/auth/register",
                    user
                );

                dispatch({ type: "LOADING", payload: false });

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
                const token = localStorage.getItem("token");
                if (token) {
                    dispatch({ type: "LOADING", payload: true });
                    const res: AxiosResponse<IData> = await axios.get(
                        "/api/auth/validate",
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );

                    if (res.status === 200 || res.status === 201) {
                        dispatch({ type: "LOGIN", payload: res?.data?.user });
                    } else {
                        alert("Validation failed");
                        navigate("/");
                    }
                } else {
                    dispatch({ type: "LOADING", payload: false });
                    navigate("/");
                }
            } catch (error: any) {
                dispatch({ type: "LOADING", payload: false });
                navigate("/");
            }
        };

        const getUserIngo = async (email: string) => {
            try {
                dispatch({ type: "LOADING", payload: true });
                const token = localStorage.getItem("token");

                const res: AxiosResponse<IData> = await axios.post(
                    "/api/auth/user-info",
                    { email },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                dispatch({ type: "LOADING", payload: false });

                if (res.status === 200 || res.status === 201) {
                    return res?.data?.user;
                } else {
                    alert("Failed to get user info");
                }
            } catch (error: any) {
                alert(error.message);
            }
        };

        const updateUser = async (user: IUser) => {
            try {
                dispatch({ type: "LOADING", payload: true });
                const token = localStorage.getItem("token");

                const res: AxiosResponse<IData> = await axios.put(
                    "/api/auth/update-info",
                    user,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                dispatch({ type: "LOADING", payload: false });

                if (res.status === 200 || res.status === 201) {
                    return res?.data?.user;
                } else {
                    alert("Failed to update user");
                }
            } catch (error: any) {
                alert(error.message);
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
            clean: () => dispatch({ type: "CLEAN" }),
            getUser: getUserIngo,
            updateUser: updateUser,
        };

        return returntVal;
    }, [state]);

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
