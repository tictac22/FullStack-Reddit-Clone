import Head from "next/head"
import { useRouter } from "next/router"

import { BiCake } from "react-icons/bi"

import { FormPost } from "@/components/FormPost"
import { ImageWrapper } from "@/components/imageWrapepr"
import { SubRedditQuery } from "@/components/infiniteQueryWrapper/subRedditQuery"
import { SubRedditInfoLoader } from "@/components/skeletons/SubRedditInfo"
import { UploadImageLoader } from "@/components/skeletons/uploadImage"
import { SubRedditError } from "@/components/subRedditError"
import { SubscriptionButtons } from "@/components/subscription"
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
					<div className="container flex -mt-[14px] py-0">
						<div className="rounded-full relative w-[66px] h-[66px]">
							<ImageWrapper image={data?.image} width={66} heigth={66} title={data?.title} />
						</div>
						<div className="flex py-[10px] px-[16px] mt-3">
							<div className="mr-2 flex-auto">
								<p className="bold text-xl">{capitalizeFirstLetter(data?.title)}</p>
								<p className="text-gray-400 text-[12px]">r/{data?.title}</p>
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
						<div className="w-80 bg-white rounded-t hidden lg:block">
							<div className="bg-cyan-600 rounded-t p-3">
								<h1 className="text-white">About Community</h1>
							</div>
							{data ? (
								<div className="p-3">
									<div className="flex my-3">
										<p>{data.subscribers} Members</p>
									</div>
									<hr />
									<div className="flex items-center my-3">
										<BiCake className="w-4 h-4 mr-3" />
										<p>Created {convertDate(data.createdAt)}</p>
									</div>
								</div>
							) : (
								<SubRedditInfoLoader />
							)}
						</div>
						{data ? (
							data.ownerId === userId && (
								<div className="w-80 bg-white rounded-t hidden lg:block mt-3">
									<div className="bg-cyan-600 rounded-t p-3">
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
