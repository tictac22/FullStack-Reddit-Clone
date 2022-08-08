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
