import { useRouter } from "next/router"

import { useAuth } from "@/hooks/useAuth"
import { $api } from "@/utils/axios"

interface Props {
	subredditId: number
	setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>
	isAuthenticated?: boolean
}
export const UnSubscribeButton: React.FC<Props> = ({ subredditId, setIsSubscribed }) => {
	const { setUser } = useAuth()
	const unsubscribe = async () => {
		const { data } = await $api("community/unsubscribe", {
			method: "PATCH",
			data: {
				subRedditId: subredditId
			}
		})
		setIsSubscribed(false)

		setUser((prev) => {
			const newSubscribedArray = prev.SubscribedSubReddits.filter((sub) => sub.subRedditId !== data.community.id)
			return {
				...prev,
				SubscribedSubReddits: newSubscribedArray
			}
		})
	}
	return (
		<button
			className="btn-primary ml-4 self-start px-8 py-0 max-w-[96px] flex items-center justify-center"
			onClick={unsubscribe}
		>
			Joined
		</button>
	)
}
export const SubscribeButton: React.FC<Props> = ({ subredditId, setIsSubscribed, isAuthenticated }) => {
	const router = useRouter()
	const { setUser } = useAuth()
	const subscribe = async () => {
		if (!isAuthenticated) {
			router.push("/account/login")
			return
		}
		const response = await $api("community/subscribe", {
			method: "PATCH",
			data: {
				subRedditId: subredditId
			}
		})
		setUser((prev) => {
			return {
				...prev,
				SubscribedSubReddits: [...prev.SubscribedSubReddits, response.data.subscribedUsers]
			}
		})

		setIsSubscribed(true)
	}
	return (
		<button className="btn-secondary ml-4 self-start px-8 py-0" onClick={subscribe}>
			Join
		</button>
	)
}
