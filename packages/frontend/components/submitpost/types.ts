export type Community =
	| { subRedditId: number; subReddit: { title: string; id: number } }
	| string
	| { subRedditId: number; subRedditTitle: string; image?: string }
