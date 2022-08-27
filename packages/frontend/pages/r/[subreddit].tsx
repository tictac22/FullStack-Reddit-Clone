import Head from "next/head"
import { useRouter } from "next/router"

import { BiCake } from "react-icons/bi"

import { FormPost } from "@/components/FormPost"
import { SubRedditError } from "@/components/helpersComponents/subRedditError"
import { SubscriptionButtons } from "@/components/helpersComponents/subscribe/subscription"
import { ImageWrapper } from "@/components/imageWrapepr"
import { SubRedditQuery } from "@/components/infiniteQueryWrapper/subRedditQuery"
import { SubRedditInfoLoader } from "@/components/skeletons/SubRedditInfo"
import { UploadImageLoader } from "@/components/skeletons/uploadImage"
import { UploadImage } from "@/components/uploadImage"
import { useCommunityInfo } from "@/hooks/react-query"
import { capitalizeFirstLetter, convertDate } from "@/utils/functions"
import { useZustandStore } from "@/utils/zustand"

const SubReddit = () => {
	const router = useRouter()
	const { error, data } = useCommunityInfo(router.query.subreddit as string)
	const userId = useZustandStore((state) => state.user?.id)
	if (error) return <SubRedditError />
	return (
		<>
			<Head>
				<title>{data?.title}</title>
			</Head>
			<div className="h-[146px]">
				<div className="h-1/2 bg-cyan-600"></div>
				<div className="flex items-center justify-center bg-white">
					<div className="container -mt-[14px] flex py-0">
						<div className="relative h-[66px] w-[66px] rounded-full">
							<ImageWrapper image={data?.image} width={66} heigth={66} title={data?.title} />
						</div>
						<div className="mt-3 flex py-[10px] px-[16px]">
							<div className="mr-2 flex-auto">
								<p className="bold text-xl">{capitalizeFirstLetter(data?.title)}</p>
								<p className="text-[12px] text-gray-400">r/{data?.title}</p>
							</div>
							<SubscriptionButtons id={data?.id} />
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="flex">
					<div className="flex-auto lg:mr-6">
						<FormPost />
						<SubRedditQuery />
					</div>
					<div>
						<div className="hidden w-80 rounded-t bg-white lg:block">
							<div className="rounded-t bg-cyan-600 p-3">
								<h1 className="text-white">About Community</h1>
							</div>
							{data ? (
								<div className="p-3">
									<div className="my-3 flex">
										<p>{data.subscribers} Members</p>
									</div>
									<hr />
									<div className="my-3 flex items-center">
										<BiCake className="mr-3 h-4 w-4" />
										<p>Created {convertDate(data.createdAt)}</p>
									</div>
								</div>
							) : (
								<SubRedditInfoLoader />
							)}
						</div>
						{data ? (
							data.ownerId === userId && (
								<div className="mt-3 hidden w-80 rounded-t bg-white lg:block">
									<div className="rounded-t bg-cyan-600 p-3">
										<h1 className="text-white">Moderators</h1>
									</div>
									<UploadImage subreddit={data.id} />
								</div>
							)
						) : (
							<UploadImageLoader />
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default SubReddit
