import { useRouter } from "next/router"

import React, { useRef, useState } from "react"
import { TbArrowBigDown, TbArrowBigTop } from "react-icons/tb"

import { useVote } from "@/hooks/useSibscribe"
import { $api } from "@/utils/axios"
import type { Post as PostT } from "@/utils/types"
import { useZustandStore } from "@/utils/zustand"
import shallow from "zustand/shallow"

import { PostContent } from "./postContent"

export const Post: React.FC<PostT> = (props) => {
	const {
		Vote,
		setVote: setVoteState,
		isAuthenticated
	} = useZustandStore(
		(state) => ({
			Vote: state.user?.Vote,
			setVote: state.setVote,
			isAuthenticated: state.isAuthenticated
		}),
		shallow
	)

	const [vote, setVote, voteData] = useVote(Vote, props.id)
	const [isVote, setIsVote] = useState(false)
	const router = useRouter()
	const toggleVote = (voteToogle: boolean) => async (e) => {
		e.preventDefault()
		if (!isAuthenticated) return router.replace("/account/login")
		if (isVote) return
		setIsVote(true)

		const currentVote = vote === voteToogle ? null : voteToogle
		setVote(currentVote)

		countRef.current.innerHTML = `${
			Number(countRef.current.innerHTML) +
			(currentVote === null && vote ? -1 : currentVote === null && !vote ? 1 : voteToogle ? 1 : -1)
		}`

		const response = await $api("/post/toogle-vote", {
			method: "PATCH",
			data: {
				postId: props.id,
				vote: vote === voteToogle ? null : voteToogle,
				voteId: voteData?.id || 0
			}
		})

		setVoteState(response.data.user.Vote)

		setIsVote(false)
	}
	const countRef = useRef<HTMLDivElement>()
	return (
		<div
			className={` min-w-[633px] border border-solid border-[#ccc] ${
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
							vote ? "text-[#FF4500] fill-[#ff4500]" : ""
						}`}
						onClick={toggleVote(true)}
					/>
					<p
						className={`${
							vote
								? "text-[#FF4500] fill-[#ff4500]"
								: vote === false
								? "text-[#7292ff] fill-[#7292ff]"
								: ""
						}`}
						ref={countRef}
					>
						{props.totalVotes}
					</p>
					<TbArrowBigDown
						className={`h-[24px] w-[24px] text-[#878A8C] cursor-pointer hover:bg-slate-300 hover:text-[#7193FF] ${
							vote === false ? "text-[#7292ff] fill-[#7292ff]" : ""
						}`}
						onClick={toggleVote(false)}
					/>
				</div>
				<PostContent
					title={props.title}
					username={props.user.username}
					createdAt={props.createdAt}
					countComments={props._count.comments}
					text={props.text}
					routerPostid={router.query.postId as string}
				/>
			</div>
		</div>
	)
}
