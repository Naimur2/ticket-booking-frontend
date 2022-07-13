import {
    getAllData,
    handleAdd,
    handleDelete,
    handleUpdate,
} from "../helpers/api-calls";
import { IBusContext } from "../interfaces";
import { BusContext } from "./contexts";

import * as React from "react";
import { IBus, IConfig } from "../interfaces/index";
import { useNavigate } from "react-router-dom";
import { getDataById } from "../helpers/api-calls";

const defaultState: IBusContext = {
    isLoading: false,
    error: null,
    buses: [],
};

const reducer = (state: IBusContext, action: any) => {
    switch (action.type) {
        case "ADD_BUS":
            return {
                ...state,
                isLoading: false,
                buses: [...state.buses, action.payload],
            };
        case "DELETE_BUS":
            return {
                ...state,
                isLoading: false,
                buses: state.buses.filter((bus) => bus._id !== action.payload),
            };
        case "UPDATE_BUS":
            return {
                ...state,
                isLoading: false,
                buses: state.buses.map((bus) => {
                    if (bus._id === action.payload._id) {
                        return action.payload;
                    }
                    return bus;
                }),
            };
        case "GET_BUS":
            return {
                ...state,
                isLoading: false,
                buses: action.payload,
            };
        case "CLEAN":
            return {
                ...state,
                isLoading: false,
                error: null,
                buses: [],
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

export default function BusProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [state, dispatch] = React.useReducer(reducer, defaultState);
    const navigate = useNavigate();

    const values = React.useMemo(() => {
        const addBus = async (bus: FormData) => {
            try {
                const config: IConfig = {
                    "Content-Type": "multipart/form-data",
                };

                const result = await handleAdd("/api/bus", bus, config);
                dispatch({ type: "ADD_BUS", payload: result.data });
                alert(result.message);

                navigate(-1);
            } catch (error: any) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const deleteBus = async (_id: string) => {
            try {
                const result = await handleDelete("/api/bus", _id);
                dispatch({ type: "DELETE_BUS", payload: _id });
                alert(result.message);
            } catch (error) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const updateBus = async (bus: IBus, id: string) => {
            try {
                const config: IConfig = {
                    "Content-Type": "multipart/form-data",
                };

                const result = await handleUpdate("/api/bus", id, bus, config);

                dispatch({ type: "UPDATE_BUS", payload: result.data });

                alert(result.message);

                navigate(-1);
            } catch (error) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const getBus = async () => {
            try {
                const result = await getAllData("/api/bus");
                console.log(result);
                dispatch({ type: "GET_BUS", payload: result.data });
            } catch (error) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const getBusById = async (_id: string) => {
            try {
                const result = await getDataById("/api/bus", _id);
                return result.data;
            } catch (error) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const rtData: IBusContext = {
            isLoading: state.isLoading,
            error: state.error,
            buses: state.buses,
            add: addBus,
            delete: deleteBus,
            update: updateBus,
            get: getBus,
            getById: getBusById,
            clean: () => dispatch({ type: "CLEAN" }),
        };

        return rtData;
    }, [state]);

    return <BusContext.Provider value={values}>{children}</BusContext.Provider>;
}
