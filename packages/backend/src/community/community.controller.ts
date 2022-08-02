import { Body, Controller, Patch, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards";
import { CommunityService } from './community.service';
import { CommunityDto } from './dto/community.dto';

import { FilesInterceptor } from "@nestjs/platform-express";
import { IRequest } from "../types";
import multer = require("multer");

import { v4 as uuidv4 } from 'uuid';

import * as fs from "fs";
import * as path from "path";

@Controller("community")
@UseGuards(JwtAuthGuard)
export class CommunityController {

	constructor(private communityService:CommunityService){}
	@Post("create")
	createCommunity(@Body() body:CommunityDto,@Req() req:IRequest) {
		return this.communityService.createCommunity({...body,id:req.user.id})
	}

	@Put("image")
	@UseInterceptors(FilesInterceptor('file',1,{
		storage: multer.diskStorage({
			filename: (req, file, cb) => {
				const name = uuidv4() + file.originalname
				cb(null, name);
			},
			destination: (req, file, cb) => {
				console.log(__dirname)
				const folderPath = path.resolve(__dirname,"./uploads/community")
				fs.mkdirSync(folderPath, { recursive: true })
				cb(null, folderPath);
			}
		})
	}))
	updateCommunityImage(@UploadedFiles() files: Express.Multer.File, @Body() body:{id:number}) {
		return this.communityService.updateImage(Number(body.id),files[0].filename)
	}
	
	@Patch("subscription")
	toogleSubscription(@Req() req:IRequest, @Body() body:{id:number,subscriped:boolean}) {
		return this.communityService.toogleSubscription(Number(body.id),Number(req.user.id),body.subscriped)
	}
}