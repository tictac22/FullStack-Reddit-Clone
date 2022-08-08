import { useRef, useState } from "react"
import { MdOutlineComment } from "react-icons/md"
import { TbArrowBigDown, TbArrowBigTop } from "react-icons/tb"

import { $api } from "@/utils/axios"
import { convertDate } from "@/utils/functions"
import type { Post as PostT } from "@/utils/types"
import parse from "html-react-parser"

interface Props extends PostT {
	vote: {
		id: number
		postId: number
		value: true
	} | null
}
export const Post: React.FC<Props> = (props) => {
	const [vote, setVote] = useState<boolean | null>(props.vote?.value ?? null)
	const toggleVote = (voteToogle: boolean) => async () => {
		const currentVote = vote === voteToogle ? null : voteToogle
		setVote(currentVote)
		await $api("/post/toogle-vote", {
			method: "PATCH",
			data: {
				postId: props.id,
				vote: vote === voteToogle ? null : voteToogle,
				voteId: props.vote?.id || 0
			}
		})
		ref.current.innerHTML = `${
			Number(ref.current.innerHTML) +
			(currentVote === null && vote ? -1 : currentVote === null && !vote ? 1 : voteToogle ? 1 : -1)
		}`
	}
	const ref = useRef<HTMLDivElement>()
	return (
		<div className="border border-solid border-[#ccc] rounded">
			<div className="flex ">
				<div className="w-[40px] max-w-full bg-[#f8f9fb] flex  flex-col items-center">
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
						ref={ref}
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
				<div className="bg-white flex-shrink-[36] px-2">
					<p className="ml-2 mt-2 text-gray-400">
						Posted by <span className="hover:underline cursor-pointer"> u/{props.user.username}</span>{" "}
						{convertDate(props.createdAt)}
					</p>
					<h3 className="ml-2">{props.title}</h3>
					<div>{parse(props.text)}</div>
					<div className="p-3 border-t border-gray-400 mt-3">
						<div className="inline-flex items-center hover:bg-slate-300 p-2 rounded-lg cursor-pointer">
							<MdOutlineComment className="w-[20px] h-[20px]" />
							<p className="ml-2">{props._count.comments} Comments</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
