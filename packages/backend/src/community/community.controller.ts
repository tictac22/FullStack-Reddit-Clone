import { Body, Controller, Get, Param, Patch, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards";
import { CommunityService } from './community.service';
import { CommunityDto, CommunityImageDto, CommunitySubscriptionDto } from './dto/community.dto';

import { FilesInterceptor } from "@nestjs/platform-express";
import { IRequest } from "../types";
import multer = require("multer");

import { v4 as uuidv4 } from 'uuid';

import * as fs from "fs";
import * as path from "path";
const folderPath = path.resolve(__dirname,"./uploads/communities")

@Controller("community")
@UseGuards(JwtAuthGuard)
export class CommunityController {

	constructor(private communityService:CommunityService){}

	@Get(":title")
	getCommunity(@Param("title") title:string) {
		return  this.communityService.getCommunity(title)
	}

	@Post("create")
	createCommunity(@Body() body:CommunityDto,@Req() req:IRequest) {
		return this.communityService.createCommunity(body.title,req.user.id)
	}

	@Put("image")
	@UseInterceptors(FilesInterceptor('file',1,{
		storage: multer.diskStorage({
			filename: (req, file, cb) => {
				fs.readdir(folderPath,(err,files) => {
					const find = files.find(file => file.split(".")[0] === req.body.subRedditId)
					if(find) fs.unlink(folderPath + "/" + find,() => {
						//
					})
				})
				const name = req.body.subRedditId +  "." + uuidv4() + "." + file.mimetype.split('/')[1];
				cb(null, name);
			},
			destination: (req, file, cb) => {
				fs.mkdirSync(folderPath, { recursive: true })
				cb(null, folderPath);
			}
		})
	}))
	updateCommunityImage(@UploadedFiles() files: Express.Multer.File, @Body() body:CommunityImageDto) {
		return this.communityService.updateImage(body.subRedditId,files[0].filename)
	}
	
	@Patch("subscribe")
	subscribe(@Req() req:IRequest, @Body() body:CommunitySubscriptionDto) {
		return this.communityService.subscribe(body.subRedditId, req.user.id)
	}

	@Patch("unsubscribe")
	unsubscribe(@Req() req:IRequest, @Body() body:CommunitySubscriptionDto) {
		return this.communityService.unsubscribe(body.subRedditId, req.user.id)
	}
}