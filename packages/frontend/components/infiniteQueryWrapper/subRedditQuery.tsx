import Link from "next/link"
import { useRouter } from "next/router"

import { useCommunityPosts } from "@/hooks/react-query"

import { PostLoader } from "../skeletons/post"
import { InfiniteQueryWrapper } from "./infiniteQueryWrapper"

export const SubRedditQuery = () => {
	const router = useRouter()
	const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useCommunityPosts(
		router.query.subreddit as string
	)
	return (
		<div className="mt-2">
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
				<div className="mt-5 w-full lg:w-[640px] lg:max-w-[640px]">
					<p className="rounded-md bg-white p-3 text-center">
						<Link href={router.asPath + `/submit`}>
							<a>
								Currently there are not posts :( go to{" "}
								<span className="text-cyan-400">create post</span> to create the first post!
							</a>
						</Link>
					</p>
				</div>
			)}
		</div>
	)
}
