import { Body, Controller, Get, Patch, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards";
import { CommunityService } from './community.service';
import { CommunityDto, CommunityImageDto, CommunitySubscriptionDto } from './dto/community.dto';

import { FilesInterceptor } from "@nestjs/platform-express";
import { IRequest } from "../types";



import { cloudinary } from "../utils/cloudinary";
import { multerStorage } from "../utils/multer";


@Controller("community")
@UseGuards(JwtAuthGuard)
export class CommunityController {

	constructor(private communityService:CommunityService){}

	

	@Get("user")
	getUsersCommunities(@Req() req:IRequest) {
		return this.communityService.getUserCommunity(req.user.id)
	}

	@Post("create")
	createCommunity(@Body() body:CommunityDto,@Req() req:IRequest) {
		return this.communityService.createCommunity(body.title,req.user.id)
	}

	@Put("image")
	@UseInterceptors(FilesInterceptor('file',1,{
		storage:multerStorage
	}))
	async updateCommunityImage(@UploadedFiles() files: Express.Multer.File, @Body() body:CommunityImageDto) {
		const {secure_url} = await cloudinary.upload(files[0].path,{
			folder:"community"
		})
		return this.communityService.updateImage(body.subRedditId,secure_url)
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