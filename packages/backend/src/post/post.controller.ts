import { Body, Controller, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PostService } from "./post.service";

import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from "../auth/guards";
import { IRequest } from "../types";
import { cloudinary } from "../utils/cloudinary";
import { multerStorage } from "../utils/multer";
import { PostDto } from "./dto/post.dto";


@Controller("post")
@UseGuards(JwtAuthGuard)
export class PostController {
	
	constructor(private postService:PostService){}
	
	@Put("image")
	@UseInterceptors(FileInterceptor('file',{
		storage: multerStorage
	}))
	async uploadImage (@UploadedFile() file: Express.Multer.File) {
		console.log(file)
		const {secure_url} = await cloudinary.upload(file.path,{
			folder:"post"
		})
		return secure_url
	}

	@Post("create")
	createPost(@Body() body:PostDto,@Req() req:IRequest) {
		return this.postService.createPost({...body,userId:req.user.id})
	}

	@Patch("toogle-vote")
	togglePost(@Body() body:{postId:number, vote:boolean | null, voteId?:number},@Req() req:IRequest) {
		if(typeof body.vote === "boolean") {
			return this.postService.tooglePost(body.postId,req.user.id,body.vote,body.voteId)
		}
		else {
			return this.postService.deleteToogleVote(body.postId,body.voteId)
		}
	}

	@Post("comment")
	comment(@Body() body: {postId:number,comment:string},@Req() req:IRequest) {
		return this.postService.writeComment({...body,userId:req.user.id})
	}
	
	@Patch("rate")
	rate(@Body() body:{rateId?:number,commentId:number},@Req() req:IRequest) {
		if(!body.rateId) {
			return this.postService.rateComment({...body,userId:req.user.id})
		} else {
			return this.postService.deleteRateComment({...body,rateId:body.rateId,userId:req.user.id})
		}
	}	
}
