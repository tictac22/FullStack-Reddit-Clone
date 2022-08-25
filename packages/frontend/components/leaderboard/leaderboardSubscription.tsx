import { useZustandStore } from "@/utils/zustand"

import { SubscribeButton, UnSubscribeButton } from "../toggleSubscription"

type Props = {
	id: number
}
export const Subscription = ({ id }: Props) => {
	const userSubscribes = useZustandStore((state) => state.user?.SubscribedSubReddits)
	const subscribed = !!userSubscribes?.some((subReddit) => subReddit.subRedditId === id)

	return <>{subscribed ? <UnSubscribeButton subredditId={id} /> : <SubscribeButton subredditId={id} />}</>
}
