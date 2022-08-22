import { PostService } from "./post.service"
import { Controller, Get, Query } from "@nestjs/common"

@Controller("postP")
export class PostPController {
	constructor(private postService: PostService) {}

	@Get()
	getPost(@Query("postId") postId: number) {
		return this.postService.getPost(postId)
	}

	@Get("all")
	getAllPosts() {
		return this.postService.getAllPosts()
	}
}
