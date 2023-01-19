import { Controller, Get, Query, Req, Res, UseGuards } from "@nestjs/common"

import { UserService } from "./user.service"

import { Response } from "Express"
import { JwtAuthGuard } from "../auth/guards"
import { IRequest } from "../types"
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

	@Get("users-reddits")
	@UseGuards(JwtAuthGuard)
	getUsersReddits(@Req() req: IRequest) {
		return this.userService.getUsersReddits(req.user.id)
	}
}
