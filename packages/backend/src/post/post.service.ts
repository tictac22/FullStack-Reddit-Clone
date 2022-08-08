import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";


enum PostType {
	USER = "USER",
	SUBREDDIT = "SUBREDDIT",
}
@Injectable()
export class PostService {
	constructor(private prismaService:PrismaService) {

	}

	
	async createPost({title,body,type,userId,subRedditId}:{title:string,body:string,type:PostType,userId:number,subRedditId?:number}) {
		if(type === PostType.USER) {
			return await this.prismaService.post.create({
				data: {
					title,
					text:JSON.parse(body),
					user: {connect:{id:userId}},
				}
			})
		}
		else {
			return await this.prismaService.post.create({
				data: {
					title,
					text:JSON.parse(body),
					subReddit: {connect:{id:subRedditId}},
					user: {connect:{id:userId}},
				}
			})
		}
	}

	async tooglePost(postId:number,userId:number,voteType:boolean,voteId = 0 ) {
		const upVote = {
			increment:1
		}
		const downVote = {
			decrement:1
		}
		return  await this.prismaService.post.update({
			where: {id:postId},
			data: {
				totalVotes: voteType ? upVote : downVote,
				vote: {
					upsert: {
						where: {
							id:voteId,
						},
						create: {
							user: {connect:{id:userId}},
							value:voteType,
						},
						update: {
							value:voteType,
						}
					}
				}
			}
		})
	}
	async deleteToogleVote(postId:number,voteId:number) {
		return await this.prismaService.post.update({
			where: {id:postId},
			data: {
				totalVotes: {
					decrement: 1
				},
				vote: {
					delete: {
						id:voteId
					}
				}
			}
		})
	}
} 