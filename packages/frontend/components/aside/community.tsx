import Image from "next/image"
import Link from "next/link"

import React, { useState } from "react"

import { SubscribeButton, UnSubscribeButton } from "@/components/toggleSubscription"
import { getFullImagePath } from "@/utils/functions"

interface Props {
	title: string
	image: string
	isSubscribed: boolean
	index: number
	subRedditId: number
	isAuthenticated: boolean
}

export const Community: React.FC<Props> = ({
	title,
	image,
	isSubscribed: userSubscribed,
	index,
	subRedditId,
	isAuthenticated
}) => {
	const [isSubscribed, setIsSubscribed] = useState(userSubscribed)
	return (
		<div className="flex items-center bg-white p-3 border-b border-solid border-[#CBD5E0]  last:border-b-0">
			<p className="mr-5">{index}.</p>
			{image ? (
				<Image
					className="rounded-full"
					width={28}
					height={28}
					src={getFullImagePath(image, "communities")}
					alt="test"
				/>
			) : (
				<div className="rounded-full w-[28px] h-[28px] bg-cyan-400 flex items-center justify-center"> /r </div>
			)}
			<Link href={`/r/${title}`}>
				<div className="ml-2 flex-grow cursor-pointer hover:underline">r/{title}</div>
			</Link>
			{isSubscribed ? (
				<UnSubscribeButton subredditId={subRedditId} setIsSubscribed={setIsSubscribed} />
			) : (
				<SubscribeButton
					subredditId={subRedditId}
					setIsSubscribed={setIsSubscribed}
					isAuthenticated={isAuthenticated}
				/>
			)}
		</div>
	)
}
