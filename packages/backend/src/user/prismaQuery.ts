export const getUserPostsQuery = (username) => {
	return {
		where: {
			user: {
				username
			}
		},
		include: {
			subReddit: true,
			comments: true,
			user: true,
			_count: {
				select: {
					comments: true
				}
			}
		},
		take: 20
	}
}
