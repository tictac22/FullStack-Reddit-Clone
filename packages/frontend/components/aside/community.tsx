import Image from "next/image"
import Link from "next/link"

import React from "react"

import { SubscribeButton, UnSubscribeButton } from "@/components/toggleSubscription"
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
	const { SubscribedSubReddits, isAuthenticated } = useZustandStore(
		(state) => ({
			SubscribedSubReddits: state.user?.SubscribedSubReddits,
			isAuthenticated: state.isAuthenticated
		}),
		shallow
	)
	const [isSubscribed, setIsSubscribed] = useSibscribeSubReddit(SubscribedSubReddits, subRedditId)
	return (
		<div className="flex items-center bg-white p-3 border-b border-solid border-[#CBD5E0]  last:border-b-0">
			<p className="mr-5">{index}.</p>
			{image ? (
				<Image className="rounded-full" width={28} height={28} src={image} alt="test" />
			) : (
				<div className="rounded-full w-[28px] h-[28px] bg-cyan-400 flex items-center justify-center"> /r </div>
			)}
			<Link href={`/r/${title}`}>
				<a className="">
					<div className="ml-2  cursor-pointer hover:underline">r/{title}</div>
				</a>
			</Link>
			{isSubscribed ? (
				<div className="max-w-[96px] ml-auto">
					<UnSubscribeButton subredditId={subRedditId} setIsSubscribed={setIsSubscribed} />
				</div>
			) : (
				<div className="max-w-[96px] ml-auto">
					<SubscribeButton
						subredditId={subRedditId}
						setIsSubscribed={setIsSubscribed}
						isAuthenticated={isAuthenticated}
					/>
				</div>
			)}
		</div>
	)
}
