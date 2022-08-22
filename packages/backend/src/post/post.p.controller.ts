import { Controller, Get, Query } from "@nestjs/common"
import { PostService } from "./post.service"

@Controller("postP")
export class PostPController {
	constructor(private postService: PostService) {}

	@Get()
	getPost(@Query("postId") postId: number) {
		return this.postService.getPost(postId)
	}

	@Get("all")
	getAllPosts( @Query("page") pageParam:number) {
		return this.postService.getAllPosts(pageParam)
	}
}
