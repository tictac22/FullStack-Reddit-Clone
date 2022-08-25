import { $api } from "@/utils/axios"

import { Community, Post } from "./types"

export class QueryService {
	static async getCommunity(title: string, cursor: number | null): Promise<{ subReddit: Community; cursor: number }> {
		const response = await $api(`communityP?title=${title}&cursor=${cursor}`, {
			method: "GET"
		})
		if (!(response.status === 200)) {
			throw new Error("Community not found")
		}
		return {
			subReddit: response.data.subReddit,
			cursor: response.data.cursor
		}
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

	static async getAllPosts(
		isAuthenicated: boolean,
		cursor: number | null
	): Promise<{ posts: Post[]; cursor: number | null }> {
		const isCursor = cursor ? `cursor=${cursor}` : `cursor=null`
		const requestPath = isAuthenicated ? `post/all?${isCursor}` : `postP/all?${isCursor}`
		const response = await $api(requestPath, {
			method: "GET"
		})
		if (!(response.status === 200)) {
			throw new Error("No Communities found")
		}
		return {
			posts: response.data.posts,
			cursor: response.data.cursor
		}
	}
}
