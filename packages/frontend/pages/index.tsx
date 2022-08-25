import Link from "next/link"

import { FormPost } from "@/components/FormPost"
import { Aside } from "@/components/aside"
import { InfiniteQueryWrapper } from "@/components/infiniteQueryWrapper"
import { PostLoader } from "@/components/skeletons/post"
import { UseGetAllPost } from "@/hooks/react-query"
import { useZustandStore } from "@/utils/zustand"

const Home = () => {
	const isAuthenticated = useZustandStore((state) => state.isAuthenticated)
	const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = UseGetAllPost(isAuthenticated)
	return (
		<div className="container">
			<div className="flex">
				<Aside />
				<div className="order-first flex-grow lg:mr-7 flex-auto lg:flex-initial">
					<div className="lg:max-w-[640px]">
						<FormPost />
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
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
