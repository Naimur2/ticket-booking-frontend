import * as React from "react";
import { IAddLocationState, ILocation } from "../interfaces";
import { LocationContext } from "./contexts";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const defaultState: IAddLocationState = {
    isLoading: false,
    error: null,
    locations: [],
};

const reducer = (state: IAddLocationState, action: any) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                isLoading: action.payload,
            };
        case "ERROR":
            return {
                ...state,
                error: action.payload,
            };
        case "ADD_LOCATION":
            return {
                ...state,
                locations: [...state.locations, action.payload],
            };
        case "SET_LOCATIONS":
            return {
                ...state,
                locations: action.payload,
            };
        case "DELETE_LOCATION":
            return {
                ...state,
                locations: state.locations.filter(
                    (location: any) => location._id !== action.payload
                ),
            };
        case "UPDATE_LOCATION":
            return {
                ...state,
                locations: state.locations.map((location: any) => {
                    if (location._id === action.payload._id) {
                        return action.payload;
                    }
                    return location;
                }),
            };
        case "CLEAN":
            return {
                ...defaultState,
            };
        default:
            return state;
    }
};

export default function LocationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [state, dispatch] = React.useReducer(reducer, defaultState);
    const navigate = useNavigate();

    const values = React.useMemo(() => {
        const handleAddLocation = async (location: ILocation) => {
            try {
                dispatch({ type: "LOADING", payload: true });

                const token = localStorage.getItem("token");

                const response: AxiosResponse<any> = await axios.post(
                    `/api/locations/`,
                    location,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.status === 200 || response.status === 201) {
                    dispatch({
                        type: "ADD_LOCATION",
                        payload: response.data.location,
                    });
                    navigate("/admin/locations");
                    alert("Location added successfully");
                } else {
                    alert("Error adding location");
                }
                dispatch({ type: "LOADING", payload: false });
            } catch (error: any) {
                alert("Error adding location");
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const handleDeleteLocation = async (id: string) => {
            try {
                const token = localStorage.getItem("token");

                const response: AxiosResponse<any> = await axios.delete(
                    `/api/locations/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.status === 200 || response.status === 201) {
                    dispatch({
                        type: "DELETE_LOCATION",
                        payload: id,
                    });
                    alert("Location deleted successfully");
                } else {
                    alert("Error deleting location");
                }
            } catch (error) {
                alert(error.message);
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const getLocationById = async (id: string) => {
            try {
                const token = localStorage.getItem("token");

                dispatch({ type: "LOADING", payload: true });
                const response: AxiosResponse<any> = await axios.get(
                    `/api/locations/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                dispatch({ type: "LOADING", payload: false });
                if (response.status === 200 || response.status === 201) {
                    return response.data.location;
                } else {
                    alert("Error getting location");
                }
            } catch (error: any) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const handleGetLocations = async () => {
            try {
                const token = localStorage.getItem("token");
                dispatch({ type: "LOADING", payload: true });
                const response: AxiosResponse<any> = await axios.get(
                    `/api/locations`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                dispatch({ type: "LOADING", payload: false });
                if (response.status === 200 || response.status === 201) {
                    dispatch({
                        type: "SET_LOCATIONS",
                        payload: response.data.locations,
                    });
                } else {
                    alert("Error getting locations");
                }
            } catch (error: any) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const handleUpdateLocation = async (location: any) => {
            try {
                const token = localStorage.getItem("token");
                dispatch({ type: "LOADING", payload: true });
                const response: AxiosResponse<any> = await axios.put(
                    `/api/locations/${location._id}`,
                    location,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                dispatch({ type: "LOADING", payload: false });
                if (response.status === 200 || response.status === 201) {
                    dispatch({
                        type: "UPDATE_LOCATION",
                        payload: response.data.location,
                    });
                    navigate("/admin/locations");
                } else {
                    alert("Error updating location");
                }
            } catch (error: any) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };

        const locationValues: IAddLocationState = {
            isLoading: state.isLoading,
            error: state.error,
            locations: state.locations,
            addLocation: handleAddLocation,
            deleteLocation: handleDeleteLocation,
            getLoationById: getLocationById,
            getAllLocations: handleGetLocations,
            updateLocation: handleUpdateLocation,
            clean: () => dispatch({ type: "CLEAN" }),
        };

        return locationValues;
    }, [state]);

    return (
        <LocationContext.Provider value={values}>
            {children}
        </LocationContext.Provider>
    );
}
