import {
    getAllData,
    getDataById,
    handleAdd,
    handleDelete,
    handleUpdate,
} from "../helpers/api-calls";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ICoachContext, IConfig } from "../interfaces/index";
import { CoachContext } from "./contexts";
import { searchData } from "../helpers/api-calls";

const defaultState: ICoachContext = {
    isLoading: false,
    error: null,
    coaches: [],
};

const reducer = (state: ICoachContext, action: any) => {
    switch (action.type) {
        case "ADD_DATA":
            return {
                ...state,
                isLoading: false,
                coaches: [...state.coaches, action.payload],
            };
        case "DELETE_DATA":
            return {
                ...state,
                isLoading: false,
                coaches: state.coaches.filter(
                    (coach) => coach._id !== action.payload
                ),
            };
        case "UPDATE_DATA":
            return {
                ...state,
                isLoading: false,
                coaches: state.coaches.map((coach) => {
                    if (coach._id === action.payload._id) {
                        return action.payload;
                    }
                    return coach;
                }),
            };
        case "GET_DATA":
            return {
                ...state,
                isLoading: false,
                coaches: action.payload,
            };
        case "CLEAN":
            return {
                ...state,
                isLoading: false,
                error: null,
                coaches: [],
            };
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload,
            };
        case "ERROR":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default function CoachProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [state, dispatch] = React.useReducer(reducer, defaultState);
    const navigate = useNavigate();

    const API = "/api/coaches";

    const values = React.useMemo(() => {
        const addData = async (coach: FormData) => {
            try {
                const config: IConfig = {};

                const result = await handleAdd(API, coach, config);
                dispatch({ type: "ADD_DATA", payload: result.data });
                alert(result.message);

                navigate(-1);
            } catch (error: any) {
                alert("Error adding data");
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const deleteData = async (_id: string) => {
            try {
                const result = await handleDelete(API, _id);
                dispatch({ type: "DELETE_DATA", payload: _id });
                alert(result.message);
            } catch (error: any) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const updateData = async (bus: FormData, id: string) => {
            try {
                const config: IConfig = {
                    "Content-Type": "multipart/form-data",
                };

                const result = await handleUpdate(API, id, bus, config);

                dispatch({ type: "UPDATE_DATA", payload: result.data });

                alert(result.message);

                navigate(-1);
            } catch (error: any) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const getData = async () => {
            try {
                const result = await getAllData(API);
                dispatch({ type: "GET_DATA", payload: result.data });
            } catch (error: any) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const getIDataById = async (_id: string) => {
            try {
                const result = await getDataById(API, _id);
                return result.data;
            } catch (error: any) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const search = async (params: any) => {
            try {
                const result = await searchData(API + "/search", params);
                return result.data;
            } catch (error: any) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const rtData: ICoachContext = {
            isLoading: state.isLoading,
            error: state.error,
            coaches: state.coaches,
            add: addData,
            delete: deleteData,
            update: updateData,
            get: getData,
            getById: getIDataById,
            clean: () => dispatch({ type: "CLEAN" }),
            search,
        };

        return rtData;
    }, [state]);

    return (
        <CoachContext.Provider value={values}>{children}</CoachContext.Provider>
    );
}
