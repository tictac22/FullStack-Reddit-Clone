import { memo } from "react"

import { Community } from "@/utils/types"

import { ImageWrapper } from "../imageWrapepr"
import { SubscribeButton, UnSubscribeButton } from "../toggleSubscription"

type Props = {
	subReddit: Community
	index: number
	subscribed: boolean
}
export const LeaderBoardItem = memo(
	({ subReddit, index, subscribed }: Props) => {
		return (
			<div className="flex items-center border-b-[thin] border-b-[#edeff1] p-2 bg-white px-6">
				<span className="font-medium text-black">{++index}</span>
				<div className=" ml-10">
					<ImageWrapper width={40} heigth={40} image={subReddit.image} title={subReddit.title} />
				</div>
				<p className="text-[#1c1c1c] ml-2">r/{subReddit.title}</p>
				<div className="ml-auto max-w-[96px]">
					{subscribed ? (
						<UnSubscribeButton subredditId={subReddit.id} />
					) : (
						<SubscribeButton subredditId={subReddit.id} />
					)}
				</div>
			</div>
		)
	},
	(prevProps, nextProps) => {
		if (prevProps.subscribed === nextProps.subscribed) return true
		return false
	}
)
