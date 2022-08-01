import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from './../prisma/prisma.service';


@Injectable()
export class TokenService {
	constructor(private jwtService:JwtService,private prismaService:PrismaService) {}
	async generateTokens(payload:any) { 
		const refreshToken = await this.jwtService.signAsync(payload, {
			secret:process.env.JWT_REFRESH,
			expiresIn:"30d"
		})
		const accessToken = await this.jwtService.signAsync(payload, {
			secret:process.env.JWT_ACCESS,
			expiresIn:"30d"
		})
		return {
			refreshToken,
			accessToken
		}
	}
	async saveTokens({userId,refreshToken}:{userId:number,refreshToken:string}) {
		const tokenData = await this.prismaService.token.findFirst({
			where: {
				userId,
			}
		})
		if(tokenData) {
			const token = await this.prismaService.token.update({
				where: {
					id: tokenData.id,
				},
				data: {
					token:refreshToken,
				}
			})
			return token
		}
		const token = await this.prismaService.token.create({
			data: {
				token:refreshToken,
				userId,
			}
		})
		return token
	}
	validateRefreshToken(refreshToken:string) {
		try {
			const token = this.jwtService.verify(refreshToken, {
				secret:process.env.JWT_REFRESH,
			})
			return token
			
		} catch (error) {
			return null
		}
	}
}