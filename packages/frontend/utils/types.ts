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
