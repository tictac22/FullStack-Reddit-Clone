import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from './dto/auth.dto';


@Controller("auth")
export class AuthController {

	constructor(private authService: AuthService) {}

	@Post("signin")
	signin(@Body() body:AuthDto) {
		return this.authService.signin(body)
	}
	@Get("signup")
	signup() {
		return this.authService.signup(	)
	}
	@Get("prisma")
	prisma() {
		return this.authService.prisma()
	}
}