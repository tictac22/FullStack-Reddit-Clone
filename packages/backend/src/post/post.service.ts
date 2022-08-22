import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

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
				user: {
					select: {
						id: true,
						username: true,
						createdAt: true
					}
				},
				subReddit: true,
				comments: {
					orderBy: {
						createdAt: "desc"
					},
					include: {
						user: {
							select: {
								id: true,
								username: true
							}
						},
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
	async getAllPosts(pageParam) {
		if(!pageParam && pageParam !== 0) return []
		const skip = pageParam * 20

		return this.prismaService.post.findMany({
			where: {
				NOT: {
					subRedditId: null
				}
			},
			skip,
			take:20,
			orderBy: {
				createdAt: "desc"
			},
			include: {
				user: {
					select: {
						id: true,
						username: true,
						createdAt: true
					}
				},
				subReddit: true,
				_count: {
					select: {
						comments: true
					}
				}
			}
		})
	}
	async getAllUserPosts(userId: number,pageParam:number) {
		if(!pageParam && pageParam !== 0) return []
		const skip = pageParam * 20
		return this.prismaService.post.findMany({
			where: {
				NOT: {
					subRedditId: null
				},
				subReddit: {
					subscribedUsers: {
						some: {
							userId
						}
					}
				},
			},
			skip,
			take:20,
			include: {
				_count: {
					select: {
						comments: true
					}
				},
				subReddit: true,
				user: {
					select: {
						id: true,
						username: true,
					}
				}
			},
			orderBy: {
				createdAt: "desc"
			}
		})
		
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
		return await this.prismaService.post.update({
			where: { id: postId },
			data: {
				totalVotes: voteType ? upVote : downVote,
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
			select: {
				user: {
					select: {
						Vote: {
							select: {
								id: true,
								value: true,
								postId: true,
								userId: true
							}
						}
					}
				}
			}
		})
	}
	async deleteToogleVote(postId: number, voteId: number) {
		return await this.prismaService.post.update({
			where: { id: postId },
			data: {
				totalVotes: {
					decrement: 1
				},
				vote: {
					delete: {
						id: voteId
					}
				}
			},
			select: {
				user: {
					select: {
						Vote: {
							select: {
								id: true,
								value: true,
								postId: true,
								userId: true
							}
						}
					}
				}
			}
		})
	}

	async writeComment({ userId, postId, comment }: { userId: number; postId: number; comment: string }) {
		return this.prismaService.comment.create({
			data: {
				text: comment,
				user: { connect: { id: userId } },
				post: { connect: { id: postId } }
			}
		})
	}

	async rateComment({ userId, commentId }: { userId: number; commentId: number }) {
		return this.prismaService.comment.update({
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
			},
			include: {
				likes: {
					where: {
						user: {
							id: userId
						}
					}
				}
			}
		})
	}
	async deleteRateComment({ commentId, rateId, userId }: { commentId: number; rateId: number; userId: number }) {
		return this.prismaService.comment.update({
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
			},
			include: {
				likes: {
					where: {
						user: {
							id: userId
						}
					}
				}
			}
		})
	}
}
