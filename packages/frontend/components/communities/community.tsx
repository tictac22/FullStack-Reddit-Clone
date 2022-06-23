import Image from "next/image"
import React from "react"
import communityPic from "../../public/communityExample.png"
export const Community: React.FC = () => {
	return (
		<div className="flex items-center bg-white p-3 border-b border-solid border-[#CBD5E0]">
			<p className="mr-5">1.</p>
			<Image className="rounded-full" width={28} height={28} src={communityPic} alt="test" />
			<div className="ml-2 flex-grow">r/gaming</div>
			<button className="text-white bg-cyan-500 px-4 py-1 rounded-full">Join</button>
		</div>
	)
}
