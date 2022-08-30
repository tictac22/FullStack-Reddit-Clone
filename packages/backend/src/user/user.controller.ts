import { Controller, Get, Query, Res } from "@nestjs/common"

import { UserService } from "./user.service"

import { Response } from "Express"
@Controller("user")
export class UserController {
	constructor(private userService: UserService) {}

	@Get("test")
	test(@Res() res: Response) {
		return res.json({ hello: "hello" })
	}
	@Get("info")
	getUserInfo(@Query("username") username) {
		return this.userService.getUserInfo(username)
	}

	@Get("posts")
	getUserPosts(@Query("username") username, @Query("cursor") cursor: number) {
		return this.userService.getUserPosts(username, cursor)
	}
}
