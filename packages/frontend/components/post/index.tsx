import { useRouter } from "next/router"

import React, { memo, useMemo, useRef, useState } from "react"
import { TbArrowBigDown, TbArrowBigTop } from "react-icons/tb"

import { $api } from "@/utils/axios"
import { objectsEqual } from "@/utils/functions"
import type { Post as PostT } from "@/utils/types"
import { useZustandStore } from "@/utils/zustand"
import shallow from "zustand/shallow"

import { PostContent } from "./postContent"
import { SubRedditInfo } from "./subRedditInfo"

type IProps = PostT & {
	vote?: {
		value: boolean
		id: number
	}
}

export const Post: React.FC<IProps> = memo(
	(props) => {
		const { vote } = props
		const { setVote: setVoteState, isAuthenticated } = useZustandStore(
			(state) => ({
				setVote: state.setVote,
				isAuthenticated: state.isAuthenticated
			}),
			shallow
		)

		const [isVoting, setIsVoting] = useState(false)
		const router = useRouter()
		const toggleVote = (voteToogle: boolean) => async (e) => {
			e.preventDefault()
			if (!isAuthenticated) return router.replace("/account/login")
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

			setVoteState(response.data.user.Vote)

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
				>
					{router.route === "/" ? (
						<SubRedditInfo title={props.subReddit.title} image={props.subReddit.image} />
					) : (
						<></>
					)}
				</PostContent>
			)
			//eslint-disable-next-line
		}, [])
		return (
			<div
				className={` md:min-w-[633px] border border-solid border-[#ccc] ${
					!router.query.postId && "hover:border-[#898989] my-2"
				} ${router.query.postId && "border-b-0"}`}
			>
				<div className="flex ">
					<div
						className={`w-[40px] max-w-full ${
							router.query.postId ? "bg-white" : "bg-[#f8f9fb]"
						} flex  flex-col items-center`}
					>
						<TbArrowBigTop
							className={`h-[24px] w-[24px] mt-2 text-[#878A8C] cursor-pointer hover:bg-slate-300 hover:text-[#FF4500] ${
								props.vote?.value ? "text-[#FF4500] fill-[#ff4500]" : ""
							}`}
							onClick={isVoting ? () => null : toggleVote(true)}
						/>
						<p
							className={`${
								props.vote?.value
									? "text-[#FF4500] fill-[#ff4500]"
									: props.vote?.value === false
									? "text-[#7292ff] fill-[#7292ff]"
									: ""
							}`}
							ref={countRef}
						>
							{props.totalVotes}
						</p>
						<TbArrowBigDown
							className={`h-[24px] w-[24px] text-[#878A8C] cursor-pointer hover:bg-slate-300 hover:text-[#7193FF] ${
								props.vote?.value === false ? "text-[#7292ff] fill-[#7292ff]" : ""
							}`}
							onClick={isVoting ? () => null : toggleVote(false)}
						/>
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
