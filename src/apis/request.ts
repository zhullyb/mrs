import axios from "axios";

const request = (config: object) => {
    const instance = axios.create({
        timeout: 5000,
        withCredentials: true
    });

    return instance(config);
}

export default request;