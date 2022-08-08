interface Vote {
	id: number
	userId: number
	postId: number
	value: true
}
export interface User {
	id: number
	username: string
	email: string
	SubscribedSubReddits: {
		subRedditId: number
	}[]
	subRedditsOwner: {
		ownerId: number
	}[]
	Vote: Vote[]
}
export interface Post {
	createdAt: string
	id: number
	subRedditId?: number
	text: string
	title: string
	totalVotes: number
	user: User
	userId: number
	_count: {
		comments: number
	}
}
export interface Community {
	id: number
	title: string
	image?: string
	createdAt: string
	owner: {
		id: number
		username: string
	}
	subscribers: number
	posts: Post[]
}

export interface UsersCommunities {
	id: number
	userId: number
	subRedditId: number
	subReddit: {
		id: number
		image: string
		title: string
		subscribers: number
	}
}
