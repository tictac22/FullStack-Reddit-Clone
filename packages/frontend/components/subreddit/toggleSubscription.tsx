import { useRouter } from "next/router"

import { $api } from "@/utils/axios"

interface Props {
	subredditId: number
	setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>
	isAuthenticated?: boolean
}
export const UnSubscribeButton: React.FC<Props> = ({ subredditId, setIsSubscribed }) => {
	const unsubscribe = async () => {
		await $api("community/unsubscribe", {
			method: "PATCH",
			data: {
				subRedditId: subredditId
			}
		})
		setIsSubscribed(false)
	}
	return (
		<button className="btn-primary ml-4 self-start px-8 py-0" onClick={unsubscribe}>
			Joined
		</button>
	)
}

export const SubscribeButton: React.FC<Props> = ({ subredditId, setIsSubscribed, isAuthenticated }) => {
	const router = useRouter()
	const subscribe = async () => {
		if (!isAuthenticated) {
			router.push("/account/login")
			return
		}
		await $api("community/subscribe", {
			method: "PATCH",
			data: {
				subRedditId: subredditId
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
