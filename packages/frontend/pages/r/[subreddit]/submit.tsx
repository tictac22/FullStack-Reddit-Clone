import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { BiCake } from "react-icons/bi"

import { WithAuth } from "@/components/authentication/withAuth"
import { SubRedditInfoLoader } from "@/components/skeletons/SubRedditInfo"
import { Rules } from "@/components/submitpost/rules"
import { useCommunityInfo } from "@/hooks/react-query"
import { convertDate } from "@/utils/functions"

const DynamicPostForm = dynamic(() => import("@/components/submitpost").then((mod) => mod.PostForm), {
	ssr: false
})
const SubReddit = () => {
	// request to get the community

	const router = useRouter()
	const { data } = useCommunityInfo(router.query.subreddit as string)

	return (
		<div className="container">
			<div className="flex justify-end">
				{data && (
					<DynamicPostForm
						disabled={true}
						data={{ subRedditId: data.id, subRedditTitle: data.title, image: data.image }}
					/>
				)}
				<div className="hidden lg:block mt-3 ml-3">
					{data ? (
						<div className="bg-white rounded mb-3">
							<div className="h-[34px] w-full bg-[#0079D3] rounded-t"></div>
							<div className="p-3">
								<div className="mt-2 flex items-center">
									{data.image ? (
										<Image
											src={data.image}
											alt="test"
											height={54}
											width={54}
											className="rounded-full"
										/>
									) : (
										<div className="w-[54px] h-[54px] border-dashed border border-[#878A8C] rounded-full"></div>
									)}
									<Link href={`/r/${data.title}`}>
										<a className="ml-2 cursor-pointer hover:underline">{data.title}</a>
									</Link>
								</div>
								<div className="mt-2">Welcome to {data.title}</div>
								<p className="my-2">{data.subscribers} Members</p>
								<hr />
								<div className="flex items-center mt-2">
									<BiCake className="w-5 h-5" />
									<p className="ml-2">Created {convertDate(data.createdAt)}</p>
								</div>
							</div>
						</div>
					) : (
						<SubRedditInfoLoader height={237} />
					)}
					<Rules />
				</div>
			</div>
		</div>
	)
}

export default WithAuth(SubReddit)
