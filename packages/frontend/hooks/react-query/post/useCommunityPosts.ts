import { PostService } from "@/utils/services"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

export const usePostsCommunity = () => {
	const { subreddit } = useRouter().query as { subreddit: string }
	const { data, error, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery(
		["allPosts", subreddit],
		async ({ pageParam = null }) => PostService.getPostsCommunity(subreddit, pageParam),
		{
			enabled: !!subreddit,
			getNextPageParam: (lastPage) => {
				return lastPage.cursor && lastPage.cursor
			}
		}
	)
	return {
		data,
		error,
		isLoading,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage
	}
}
