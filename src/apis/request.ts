import axios from "axios";

const request = (config: object) => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        timeout: 5000,
        withCredentials: true
    });

    return instance(config);
}

export default request;