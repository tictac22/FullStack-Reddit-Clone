import Link from "next/link"

import { UseGetAllPost } from "@/hooks/react-query"
import { useZustandStore } from "@/utils/zustand"

import { PostLoader } from "../skeletons/post"
import { InfiniteQueryWrapper } from "./infiniteQueryWrapper"

export const HomeQuery = () => {
	const isAuthenticated = useZustandStore((state) => state.isAuthenticated)
	const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = UseGetAllPost(isAuthenticated)
	return (
		<>
			{isLoading ? (
				[...Array(5)].map((item, index) => <PostLoader key={index} />)
			) : data.pages[0].posts.length > 0 ? (
				<InfiniteQueryWrapper
					data={data}
					fetchNextPage={fetchNextPage}
					isFetchingNextPage={isFetchingNextPage}
					hasNextPage={hasNextPage}
				/>
			) : (
				<div className="lg:max-w-[640px] lg:w-[640px] w-full mt-5">
					<p className="bg-white p-3 text-center rounded-md">
						<Link href={"/leaderboard"}>
							<a>
								Currently you don&apos;t subscribe on any subReddit go to check all{" "}
								<span className="text-cyan-400">communities</span>{" "}
							</a>
						</Link>
					</p>
				</div>
			)}
		</>
	)
}
