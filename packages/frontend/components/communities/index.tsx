import Image from "next/image"
import React from "react"
import communityPic from "../../public/community.png"
import { Community } from "./community"
export const Communities: React.FC = () => {
	return (
		<div className=" flex-grow-0 flex-shrink basis-[310px]  ">
			<div className="h-[80px] relative flex items-end before:content before:w-full before:h-full before:absolute before:z-[3] before:bg-[#00000042] before:top-0 before:left-0 before:rounded-t">
				<Image
					className="rounded-t"
					height={80}
					width={310}
					layout="fill"
					src={communityPic}
					alt="Top community"
					objectFit="cover"
				/>
				<h3 className="relative pb-2 pl-2 text-white font-semibold z-[4]">Top Communities</h3>
			</div>
			<div>
				<Community />
				<Community />
				<Community />
				<div className="bg-white flex items-center justify-center py-3 px-6 rounded-b">
					<button className="text-white w-full bg-cyan-500 py-1 rounded-xl">View All</button>
				</div>
			</div>
		</div>
	)
}
