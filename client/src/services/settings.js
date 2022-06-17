import axios from "axios";
import {API_URL} from "./api-url";

const instance = axios.create({
        baseURL: API_URL
    })

export default instance;