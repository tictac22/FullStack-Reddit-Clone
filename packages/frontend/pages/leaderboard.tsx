import { GetStaticProps } from "next"

import { LeaderBoardList } from "@/components/leaderboard/leaderboardList"
import { API_URL } from "@/utils/axios"
import { Community } from "@/utils/types"

type Props = {
	subReddits: Community[]
}
const LeaderBoard = ({ subReddits }: Props) => {
	return (
		<div>
			<div className="bg-white border-t border-t-[#e4e7ec]">
				<div className="container ">
					<h1 className=" text-2xl text-black">Today&apos;s Top Growing Communities</h1>
					<h2 className=" text-xs mt-1 text-[#7c7c7c]">
						Browse Reddit&apos;s top growing communities. Find the top communities in your favorite
						category.
					</h2>
				</div>
			</div>
			<div className="md:container">
				<div className="md:max-w-[646px] m-auto">
					<div className="bg-[#f6f7f8] text-black border-b-[thin] border-b-[#edeff1] p-2">
						<h3>Today&apos;s Top Growing Communities</h3>
					</div>
					<LeaderBoardList subReddits={subReddits} />
				</div>
			</div>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const request = await fetch(API_URL + "/communityP/popular-all")
	const response = await request.json()

	return {
		props: {
			subReddits: response
		}
	}
}
export default LeaderBoard
