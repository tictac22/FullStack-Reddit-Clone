import { Controller, Get, Query } from "@nestjs/common"

import { UserService } from "./user.service"

@Controller("user")
export class UserController {
	constructor(private userService: UserService) {}

	@Get("info")
	getUserInfo(@Query("username") username) {
		return this.userService.getUserInfo(username)
	}

	@Get("posts")
	getUserPosts(@Query("username") username, @Query("cursor") cursor: number) {
		return this.userService.getUserPosts(username, cursor)
	}
}
