import { $api } from "@/utils/axios"

import { Community } from "../types"

export class CommunityService {
	static async getCommunity(title: string): Promise<Community> {
		const response = await $api(`communityP/info?title=${title}`, {
			method: "GET"
		})
		if (!(response.status === 200)) {
			throw new Error("Community not found")
		}
		return response.data
	}
	static async getPopularCommunities(): Promise<Community[]> {
		const response = await $api(`communityP/popular`, {
			method: "GET"
		})
		if (!(response.status === 200)) {
			throw new Error("No Communities found")
		}
		return response.data
	}
}
