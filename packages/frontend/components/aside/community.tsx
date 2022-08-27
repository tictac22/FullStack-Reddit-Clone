import Image from "next/image"
import Link from "next/link"

import React from "react"

import { SubscribeButton, UnSubscribeButton } from "@/components/helpersComponents/subscribe/toggleSubscription"
import { useSibscribeSubReddit } from "@/hooks/useSibscribe"
import { useZustandStore } from "@/utils/zustand"
import shallow from "zustand/shallow"

interface Props {
	title: string
	image: string
	index: number
	subRedditId: number
}

export const Community: React.FC<Props> = ({ title, image, index, subRedditId }) => {
	const { SubscribedSubReddits } = useZustandStore(
		(state) => ({
			SubscribedSubReddits: state.user?.SubscribedSubReddits,
			isAuthenticated: state.isAuthenticated
		}),
		shallow
	)

	const [isSubscribed, setIsSubscribed] = useSibscribeSubReddit(SubscribedSubReddits, subRedditId)
	return (
		<div className="flex items-center border-b border-solid border-[#CBD5E0] bg-white p-3  last:border-b-0">
			<p className="mr-5">{index}.</p>
			{image ? (
				<Image className="rounded-full" width={28} height={28} src={image} alt="test" />
			) : (
				<div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-cyan-400"> /r </div>
			)}
			<Link href={`/r/${title}`}>
				<a className="">
					<div className="ml-2  cursor-pointer hover:underline">r/{title}</div>
				</a>
			</Link>
			{isSubscribed ? (
				<div className="ml-auto max-w-[96px]">
					<UnSubscribeButton subredditId={subRedditId} setIsSubscribed={setIsSubscribed} />
				</div>
			) : (
				<div className="ml-auto max-w-[96px]">
					<SubscribeButton subredditId={subRedditId} setIsSubscribed={setIsSubscribed} />
				</div>
			)}
		</div>
	)
}
