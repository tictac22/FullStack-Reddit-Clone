export const includeQueryPrisma = {
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

export const includeCommentQueryPrisma = (id) => {
	return {
		likes: {
			where: {
				user: {
					id
				}
			}
		}
	}
}

export const selectUserPostQuery = {
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

export const includeUserPost = {
	select: {
		id: true,
		username: true,
		createdAt: true
	}
}

export const communityPostQuery = (title: string) => {
	return {
		where: {
			subReddit: {
				title
			}
		},
		take: 20,
		include: includeQueryPrisma
	}
}

export const getAllPostsQuery = (id: null) => {
	return {
		where: {
			NOT: {
				subRedditId: id
			}
		},
		take: 20,

		include: includeQueryPrisma
	}
}

export const getAllUserPostsQuery = (userId: number) => ({
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
		}
	},
	take: 20,
	include: includeQueryPrisma
})
