
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useCategories = () => {



  const token = Cookies.get("token");

  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3333/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};
