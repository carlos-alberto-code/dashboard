import api from "./api.ts";
import type {LearningData} from "../types/Learning";

export const getLearningData = async (): Promise<LearningData> => {
    try {
        const {data} = await api.get<LearningData>("/aprendizaje/datos");
        return data;
    } catch (error) {
        throw error;
    }
};