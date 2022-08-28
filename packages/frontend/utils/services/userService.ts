import { $api } from "../axios"
import { User } from "../types"

export class UserService {
	static async getUser(username: string): Promise<User> {
		const response = await $api(`user/info?username=${username}`, {
			method: "GET"
		})
		if (!(response.status === 200)) {
			throw new Error("Community not found")
		}
		return response.data
	}
}
