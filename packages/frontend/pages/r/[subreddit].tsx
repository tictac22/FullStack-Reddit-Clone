import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"
import { BiCake } from "react-icons/bi"

import { FormPost } from "@/components/FormPost"
import { Post } from "@/components/post"
import { SubRedditError } from "@/components/subRedditError"
import { SubscribeButton, UnSubscribeButton } from "@/components/toggleSubscription"
import { UploadImage } from "@/components/uploadImage"
import { useCommunity } from "@/hooks/react-query"
import { useAuth } from "@/hooks/useAuth"
import { capitalizeFirstLetter, convertDate } from "@/utils/functions"

import reddit from "@/public/communityexamples/reddit2.png"

const SubReddit = () => {
	const router = useRouter()
	const { error, data } = useCommunity(router.query.subreddit as string)
	const { user, isAuthenticated } = useAuth()
	const [isSubscribed, setIsSubscribed] = useState(false)
	useEffect(() => {
		setIsSubscribed(!!user?.SubscribedSubReddits.some((item) => item.subRedditId === data?.id))
	}, [data?.id, user?.SubscribedSubReddits])
	if (error) return <SubRedditError />
	return (
		<>
			<div className="h-[146px]">
				<div className="h-1/2 bg-cyan-600"></div>
				<div className="flex items-center justify-center bg-white">
					<div className="container flex -mt-[14px] py-0">
						<div className="border-4 border-solid border-white rounded-full relative w-[66px] h-[66px]">
							{data?.image ? (
								<Image
									src={data?.image ? data?.image : reddit.src}
									alt="image"
									layout="fill"
									className="rounded-full object-cover "
								/>
							) : (
								<div className="rounded-full w-full h-full bg-cyan-200 flex items-center justify-center">
									/r
								</div>
							)}
						</div>
						<div className="flex py-[10px] px-[16px] mt-3">
							<div className="mr-2 flex-auto">
								<p className="bold text-xl">{capitalizeFirstLetter(data?.title)}</p>
								<p className="text-gray-400 text-[12px]">r/{data?.title}</p>
							</div>
							<div>
								{isSubscribed ? (
									<div>
										<UnSubscribeButton subredditId={data?.id} setIsSubscribed={setIsSubscribed} />
									</div>
								) : (
									<div>
										<SubscribeButton
											subredditId={data?.id}
											setIsSubscribed={setIsSubscribed}
											isAuthenticated={isAuthenticated}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="flex">
					<div className="flex-auto lg:mr-6">
						<FormPost />
						<div className="mt-2">
							{data?.posts.map((post) => (
								<Link
									href={`${router.asPath}/comments/${post.id}`}
									key={post.id}
									className="cursor-pointer"
								>
									<a>
										<Post {...post} />
									</a>
								</Link>
							))}
						</div>
					</div>
					<div>
						<div className="w-80 bg-white rounded-t hidden lg:block">
							<div className="bg-cyan-600 rounded-t p-3">
								<h1 className="text-white">About Community</h1>
							</div>
							<div className="p-3">
								<div className="flex my-3">
									<p>{data?.subscribers} Members</p>
								</div>
								<hr />
								<div className="flex items-center my-3">
									<BiCake className="w-4 h-4 mr-3" />
									<p>Created {convertDate(data?.createdAt)}</p>
								</div>
							</div>
						</div>
						{data?.owner.id === user?.id && (
							<div className="w-80 bg-white rounded-t hidden lg:block mt-3">
								<div className="bg-cyan-600 rounded-t p-3">
									<h1 className="text-white">Moderators</h1>
								</div>
								<UploadImage subreddit={data?.id} />
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default SubReddit
