import axios, { AxiosResponse } from "axios";

export const handleAdd = async (data: any, api: string) => {
    try {
        const token = localStorage.getItem("token");

        const response: AxiosResponse<any> = await axios.post(api, data, {
            headers: { Authorization: `Bearer ${token}` },
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

export const handleDelete = async (id: string, api: string) => {
    try {
        const token = localStorage.getItem("token");

        const response: AxiosResponse<any> = await axios.delete(`${api}${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error({ message: "Error deleting data" } as any);
        }
    } catch (error) {
        throw new Error({ message: error.message } as any);
    }
};

export const getDataById = async (id: string, api: string) => {
    try {
        const token = localStorage.getItem("token");

        const response: AxiosResponse<any> = await axios.get(`${api}${id}`, {
            headers: { Authorization: `Bearer ${token}` },
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

export const getAllData = async (api: string) => {
    try {
        const token = localStorage.getItem("token");

        const response: AxiosResponse<any> = await axios.get(api, {
            headers: { Authorization: `Bearer ${token}` },
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

export const handleUpdate = async (data: any, api: string) => {
    try {
        const token = localStorage.getItem("token");

        const response: AxiosResponse<any> = await axios.put(
            `${api}${data._id}`,
            data,
            { headers: { Authorization: `Bearer ${token}` } }
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
