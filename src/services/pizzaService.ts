import axios from "axios";
import { IPizza } from "@/store/pizza.interface";

const API_URL = "https://67a9bad96e9548e44fc49a95.mockapi.io/pizza";
axios.defaults.baseURL = API_URL;

export const PizzaService = {
  async fetchPizzas(page = 1, limit = 100): Promise<IPizza[]> {
    try {
      const { data } = await axios.get<IPizza[]>(`?page=${page}&limit=${limit}`);
      return data;
    } catch (error) {
      console.error("Ошибка при загрузке пицц:", error);
      return [];
    }
  },

  async searchPizzas(query: string): Promise<IPizza[]> {
    if (!query.trim()) return [];
    try {
      const { data } = await axios.get<IPizza[]>(`?search=${query}`);
      return data;
    } catch (error) {
      console.error("Ошибка при поиске пиццы:", error);
      return [];
    }
  },

  async fetchPizzaById(id: string): Promise<IPizza | null> {
    try {
      const { data } = await axios.get<IPizza>(`${id}`); 
      return data;
    } catch (error) {
      console.error(`Ошибка при загрузке пиццы с id ${id}:`, error);
      return null;
    }
  },
};
