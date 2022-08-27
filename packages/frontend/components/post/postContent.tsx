import Link from "next/link"

import { MdOutlineComment } from "react-icons/md"

import { timeAgo } from "@/utils/functions"
import parse from "html-react-parser"

interface Props {
	createdAt: string
	text: string
	title: string
	username: string
	countComments: number
	routerPostid: string | undefined
	children?: React.ReactNode
}
// set mask if in index page and doesn't have image
export const PostContent: React.FC<Props> = (props) => {
	const isBigText =
		!(JSON.parse(props.text) as string).includes("img") &&
		!props.routerPostid &&
		(JSON.parse(props.text) as string).length > 800
	return (
		<div className="w-full flex-shrink-[36] bg-white px-2">
			<div className="item-center ml-2 mt-2 flex flex-wrap text-gray-400">
				{props.children}
				Posted by{" "}
				<Link href={`/user/${props.username}`}>
					<span className="mx-1 cursor-pointer hover:underline">u/{props.username}</span>
				</Link>
				{timeAgo(props.createdAt)}
			</div>
			<h3 className="ml-2 font-bold">{props.title}</h3>
			<div
				className={` ${isBigText && "max-h-[250px] overflow-hidden"} textColorBlack `}
				style={{
					WebkitMaskImage: `${isBigText && "linear-gradient(180deg,#000 60%,transparent)"}`,
					maskImage: `${isBigText && "linear-gradient(180deg,#000 60%,transparent)"}`
				}}
			>
				{parse(JSON.parse(props.text))}
			</div>
			<div className="mt-3 border-t border-gray-400 p-3">
				<div
					className={`inline-flex items-center ${
						!props.routerPostid && "cursor-pointer hover:bg-slate-300"
					} rounded-lg p-2`}
				>
					<MdOutlineComment className="h-[20px] w-[20px]" />
					<p className="ml-2">{props.countComments} Comments</p>
				</div>
			</div>
		</div>
	)
}
