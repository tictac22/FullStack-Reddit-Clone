import { GetStaticProps } from "next"
import Link from "next/link"

import { ImageWrapper } from "@/components/imageWrapepr"
import { SubscriptionButtons } from "@/components/subscription"
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
					{subReddits.map((item, index) => (
						<Link key={item.id} href={`/r/${item.title}`}>
							<a>
								<div className="flex items-center border-b-[thin] border-b-[#edeff1] p-2 bg-white px-6">
									<span className="font-medium text-black">{++index}</span>
									<div className=" ml-10 h-[40px]">
										<ImageWrapper width={40} heigth={40} image={item.image} title={item.title} />
									</div>
									<p className="text-[#1c1c1c] ml-2">r/{item.title}</p>
									<div className="ml-auto max-w-[96px]">
										<SubscriptionButtons id={item.id} />
									</div>
								</div>
							</a>
						</Link>
					))}
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
