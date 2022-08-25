import { Body, Controller, Get, Post, Query } from "@nestjs/common"

import { CommunityService } from "./community.service"

@Controller("communityP")
export class CommunityP {
	constructor(private communityService: CommunityService) {}

	@Get()
	getCommunity(@Query("title") title, @Query("cursor") cursor: number) {
		return this.communityService.getCommunity(title, cursor)
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
