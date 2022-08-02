import { Controller, Post, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import "multer";
import { PostService } from "./post.service";

import { FilesInterceptor } from '@nestjs/platform-express';
import multer = require("multer");

@Controller("post")
//@UseGuards(JwtAuthGuard)
export class PostController {
	
	constructor(private postService:PostService){}


	@Post("create")
	@UseInterceptors(FilesInterceptor('files',10,{
		storage: multer.diskStorage({
			filename: (req, file, cb) => {
				cb(null, file.originalname);
			},
			destination: (req, file, cb) => {
				cb(null, './uploads');
			}
		})
	}))
	async createPost (@Req()req,  @UploadedFiles() files: Express.Multer.File[]) {
		console.log(req.body,files)
		return await this.postService.createPost();
	}
}