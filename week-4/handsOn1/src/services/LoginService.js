import axios from "axios";

export const login = async () => {
  try {
    const response = await axios.get("http://localhost:3000/login", {});
    return response;
  } catch (error) {
    console.error("Error fetching login data:", error);
    throw error;
  }
};
