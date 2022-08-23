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
