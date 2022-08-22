import { $api } from "@/utils/axios"

import { Community, Post } from "./types"

export class QueryService {
	static async getCommunity(title: string): Promise<Community> {
		const response = await $api(`communityP?title=${title}`, {
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

	static async getPost(postId: number): Promise<Post> {
		const response = await $api(`postP?postId=${postId}`, {
			method: "GET"
		})
		if (!(response.status === 200)) {
			throw new Error("No Communities found")
		}
		return response.data
	}

	static async getAllPosts(isAuthenicated: boolean): Promise<Post[]> {
		const requestPath = isAuthenicated ? "post/all" : "postP/all/"
		const response = await $api(requestPath, {
			method: "GET"
		})
		if (!(response.status === 200)) {
			throw new Error("No Communities found")
		}
		return response.data
	}
}
