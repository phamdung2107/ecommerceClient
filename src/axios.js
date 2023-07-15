import axios from "axios";

const instance = axios.create({
  baseURL: "https://mern-shop-app-be.onrender.com/",
});

export default instance;
