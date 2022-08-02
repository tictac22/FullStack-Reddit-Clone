import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CommunityServiceDto } from './dto/community.dto';



@Injectable()
export class CommunityService {

	constructor(private prismaService:PrismaService){}
	async createCommunity(community:CommunityServiceDto) {
		const communityData = await this.prismaService.subReddit.create({
			data: {
				title: community.title,
				owner: {
						connect: {
							id:community.id
						}
				},
			}
		})
		return communityData
	}
	async updateImage(id:number,imagePath:string) {
		const community = await this.prismaService.subReddit.update({
			where: {
				id
			},
			data: {
				image: imagePath
			}
		})
		return community
	}
	async toogleSubscription(id:number,userId:number,subscriped:boolean) {
		const increment = {
			increment:1
		}
		const decrement = {
			decrement:1
		}
		const community = await this.prismaService.subReddit.update({
			where: {
				id
			},
			data: {
				subscribers: subscriped ? decrement : increment

			}
		})
		if(subscriped) {
			//
		}
		const subscribedSubReddits = await this.prismaService.subscribedSubReddits.create({
			data: {
				user: {
					connect: {
						id:userId
					}
				},
				subReddit: {
					connect: {
						id
					}
				}
			}
		})
		console.log(subscribedSubReddits.subRedditId)
		return {community,subscribedSubReddits}
	}
}