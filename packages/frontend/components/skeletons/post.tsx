import { useRouter } from "next/router"

import ContentLoader from "react-content-loader"
import { TbArrowBigDown, TbArrowBigTop } from "react-icons/tb"

export const PostLoader = (props) => {
	const router = useRouter()
	return (
		<div className="my-2 flex-auto bg-white  dark:bg-dark-100 lg:w-[640px] lg:flex-initial">
			<div className="flex">
				<div
					className={`w-[40px] max-w-full ${
						router.query.postId ? "bg-white dark:bg-dark-100" : "bg-[#f8f9fb]   dark:bg-dark-100"
					} flex  flex-col items-center`}
				>
					<TbArrowBigTop
						className={`mt-2 h-[24px] w-[24px] cursor-pointer text-[#878A8C] hover:bg-slate-300 hover:text-[#FF4500] `}
					/>
					<p className="my-2 h-4 w-4 animate-pulse bg-gray-400"></p>
					<TbArrowBigDown
						className={`h-[24px] w-[24px] cursor-pointer text-[#878A8C] hover:bg-slate-300 hover:text-[#7193FF] `}
					/>
				</div>
				<div className="flex   w-full justify-center">
					<ContentLoader
						speed={2}
						width={593.07}
						height={679.29}
						viewBox="0 0 593.07 679.29"
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb"
						{...props}
						style={{ width: "100%", height: "100%" }}
					>
						<rect x="8" y="8" rx="0" ry="0" width="580" height="24" />
						<rect x="8" y="50" rx="0" ry="0" width="580" height="544" />
						<rect x="8" y="608" rx="0" ry="0" width="580" height="24" />
					</ContentLoader>
				</div>
			</div>
		</div>
	)
}
