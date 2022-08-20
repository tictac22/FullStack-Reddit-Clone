import { useEffect, useState } from "react"

import { User } from "@/utils/types"

export const useSibscribeSubReddit = (
	user: User,
	subRedditId: number
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
	const [isSubscribed, setIsSubscribed] = useState(false)

	useEffect(() => {
		setIsSubscribed(!!user?.SubscribedSubReddits.some((item) => item.subRedditId === subRedditId))
	}, [user, subRedditId])

	return [isSubscribed, setIsSubscribed]
}

export const useLikeComment = (
	user: User,
	commentId: number
): [boolean, React.Dispatch<React.SetStateAction<boolean>>, { id: number }] => {
	const [isSubscribed, setIsSubscribed] = useState(false)
	const [likeData, setLikeData] = useState({ id: 0 })
	useEffect(() => {
		const like = user?.Likes.filter((item) => item.commentId === commentId)[0]
		setIsSubscribed(!!like)
		setLikeData(like)
	}, [user, commentId])

	return [isSubscribed, setIsSubscribed, likeData]
}

export const useVote = (
	user: User,
	postId: number
): [boolean | null, React.Dispatch<React.SetStateAction<boolean>>, { id: number }] => {
	const [vote, setVote] = useState<boolean | null>(null)
	const [voteData, setVoteData] = useState({ id: 0 })
	useEffect(() => {
		const vote = user?.Vote.filter((item) => item.postId === postId)[0]
		setVote(vote?.value ?? null)
		setVoteData(vote)
	}, [user, postId, voteData])

	return [vote, setVote, voteData]
}
