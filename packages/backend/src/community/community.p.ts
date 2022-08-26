import { Body, Controller, Get, Post, Query } from "@nestjs/common"

import { CommunityService } from "./community.service"

@Controller("communityP")
export class CommunityP {
	constructor(private communityService: CommunityService) {}

	@Get("info")
	getCommunityInfo(@Query("title") title) {
		return this.communityService.getCommunityInfo(title)
	}
	@Get("popular-all")
	getPopularCommunitiesAll() {
		return this.communityService.getPopularCommunitiesAll()
	}

	@Get("popular")
	getPopularCommunities() {
		return this.communityService.getPopularCommunities()
	}

	@Post("bytitle")
	getCommunityByTitle(@Body() body: { title: string }) {
		return this.communityService.getCommunityByTitle(body.title)
	}
}
