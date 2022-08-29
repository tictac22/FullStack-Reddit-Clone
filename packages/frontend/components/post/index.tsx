import { useRouter } from "next/router"

import React, { memo, useMemo, useRef, useState } from "react"
import { TbArrowBigDown, TbArrowBigTop } from "react-icons/tb"

import { $api } from "@/utils/axios"
import { objectsEqual } from "@/utils/functions"
import type { Post as PostT } from "@/utils/types"
import { useZustandStore } from "@/utils/zustand"

import { WithAuthMethods } from "../authentication/withAuthMethods"
import { PostContent } from "./postContent"
import { SubRedditInfo } from "./subRedditInfo"

type IProps = PostT & {
	vote?: {
		value: boolean
		id: number
	}
	path?: string
}

export const Post: React.FC<IProps> = memo(
	(props) => {
		const { vote } = props
		const setVoteState = useZustandStore((state) => state.setVote)
		const [isVoting, setIsVoting] = useState(false)
		const router = useRouter()
		const toggleVote = (cb: () => void, voteToogle: boolean) => async (e) => {
			e.preventDefault()

			const isAuth = cb()
			if (isAuth === null) return

			if (isVoting) return
			setIsVoting(true)

			const currentVote = vote?.value === voteToogle ? null : voteToogle
			countRef.current.innerHTML = `${
				Number(countRef.current.innerHTML) +
				(voteToogle && !vote
					? 1
					: !voteToogle && !vote
					? -1
					: currentVote === null && vote.value
					? -1
					: currentVote === null && !vote.value
					? 1
					: !voteToogle && vote.value
					? -2
					: 2)
			}`

			const response = await $api("/post/toogle-vote", {
				method: "PATCH",
				data: {
					postId: props.id,
					vote: currentVote,
					voteId: vote?.id || 0
				}
			})
			setVoteState(response.data.Vote)

			setIsVoting(false)
		}
		const countRef = useRef<HTMLDivElement>()

		const MemoizedPostContent = useMemo(() => {
			return (
				<PostContent
					title={props.title}
					username={props.user.username}
					createdAt={props.createdAt}
					countComments={props._count.comments}
					text={props.text}
					routerPostid={router.query.postId as string}
					path={props.path}
				>
					{router.route === "/" || (router.route.includes("user") && props.subReddit?.title) ? (
						<SubRedditInfo title={props.subReddit.title} image={props.subReddit.image} />
					) : (
						<></>
					)}
				</PostContent>
			)
		}, [])
		return (
			<div
				className={` border border-solid border-[#ccc]  dark:border-dark-200 md:min-w-[633px] ${
					!router.query.postId && "my-2 hover:border-[#898989] dark:hover:border-[#585a5c]"
				} ${router.query.postId && "border-b-0 dark:border-b-0"}`}
			>
				<div className="flex ">
					<div
						className={`w-[40px] max-w-full ${
							router.query.postId ? "bg-white dark:bg-dark-100" : "bg-[#f8f9fb] dark:bg-dark-300"
						} flex  flex-col items-center`}
					>
						<WithAuthMethods>
							{({ isAuth }) => (
								<div className="mt-1 flex flex-col items-center">
									<TbArrowBigTop
										className={`mt-2 h-[24px] w-[24px] cursor-pointer text-[#878A8C] hover:bg-slate-300 hover:text-[#FF4500] ${
											props.vote?.value ? "fill-[#ff4500] text-[#FF4500]" : ""
										}`}
										onClick={isVoting ? () => null : toggleVote(isAuth, true)}
									/>
									<p
										className={`${
											props.vote?.value
												? "fill-[#ff4500] text-[#FF4500]"
												: props.vote?.value === false
												? "fill-[#7292ff] text-[#7292ff]"
												: "dark:text-white"
										}`}
										ref={countRef}
									>
										{props.totalVotes}
									</p>
									<TbArrowBigDown
										className={`h-[24px] w-[24px] cursor-pointer text-[#878A8C] hover:bg-slate-300 hover:text-[#7193FF] ${
											props.vote?.value === false ? "fill-[#7292ff] text-[#7292ff]" : ""
										}`}
										onClick={isVoting ? () => null : toggleVote(isAuth, false)}
									/>
								</div>
							)}
						</WithAuthMethods>
					</div>
					{MemoizedPostContent}
				</div>
			</div>
		)
	},
	(prevProps, nextProps) => {
		if (prevProps.vote === nextProps.vote) return true
		if (prevProps.vote && nextProps.vote && objectsEqual(prevProps.vote, nextProps.vote)) return true
		return false
	}
)
