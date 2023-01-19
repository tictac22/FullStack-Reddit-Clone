import axios from "axios"
//http://localhost:5000
//fullstack-reddit-clone-production.up.railway.app
export const API_URL = "http://localhost:3333"

export const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true
})

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
	return config
})
