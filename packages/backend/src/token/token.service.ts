import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { PrismaService } from "./../prisma/prisma.service"

@Injectable()
export class TokenService {
	constructor(private jwtService: JwtService, private prismaService: PrismaService) {}
	async generateTokens(payload: any) {
		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: process.env.JWT_REFRESH,
			expiresIn: "30d"
		})
		const accessToken = await this.jwtService.signAsync(payload, {
			secret: process.env.JWT_ACCESS,
			expiresIn: "30d"
		})
		return {
			refreshToken,
			accessToken
		}
	}
	async saveTokens({ userId, refreshToken }: { userId: number; refreshToken: string }) {
		const tokenData = await this.prismaService.token.findFirst({
			where: {
				userId
			}
		})
		const user = await this.prismaService.user.findFirst({
			where: {
				id: userId
			},
			include: {
				comments: true,
				posts: true,
				subRedditsOwner: true,
				Vote: true,
				Likes: true,
				SubscribedSubReddits: {
					include: {
						subReddit: {
							select: {
								image: true,
								title: true
							}
						}
					}
				}
			}
		})
		if (tokenData) {
			const token = await this.prismaService.token.update({
				where: {
					id: tokenData.id
				},
				data: {
					token: refreshToken
				}
			})
			return { refreshToken: token.token, user }
		}

		const token = await this.prismaService.token.create({
			data: {
				token: refreshToken,
				userId
			},
			select: {
				token: true
			}
		})
		return { refreshToken: token.token, user }
	}
	validateRefreshToken(refreshToken: string) {
		try {
			const token = this.jwtService.verify(refreshToken, {
				secret: process.env.JWT_REFRESH
			})
			return token
		} catch (error) {
			return null
		}
	}
}
