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
export const PostContent: React.FC<Props> = (props) => {
	const isImage = (JSON.parse(props.text) as string).includes("img") || !!props.routerPostid
	return (
		<div className="bg-white flex-shrink-[36] px-2 w-full">
			<div className="ml-2 mt-2 text-gray-400 flex item-center flex-wrap">
				{props.children}
				Posted by{" "}
				<Link href={`/user/${props.username}`}>
					<span className="hover:underline cursor-pointer mx-1">u/{props.username}</span>
				</Link>
				{timeAgo(props.createdAt)}
			</div>
			<h3 className="ml-2 font-bold">{props.title}</h3>
			<div
				className={` ${!isImage && "max-h-[250px] overflow-hidden"} textColorBlack `}
				style={{
					WebkitMaskImage: `${!isImage && "linear-gradient(180deg,#000 60%,transparent)"}`,
					maskImage: `${!isImage && "linear-gradient(180deg,#000 60%,transparent)"}`
				}}
			>
				{parse(JSON.parse(props.text))}
			</div>
			<div className="p-3 border-t border-gray-400 mt-3">
				<div
					className={`inline-flex items-center ${
						!props.routerPostid && "hover:bg-slate-300 cursor-pointer"
					} p-2 rounded-lg`}
				>
					<MdOutlineComment className="w-[20px] h-[20px]" />
					<p className="ml-2">{props.countComments} Comments</p>
				</div>
			</div>
		</div>
	)
}
