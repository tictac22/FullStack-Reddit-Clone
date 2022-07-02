import dynamic from "next/dynamic"
import Image from "next/image"

import React, { useState } from "react"

import homeBanner from "@/public/home-banner.png"
import reddit from "@/public/reddit-home.png"

const DynamicCommunityPopup = dynamic(() => import("@/components/communityPopup").then((mod) => mod.CommunityPopup))

export const HomeInfo: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	const handleModal = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className="mt-4 bg-white rounded-t">
			<div className="relative h-[34px]">
				<Image src={homeBanner} alt="home banner" layout="fill" className="w-full h-full rounded-t" />
			</div>
			<div className="p-3 mt-[-23px]">
				<div className="flex items-end">
					<Image src={reddit} alt="reddit" width={40} height={68} />
					<div className="ml-2 mb-3">Home</div>
				</div>
				<p className="mt-2">
					Your personal Reddit frontpage. Come here to check in with your favorite communities.
				</p>
				<button className="btn-primary w-full mt-1">Create Post</button>
				<button onClick={handleModal} className="btn-secondary w-full mt-2">
					Create Community
				</button>
				{isOpen && (
					<React.Suspense>
						<DynamicCommunityPopup isOpen={isOpen} handleModal={handleModal} />
					</React.Suspense>
				)}
			</div>
		</div>
	)
}
