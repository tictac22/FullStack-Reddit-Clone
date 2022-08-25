import { useRouter } from "next/router"

import { $api } from "@/utils/axios"
import { useZustandStore } from "@/utils/zustand"
import { useQueryClient } from "@tanstack/react-query"

interface Props {
	subredditId: number
	setIsSubscribed?: React.Dispatch<React.SetStateAction<boolean>>
	isAuthenticated?: boolean
}

export const UnSubscribeButton: React.FC<Props> = ({ subredditId, setIsSubscribed }) => {
	const { user, setUser } = useZustandStore((state) => ({ user: state.user, setUser: state.setUser }))
	const unsubscribe = async (e) => {
		e.preventDefault()
		const { data } = await $api("community/unsubscribe", {
			method: "PATCH",
			data: {
				subRedditId: subredditId
			}
		})
		setIsSubscribed && setIsSubscribed(false)

		const newSubscribedArray = user.SubscribedSubReddits.filter((sub) => sub.subRedditId !== data.community.id)
		const newUser = {
			...user,
			SubscribedSubReddits: newSubscribedArray
		}
		setUser(newUser)
	}
	return (
		<button
			className="btn-primary w-full self-start px-8 py-0 flex items-center justify-center"
			onClick={(e) => unsubscribe(e)}
		>
			Joined
		</button>
	)
}
export const SubscribeButton: React.FC<Props> = ({ subredditId, setIsSubscribed }) => {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { user, setUser, isAuthenticated } = useZustandStore((state) => ({
		setUser: state.setUser,
		user: state.user,
		isAuthenticated: state.isAuthenticated
	}))
	const subscribe = async (e) => {
		e.preventDefault()
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

		const newUser = {
			...user,
			SubscribedSubReddits: [...user.SubscribedSubReddits, response.data.subscribedUsers]
		}
		setUser(newUser)
		setIsSubscribed && setIsSubscribed(true)
		queryClient.invalidateQueries(["allPosts"])
	}
	return (
		<button className="btn-secondary w-full self-start px-8 py-0" onClick={(e) => subscribe(e)}>
			Join
		</button>
	)
}
