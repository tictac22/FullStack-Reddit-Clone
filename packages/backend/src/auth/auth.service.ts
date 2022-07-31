import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from './../prisma/prisma.service';
import { TokenService } from './../token/token.service';
import { AuthSignInDto, AuthSignUpDto } from './dto/auth.dto';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(private prismaService:PrismaService, private tokenService:TokenService) {}

	async signup(dto:AuthSignUpDto) {
		const hashedPassword = await bcrypt.hash(dto.password, 10)
		try {
			const user = await this.prismaService.user.create({
				data: {...dto, password: hashedPassword},
			})
			const tokens = await this.tokenService.generateTokens({id: user.id})
			await this.tokenService.saveTokens({userId:user.id,refreshToken:tokens.refreshToken})
			return {...tokens,user}

		} catch (e) {
			if(e instanceof Prisma.PrismaClientKnownRequestError) {
				if(e.code === "P2002") {

					const field = e.meta.target[0]
					throw new BadRequestException({
						status: HttpStatus.BAD_REQUEST,
						errors: {
							[field]: {
								message:  ` ${field} is Already exists`
							}
						} 
					})
				}
			}
			throw e
		}
	}
	async signin(dto:AuthSignInDto) {
		
		const user = await this.prismaService.user.findUnique({
			where: {
				email: dto.email
			 },
		})
		if(!user) throw new BadRequestException("email or password is incorrect")
		
		const isValid = await bcrypt.compare(dto.password, user.password)
		if(!isValid) throw new BadRequestException("email or password is incorrect")

		const {refreshToken, accessToken} = await this.tokenService.generateTokens({id: user.id})
		await this.tokenService.saveTokens({userId:user.id,refreshToken})
		
		return {
			user,
			refreshToken,
			accessToken,
		}
	}
	
	async refresh(req) {
		const {user} = req
		const tokens = await this.tokenService.generateTokens({id: user.id})
		await this.tokenService.saveTokens({userId:user.id.id,refreshToken:tokens.refreshToken})
		return {...tokens}
	}

	async socialLogin(req) {
		if (!req.user) throw new BadRequestException("user is required")
		const { email,name } = req.user;
		const user = await this.prismaService.user.findUnique({
			where: {
				email
			}
		})
		let statedUser;
		if(!user) {
			statedUser = await this.prismaService.user.create({
				data: {
					email,
					username: name,
					password:"",
	
				}
			})
		} else {
			statedUser = user
		}
		const tokens = await this.tokenService.generateTokens({id: statedUser.id})
		await this.tokenService.saveTokens({userId:statedUser.id,refreshToken:tokens.refreshToken})
		return {
			...tokens,
			user:statedUser
		}
	  }
}

