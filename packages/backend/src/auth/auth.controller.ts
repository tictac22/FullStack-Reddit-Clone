import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Response } from "express"
import { IRequest } from "../types"

import { AuthService } from "./auth.service"
import { AuthSignInDto, AuthSignUpDto } from "./dto/auth.dto"
import { JwtAuthGuard } from "./guards"

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("signup")
	async signup(@Body() body: AuthSignUpDto, @Res({ passthrough: true }) res: Response) {
		const userData = await this.authService.signup(body)
		res.cookie("refreshToken", userData.refreshToken, cookieOptions)
		return userData
	}

	@Post("signin")
	async signin(@Body() body: AuthSignInDto, @Res({ passthrough: true }) res: Response) {
		const userData = await this.authService.signin(body)
		res.cookie("refreshToken", userData.refreshToken, cookieOptions)
		return userData
	}

	@Get("google")
	@UseGuards(AuthGuard("google"))
	async googleAuth() {
		return
	}

	@Get("google/callback")
	@UseGuards(AuthGuard("google"))
	async googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
		const data = await this.authService.socialLogin(req)
		res.cookie("refreshToken", data.refreshToken, cookieOptions)
		return res.redirect(`${process.env.FRONTEND_BASE_URL}/account/success`)
	}

	@Get("twitter")
	@UseGuards(AuthGuard("twitter"))
	async twitterAuth() {
		return
	}

	@Get("twitter/callback")
	@UseGuards(AuthGuard("twitter"))
	async twitterAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
		const data = await this.authService.socialLogin(req)
		res.cookie("refreshToken", data.refreshToken, cookieOptions)
		return res.redirect(`${process.env.FRONTEND_BASE_URL}/account/success`)
	}

	@Get("refresh")
	@UseGuards(JwtAuthGuard)
	async refresh(@Req() req: IRequest, @Res({ passthrough: true }) res: Response) {
		const userData = await this.authService.refresh(req.user.id)
		res.cookie("refreshToken", userData.refreshToken, cookieOptions)
		return { ...userData }
	}

	@Get("logout")
	async logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie("refreshToken")
		return {
			message: "logout success"
		}
	}
}
const cookieOptions = { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 }
