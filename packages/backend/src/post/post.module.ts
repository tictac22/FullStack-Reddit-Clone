import { Module } from "@nestjs/common"

import { PostController } from "./post.controller"
import { PostPController } from "./post.p.controller"
import { PostService } from "./post.service"

@Module({
	providers: [PostService],
	controllers: [PostController, PostPController]
})
export class PostModule {}
