import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthSignInDto, AuthSignUpDto } from "./dto/auth.dto";
import { JwtAuthGuard } from './jwt-auth.guard';

import { Request, Response } from "express";

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
	
	@UseGuards(JwtAuthGuard)
	@Get("prisma")
	prisma(@Req() req) {
		const {id} = req.user
		return this.authService.prisma(Number(id))
	}
	@Get("refresh")
	async refresh(@Req() request:Request, @Res({passthrough:true}) response:Response) {
		const {refreshToken} = request.cookies
		const tokens =  await this.authService.refresh(refreshToken)
		response.cookie("refreshToken", tokens.refreshToken)
		return tokens
	}
}