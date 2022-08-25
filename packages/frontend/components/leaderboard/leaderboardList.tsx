import { Community } from "@/utils/types"
import { useZustandStore } from "@/utils/zustand"

import { LeaderBoardItem } from "./leaderboardItem"

type Props = {
	subReddits: Community[]
}
export const LeaderBoardList = ({ subReddits }: Props) => {
	const userSubscribes = useZustandStore((state) => state.user?.SubscribedSubReddits)
	return (
		<>
			{subReddits.map((item, index) => (
				<LeaderBoardItem
					key={item.id}
					index={index}
					subReddit={item}
					subscribed={!!userSubscribes?.some((subReddit) => subReddit.subRedditId === item.id)}
				/>
			))}
		</>
	)
}
