import { BadRequestException, Injectable } from "@nestjs/common"

import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class CommunityService {
	constructor(private prismaService: PrismaService) {}

	async getCommunity(title: string, cursor: number) {
		let result = null
		const include = {
			user: true,
			_count: {
				select: {
					comments: true
				}
			},
			subReddit: {
				select: {
					title: true
				}
			}
		}
		try {
			if (cursor) {
				result = await this.prismaService.subReddit.findFirstOrThrow({
					where: {
						title: {
							equals: title,
							mode: "insensitive"
						}
					},
					include: {
						owner: true,
						subscribedUsers: true,
						posts: {
							cursor: {
								id: cursor
							},
							skip: 1,
							take: 20,
							include,
							orderBy: {
								createdAt: "desc"
							}
						}
					}
				})
			} else {
				result = await this.prismaService.subReddit.findFirstOrThrow({
					where: {
						title: {
							equals: title,
							mode: "insensitive"
						}
					},
					include: {
						owner: true,
						subscribedUsers: true,
						posts: {
							take: 20,
							include,
							orderBy: {
								createdAt: "desc"
							}
						}
					}
				})
			}
			const myCursor = result.posts.length === 20 ? result.posts[result.posts.length - 1].id : null
			return {
				subReddit: result,
				cursor: myCursor
			}
		} catch (e) {
			throw new BadRequestException("Community not found")
		}
	}
	async getCommunityInfo(title: string) {
		const data = await this.prismaService.subReddit.findUnique({
			where: {
				title
			}
		})
		if (!data) throw new BadRequestException("Community not found")
		return data
	}
	async getPopularCommunities() {
		return this.prismaService.subReddit.findMany({
			orderBy: {
				subscribers: "desc"
			},
			take: 5
		})
	}
	async getPopularCommunitiesAll() {
		return this.prismaService.subReddit.findMany({
			take: 50,
			orderBy: {
				subscribers: "desc"
			}
		})
	}
	async getCommunityByTitle(title: string) {
		return this.prismaService.subReddit.findMany({
			where: {
				title: {
					contains: title,
					mode: "insensitive"
				}
			},
			include: {
				subscribedUsers: true
			}
		})
	}

	async createCommunity(title: string, userId: number) {
		try {
			const communityData = await this.prismaService.subReddit.create({
				data: {
					title: title,
					owner: {
						connect: {
							id: userId
						}
					}
				}
			})
			const subscription = await this.subscribe(communityData.id, userId)
			return { communityData, subscription }
		} catch (error) {
			throw new BadRequestException("Community already exists")
		}
	}
	async updateImage(subRedditId: number, imagePath: string) {
		const community = await this.prismaService.subReddit.update({
			where: {
				id: subRedditId
			},
			data: {
				image: imagePath
			}
		})
		return community
	}
	async subscribe(subRedditId: number, userId: number) {
		const isSubscribed = await this.prismaService.subscribedSubReddits.findMany({
			where: {
				subRedditId,
				AND: {
					userId
				}
			}
		})
		if (isSubscribed.length > 0) {
			return isSubscribed[0]
		}
		const community = await this.prismaService.subReddit.update({
			where: {
				id: subRedditId
			},
			data: {
				subscribers: {
					increment: 1
				}
			}
		})
		const subscribedUsers = await this.prismaService.subscribedSubReddits.create({
			data: {
				subRedditId: subRedditId,
				userId
			}
		})
		return { community, subscribedUsers }
	}
	async unsubscribe(subRedditId: number, userId: number) {
		const community = await this.prismaService.subReddit.update({
			where: {
				id: subRedditId
			},
			data: {
				subscribers: {
					decrement: 1
				}
			}
		})
		const subscribedUsers = await this.prismaService.subscribedSubReddits.deleteMany({
			where: {
				subRedditId,
				AND: {
					userId
				}
			}
		})
		return { community, subscribedUsers }
	}
}
