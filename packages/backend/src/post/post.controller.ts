import {
	Body,
	Controller,
	Get,
	Patch,
	Post,
	Put,
	Query,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"

import { JwtAuthGuard } from "../auth/guards"
import { IRequest } from "../types"
import { cloudinary } from "../utils/cloudinary"
import { multerStorage } from "../utils/multer"
import { PostDto } from "./dto/post.dto"
import { PostService } from "./post.service"

@UseGuards(JwtAuthGuard)
@Controller("post")
export class PostController {
	constructor(private postService: PostService) {}

	@Get("all")
	getAllPosts(@Req() request: IRequest, @Query("cursor") cursor: number) {
		return this.postService.getAllUserPosts(request.user.id, cursor)
	}

	@Put("image")
	@UseInterceptors(
		FileInterceptor("file", {
			storage: multerStorage
		})
	)
	async uploadImage(@UploadedFile() file: Express.Multer.File) {
		const { secure_url } = await cloudinary.upload(file.path, {
			folder: "post"
		})
		return secure_url
	}

	@Post("create")
	createPost(@Body() body: PostDto, @Req() req: IRequest) {
		return this.postService.createPost({ ...body, userId: req.user.id })
	}

	@Patch("toogle-vote")
	togglePost(@Body() body: { postId: number; vote: boolean | null; voteId?: number }, @Req() req: IRequest) {
		if (typeof body.vote === "boolean") {
			return this.postService.tooglePost(body.postId, req.user.id, body.vote, body.voteId)
		} else {
			return this.postService.deleteToogleVote(body.postId, body.voteId, req.user.id)
		}
	}

	@Post("comment")
	comment(@Body() body: { postId: number; comment: string }, @Req() req: IRequest) {
		return this.postService.writeComment({ ...body, userId: req.user.id })
	}

	@Patch("rate")
	rate(@Body() body: { rateId?: number; commentId: number }, @Req() req: IRequest) {
		if (!body.rateId) {
			return this.postService.rateComment({ ...body, userId: req.user.id })
		} else {
			return this.postService.deleteRateComment({ ...body, rateId: body.rateId, userId: req.user.id })
		}
	}
}
