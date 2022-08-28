import { $api } from "@/utils/axios"
import { useZustandStore } from "@/utils/zustand"
import { useQueryClient } from "@tanstack/react-query"

import { WithAuthMethods } from "../../authentication/withAuthMethods"

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
			className="btn-primary flex w-full items-center justify-center self-start px-8 py-0"
			onClick={(e) => unsubscribe(e)}
		>
			Joined
		</button>
	)
}
export const SubscribeButton: React.FC<Props> = ({ subredditId, setIsSubscribed }) => {
	const queryClient = useQueryClient()
	const { user, setUser } = useZustandStore((state) => ({
		setUser: state.setUser,
		user: state.user
	}))
	const subscribe = async (e, cb: () => void) => {
		e.preventDefault()

		const isAuth = cb()
		if (isAuth === null) return

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
		<WithAuthMethods>
			{({ isAuth }) => (
				<button className="btn-secondary w-full self-start px-8 py-0" onClick={(e) => subscribe(e, isAuth)}>
					Join
				</button>
			)}
		</WithAuthMethods>
	)
}
