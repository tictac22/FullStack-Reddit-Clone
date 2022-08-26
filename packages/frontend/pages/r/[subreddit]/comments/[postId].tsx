import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { BiCake } from "react-icons/bi"
import { RiCakeLine } from "react-icons/ri"

import { Comment } from "@/components/comments/comment"
import { CommentForm } from "@/components/comments/commentForm"
import { PostWrapper } from "@/components/post/postWrapper"
import { PostLoader } from "@/components/skeletons/post"
import { PostInfoLoader } from "@/components/skeletons/postInfo"
import { SubscriptionButtons } from "@/components/subscription"
import { usePost } from "@/hooks/react-query/"
import { convertDate } from "@/utils/functions"

import UserSvg from "@/public/userImage.svg"

const PostPage = () => {
	const router = useRouter()
	const { data, isLoading } = usePost(Number(router.query.postId))

	return (
		<div className="container">
			<div className="flex">
				{isLoading ? (
					<PostLoader />
				) : (
					<div className="flex-[67%]">
						<PostWrapper {...data} />
						<div className="pl-[48px] pr-2   bg-white border-l border-r border-b border-solid border-[#ccc]">
							<CommentForm postId={data.id} />
							<div className="my-5">
								{data.comments.map((item) => (
									<Comment key={item.id} {...item} />
								))}
							</div>
						</div>
					</div>
				)}
				{data && router.asPath.includes("user") ? (
					<div className="ml-3 max-w-full hidden lg:block w-[312px] border-solid  border-t border-b rounded-t relative h-auto">
						<div className="h-[94px] bg-cyan-800 rounded-t absolute top-0 left-0 w-full "></div>
						<div className="p-3 mt-2 bg-white ">
							<Image src={UserSvg} alt="user" width={80} height={80} className=" bg-[#EDEFF1]" />
							<Link href={`/user/${data.user.username}`} target="_blank">
								<a className="hover:underline block">u/{data.user.username}</a>
							</Link>
							<div className="flex items-center mt-2">
								<BiCake />
								<p className="ml-2">Cake Day {convertDate(data.user.createdAt)}</p>
							</div>
						</div>
					</div>
				) : data?.subReddit ? (
					<div className="ml-3 max-w-full hidden lg:block w-[312px] ">
						<Link href={`/r/${router.query.subreddit}`}>
							<div className="border border-solid border-gray-400 rounded cursor-pointer">
								<div className="bg-cyan-500 text-white p-3 ">About Community</div>
								<div className="bg-white p-3">
									<div className="flex items-center">
										{data.subReddit.image ? (
											<Image
												src={data.subReddit.image}
												alt={data.subReddit.title}
												width={54}
												height={54}
												className="rounded-full"
											/>
										) : (
											<div className="border-dashed border border-[#878A8C] rounded-full w-[54px] h-[54px]"></div>
										)}
										<p className="ml-3">r/{data.subReddit.title}</p>
									</div>
									<div className="mt-2 border-b border-solid border-gray-500 pb-2">
										{data.subReddit?.subscribers} Members
									</div>
									<div className="flex items-center mt-2">
										<RiCakeLine />
										<p className="ml-3">Created {convertDate(data.subReddit.createdAt)}</p>
									</div>
									<div className="mt-3">
										<SubscriptionButtons id={data.subRedditId} />
									</div>
								</div>
							</div>
						</Link>
					</div>
				) : (
					<PostInfoLoader />
				)}
			</div>
		</div>
	)
}

export default PostPage
