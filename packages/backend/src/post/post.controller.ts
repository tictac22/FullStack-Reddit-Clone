import { Body, Controller, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import "multer";
import { PostService } from "./post.service";

import { FileInterceptor } from '@nestjs/platform-express';
import multer = require("multer");


import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from 'uuid';

import { JwtAuthGuard } from "../auth/guards";
import { IRequest } from "../types";
import { PostDto } from "./dto/post.dto";
const folderPath = path.resolve(__dirname,"./uploads/posts")
@Controller("post")
@UseGuards(JwtAuthGuard)
export class PostController {
	
	constructor(private postService:PostService){}
	
	@Put("image")
	@UseInterceptors(FileInterceptor('file',{
		storage: multer.diskStorage({
			filename: (req, file, cb) => {
				const name = uuidv4() + "." + file.mimetype.split('/')[1];
				cb(null, name);
			},
			destination: (req, file, cb) => {
				fs.mkdirSync(folderPath, { recursive: true })
				cb(null,folderPath);
			}
		})
	}))
	uploadImage (@UploadedFile() file: Express.Multer.File) {
		return file
	}


	@Post("create")
	createPost(@Body() body:PostDto,@Req() req:IRequest) {
		return this.postService.createPost({...body,userId:req.user.id})
	}
}