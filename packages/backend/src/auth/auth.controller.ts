import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthSignInDto, AuthSignUpDto } from "./dto/auth.dto";

import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { JwtRtGuard } from "./guards";

@Controller("auth")
export class AuthController {

	constructor(private authService: AuthService) {}

	
	@Post("signup")
	async signup(@Body() body:AuthSignUpDto, @Res({passthrough:true}) res:Response) {
		const userData = await this.authService.signup(body)
		res.cookie("refreshToken", userData.refreshToken)
		return userData
	}
	
	@Post("signin")
	async signin(@Body() body:AuthSignInDto, @Res({passthrough:true}) res:Response) {
		const userData = await this.authService.signin(body)
		res.cookie("refreshToken", userData.refreshToken)
		return userData
	}


	@Get("google")
	@UseGuards(AuthGuard('google'))
	async googleAuth() {
		return 
	}
  
	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	async googleAuthRedirect(@Req() req,@Res({passthrough:true}) res:Response) {
	  const data = await this.authService.socialLogin(req)
	  res.cookie("refreshToken", data.refreshToken)
	  return res.redirect(`${process.env.FRONTEND_BASE_URL}/account/success`)
	}
	
	@Get("twitter")
	@UseGuards(AuthGuard('twitter'))
	async twitterAuth() {
		return 
	}
  
	@Get('twitter/callback')
	@UseGuards(AuthGuard('twitter'))
	async twitterAuthRedirect(@Req() req,@Res({passthrough:true}) res:Response) {
		const data = await this.authService.socialLogin(req)
		res.cookie("refreshToken", data.refreshToken)
		return res.redirect(`${process.env.FRONTEND_BASE_URL}/account/success`)
	}
	
	@UseGuards(JwtRtGuard)
	@Get("refresh")
	async refresh(@Req() req:Request, @Res({passthrough:true}) res:Response) {
		const userData =  await this.authService.refresh(req)
		res.cookie("refreshToken", userData.refreshToken)
		return {...userData}
	}

	@Get("logout")
	async logout(@Res({passthrough:true}) res:Response) {
		res.clearCookie("refreshToken")
		return {
			message: "logout success"
		}
	}
}