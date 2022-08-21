import Image from "next/image"

import React from "react"

import { usePopularCommunities } from "@/hooks/react-query/"

import communityPic from "@/public/community.png"

import { CommunityLoader } from "../skeletons/community"
import { Community } from "./community"
import { HomeInfo } from "./homeInfo"

export const Aside: React.FC = () => {
	const { data, isLoading } = usePopularCommunities()
	return (
		<aside className="hidden lg:block">
			<div className="h-[80px] relative flex items-end before:content before:w-full before:h-full before:absolute before:z-[3] before:bg-[#00000042] before:top-0 before:left-0 before:rounded-t">
				<Image
					className="rounded-t"
					layout="fill"
					src={communityPic}
					priority
					alt="Top community"
					objectFit="cover"
				/>
				<h3 className="relative pb-2 pl-2 text-white font-semibold z-[4]">Top Communities</h3>
			</div>
			<div className="">
				{isLoading ? (
					<CommunityLoader />
				) : (
					data.map((item, index) => (
						<Community
							title={item.title}
							image={item.image}
							key={item.title}
							index={index + 1}
							subRedditId={item.id}
						/>
					))
				)}
			</div>
			<div className="bg-white flex items-center justify-center py-3 px-6 rounded-b">
				<button className="btn-secondary w-full">View All</button>
			</div>
			<HomeInfo />
		</aside>
	)
}
