import { useRouter } from "next/router"

import ContentLoader from "react-content-loader"
import { TbArrowBigDown, TbArrowBigTop } from "react-icons/tb"

export const PostLoader = (props) => {
	const router = useRouter()
	return (
		<div className="bg-white my-2">
			<div className="flex">
				<div
					className={`w-[40px] max-w-full ${
						router.query.postId ? "bg-white" : "bg-[#f8f9fb]"
					} flex  flex-col items-center`}
				>
					<TbArrowBigTop
						className={`h-[24px] w-[24px] mt-2 text-[#878A8C] cursor-pointer hover:bg-slate-300 hover:text-[#FF4500] `}
					/>
					<p className="w-4 h-4 bg-gray-400 animate-pulse my-2"></p>
					<TbArrowBigDown
						className={`h-[24px] w-[24px] text-[#878A8C] cursor-pointer hover:bg-slate-300 hover:text-[#7193FF] `}
					/>
				</div>
				<ContentLoader
					speed={2}
					width={593.07}
					height={679.29}
					viewBox="0 0 593.07 679.29"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
					{...props}
				>
					<rect x="8" y="8" rx="0" ry="0" width="580" height="24" />
					<rect x="8" y="50" rx="0" ry="0" width="580" height="544" />
					<rect x="8" y="608" rx="0" ry="0" width="580" height="24" />
				</ContentLoader>
			</div>
		</div>
	)
}

// 633 679 skeleton
// 635 679
