import axios from "axios"

export const API_URL = "https://reddit-clone-oseo.onrender.com"

export const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true
})

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
	return config
})
