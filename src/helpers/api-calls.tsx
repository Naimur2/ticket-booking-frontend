import axios, { AxiosResponse } from "axios";
import { IConfig } from "../interfaces/index";

export const handleAdd = async (api: string, data: any, config?: IConfig) => {
    try {
        const token = localStorage.getItem("token");
        const headers: IConfig = {
            Authorization: `Bearer ${token}`,
            ...config,
        };

        const response: AxiosResponse<any> = await axios.post(api, data, {
            headers,
        });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error({ message: "Error adding data" } as any);
        }
    } catch (error: any) {
        throw new Error({ message: error.message } as any);
    }
};

export const handleDelete = async (
    api: string,
    id: string,
    config?: object
) => {
    try {
        const token = localStorage.getItem("token");
        const headers: IConfig = {
            Authorization: `Bearer ${token}`,
            ...config,
        };

        console.log(headers);

        const response: AxiosResponse<any> = await axios.delete(
            `${api}/${id}`,
            {
                headers,
            }
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error({ message: "Error deleting data" } as any);
        }
    } catch (error) {
        throw new Error({ message: error.message } as any);
    }
};

export const getDataById = async (api: string, id: string, config?: object) => {
    try {
        const token = localStorage.getItem("token");
        const headers: IConfig = {
            Authorization: `Bearer ${token}`,
            ...config,
        };

        const response: AxiosResponse<any> = await axios.get(`${api}/${id}`, {
            headers,
        });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error({ message: "Error getting data" } as any);
        }
    } catch (error: any) {
        throw new Error({ message: error.message } as any);
    }
};

export const getAllData = async (api: string, config?: object) => {
    try {
        const token = localStorage.getItem("token");
        const headers: IConfig = {
            Authorization: `Bearer ${token}`,
            ...config,
        };

        console.log(headers);

        const response: AxiosResponse<any> = await axios.get(api, {
            headers,
        });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error({ message: "Error getting data" } as any);
        }
    } catch (error: any) {
        throw new Error({ message: error.message } as any);
    }
};

export const handleUpdate = async (
    api: string,
    id: string,
    data: any,
    config?: object
) => {
    try {
        const token = localStorage.getItem("token");
        const headers: IConfig = {
            Authorization: `Bearer ${token}`,
            ...config,
        };

        console.log(headers);

        const response: AxiosResponse<any> = await axios.put(
            `${api}/${id}`,
            data,
            { headers }
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error({ message: "Error updating data" } as any);
        }
    } catch (error: any) {
        throw new Error({ message: error.message } as any);
    }
};
