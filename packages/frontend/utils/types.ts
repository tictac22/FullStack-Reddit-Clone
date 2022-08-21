export interface Vote {
	id: number
	userId: number
	postId: number
	value: true
}
export interface Comment {
	id: number
	text: string
	createdAt: string
	like: number
	user: {
		id: number
		username: string
	}
}

export interface Like {
	id: number
	commentId: number
	userId: number
}
export interface SubscribedSubReddits {
	subRedditId: number
	subReddit: {
		image: string
		title: string
	}
}
export interface User {
	id: number
	username: string
	email: string
	SubscribedSubReddits: SubscribedSubReddits[]
	subRedditsOwner: {
		ownerId: number
	}[]
	Likes: Like[]
	Vote: Vote[]
	createdAt: string
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
	subReddit: Community
	comments: Comment[]
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
