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
	async signup(@Body() body:AuthSignUpDto, @Res({passthrough:true}) response:Response) {
		const userData = await this.authService.signup(body)
		response.cookie("refreshToken", userData.refreshToken)
		return userData
	}
	
	@Post("signin")
	async signin(@Body() body:AuthSignInDto, @Res({passthrough:true}) response:Response) {
		const userData = await this.authService.signin(body)
		response.cookie("refreshToken", userData.refreshToken)
		return userData
	}


	@Get("google")
	@UseGuards(AuthGuard('google'))
	async googleAuth() {
		return 
	}
  
	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	async googleAuthRedirect(@Req() req,@Res({passthrough:true}) response:Response) {
	  const data = await this.authService.socialLogin(req)
	  response.cookie("refreshToken", data.refreshToken)
	  return data
	}
	
	@Get("twitter")
	@UseGuards(AuthGuard('twitter'))
	async twitterAuth() {
		return 
	}
  
	@Get('twitter/callback')
	@UseGuards(AuthGuard('twitter'))
	async twitterAuthRedirect(@Req() req,@Res({passthrough:true}) response:Response) {
		const data = await this.authService.socialLogin(req)
	  	response.cookie("refreshToken", data.refreshToken)
	}
	
	@UseGuards(JwtRtGuard)
	@Get("refresh")
	async refresh(@Req() req:Request, @Res({passthrough:true}) response:Response) {
		const tokens =  await this.authService.refresh(req)
		response.cookie("refreshToken", tokens.refreshToken)
		return tokens
	}

	
}