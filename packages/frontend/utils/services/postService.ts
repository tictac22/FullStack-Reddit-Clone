import { $api } from "@/utils/axios"

import { Post } from "../types"

export class PostService {
	static async getPost(postId: number): Promise<Post> {
		const response = await $api(`postP?postId=${postId}`, {
			method: "GET"
		})
		if (!(response.status === 200)) {
			throw new Error("No Communities found")
		}
		return response.data
	}
	static async getPostsCommunity(title: string, cursor = "null"): Promise<{ posts: Post[]; cursor: number | null }> {
		const response = await $api(`postP/community?title=${title}&cursor=${cursor}`, {
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
	static async getPostsUser(username: string, cursor = "null"): Promise<{ posts: Post[]; cursor: number | null }> {
		const response = await $api(`user/community?username=${username}&cursor=${cursor}`, {
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
