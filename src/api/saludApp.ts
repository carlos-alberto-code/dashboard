import api from "./api.ts";
import type {AppHealthData} from "../types/appHealth.ts";

export const getAppHealth = async (): Promise<AppHealthData> => {
    try {
        const {data} = await api.get<AppHealthData>("/salud/datos");
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
};
