import axios from "axios";

const API = axios.create({
  baseURL: "https://full-react-vite.onrender.com/api"
});

// GET items
export const getItems = () => {
  return API.get("/items");
};

// CREATE item
export const addItem = (formData) => {
  return API.post("/items", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }

  
  });
};

export const getItemById = (id) => API.get(`/items/${id}`);

export const updateItem = (id, formData) =>
  API.put(`/items/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const deleteItem = (id) => API.delete(`/items/${id}`);

export default API;