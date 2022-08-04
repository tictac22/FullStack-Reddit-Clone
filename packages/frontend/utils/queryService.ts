import { $api } from "@/utils/axios"

import { Community } from "./types"

export class QueryService {
	static async getCommunity(title: string): Promise<Community> {
		const response = await $api(`community/${title}`, {
			method: "GET"
		})
		if (!(response.status === 200)) {
			throw new Error("Community not found")
		}
		return response.data
	}
}
