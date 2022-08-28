import { Injectable } from "@nestjs/common"

import { PrismaService } from "../prisma/prisma.service"
import {
	communityPostQuery,
	getAllPostsQuery,
	getAllUserPostsQuery,
	includeCommentQueryPrisma,
	includeUserPost,
	selectUserPostQuery
} from "./prismaQuery"

enum PostType {
	USER = "USER",
	SUBREDDIT = "SUBREDDIT"
}
@Injectable()
export class PostService {
	constructor(private prismaService: PrismaService) {}
	async getPost(postId: number) {
		return await this.prismaService.post.findFirst({
			where: { id: postId },
			include: {
				user: includeUserPost,
				subReddit: true,
				comments: {
					orderBy: {
						createdAt: "desc"
					},
					include: {
						user: includeUserPost,
						likes: true
					}
				},
				_count: {
					select: {
						comments: true
					}
				}
			}
		})
	}

	async getCommunityPosts(title: string, cursor: number) {
		let result = null
		if (cursor) {
			result = await this.prismaService.post.findMany({
				...communityPostQuery(title),
				cursor: {
					id: cursor
				},
				skip: 1,
				orderBy: {
					createdAt: "desc"
				}
			})
		} else {
			result = await this.prismaService.post.findMany({
				...communityPostQuery(title),
				orderBy: {
					createdAt: "desc"
				}
			})
		}
		const myCursor = result.length === 20 ? result[result.length - 1].id : null

		return {
			posts: result,
			cursor: myCursor
		}
	}
	async getAllPosts(cursor: number) {
		let result = null
		if (cursor) {
			result = await this.prismaService.post.findMany({
				...getAllPostsQuery(null),
				cursor: {
					id: cursor
				},
				skip: 1,
				orderBy: {
					createdAt: "desc"
				}
			})
		} else {
			result = await this.prismaService.post.findMany({
				...getAllPostsQuery(null),
				orderBy: {
					createdAt: "desc"
				}
			})
		}
		const myCursor = result.length === 20 ? result[result.length - 1].id : null

		return {
			posts: result,
			cursor: myCursor
		}
	}
	async getAllUserPosts(userId: number, cursor: number) {
		let result = null
		if (cursor) {
			result = await this.prismaService.post.findMany({
				...getAllUserPostsQuery(userId),
				cursor: {
					id: cursor
				},
				skip: 1,
				orderBy: {
					createdAt: "desc"
				}
			})
		} else {
			result = await this.prismaService.post.findMany({
				...getAllUserPostsQuery(userId),
				orderBy: {
					createdAt: "desc"
				}
			})
		}
		const myCursor = result.length === 20 ? result[result.length - 1].id : null

		return {
			posts: result,
			cursor: myCursor
		}
	}
	async createPost({
		title,
		body,
		type,
		userId,
		subRedditId
	}: {
		title: string
		body: string
		type: PostType
		userId: number
		subRedditId?: number
	}) {
		if (type === PostType.USER) {
			return await this.prismaService.post.create({
				data: {
					title,
					text: body,
					user: { connect: { id: userId } }
				}
			})
		} else {
			return await this.prismaService.post.create({
				data: {
					title,
					text: body,
					subReddit: { connect: { id: subRedditId } },
					user: { connect: { id: userId } }
				}
			})
		}
	}

	async tooglePost(postId: number, userId: number, voteType: boolean, voteId = 0) {
		const upVote = {
			increment: 1
		}
		const downVote = {
			decrement: 1
		}
		const isToggled = await this.prismaService.vote.findUnique({
			where: {
				id: voteId
			}
		})
		return await this.prismaService.post.update({
			where: { id: postId },
			data: {
				totalVotes:
					isToggled && isToggled.value
						? { decrement: 2 }
						: isToggled && !isToggled.value
						? { increment: 2 }
						: voteType
						? upVote
						: downVote,
				vote: {
					upsert: {
						where: {
							id: voteId
						},
						create: {
							user: { connect: { id: userId } },
							value: voteType
						},
						update: {
							value: voteType
						}
					}
				}
			},
			select: selectUserPostQuery
		})
	}
	async deleteToogleVote(postId: number, voteId: number) {
		const upVote = {
			increment: 1
		}
		const downVote = {
			decrement: 1
		}
		const result = await this.prismaService.vote.findUnique({
			where: {
				id: voteId
			}
		})
		return await this.prismaService.post.update({
			where: { id: postId },
			data: {
				totalVotes: result.value ? downVote : upVote,
				vote: {
					delete: {
						id: voteId
					}
				}
			},
			select: selectUserPostQuery
		})
	}

	async writeComment({ userId, postId, comment }: { userId: number; postId: number; comment: string }) {
		return this.prismaService.comment.create({
			data: {
				text: comment,
				user: { connect: { id: userId } },
				post: { connect: { id: postId } }
			},
			include: {
				user: {
					select: {
						id: true,
						username: true,
						createdAt: true
					}
				},
				likes: true
			}
		})
	}

	async rateComment({ userId, commentId }: { userId: number; commentId: number }) {
		await this.prismaService.comment.update({
			where: { id: commentId },
			data: {
				like: {
					increment: 1
				},
				likes: {
					create: {
						user: { connect: { id: userId } }
					}
				}
			}
		})
		return this.prismaService.user.findUnique({
			...includeCommentQueryPrisma(userId)
		})
	}
	async deleteRateComment({ commentId, rateId, userId }: { commentId: number; rateId: number; userId: number }) {
		await this.prismaService.comment.update({
			where: { id: commentId },
			data: {
				like: {
					decrement: 1
				},
				likes: {
					delete: {
						id: rateId
					}
				}
			}
		})
		return this.prismaService.user.findUnique({
			...includeCommentQueryPrisma(userId)
		})
	}
}
