import { useSibscribeSubReddit } from "@/hooks/useSibscribe"
import { useZustandStore } from "@/utils/zustand"

import { SubscribeButton, UnSubscribeButton } from "./toggleSubscription"

export const SubscriptionButtons = ({ id = 0 }) => {
	const { userSubscription, isAuthenticated } = useZustandStore((state) => ({
		userSubscription: state.user?.SubscribedSubReddits,
		isAuthenticated: state.isAuthenticated
	}))
	const [isSubscribed] = useSibscribeSubReddit(userSubscription, id)
	return (
		<div>
			{isSubscribed ? (
				<div>
					<UnSubscribeButton subredditId={id} />
				</div>
			) : (
				<div>
					<SubscribeButton subredditId={id} isAuthenticated={isAuthenticated} />
				</div>
			)}
		</div>
	)
}
