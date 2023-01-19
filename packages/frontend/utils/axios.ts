import axios from "axios"
//http://localhost:3000
//https://fullstack-reddit-clone-production.up.railway.app/
export const API_URL = "https://fullstack-reddit-clone-production.up.railway.app/"
//eslint-disable-next-line
console.log(API_URL)
export const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true
})

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
	return config
})
