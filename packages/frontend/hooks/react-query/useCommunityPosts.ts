import { QueryService } from "@/utils/queryService"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useCommunityPosts = (title: string) => {
	const { data, error, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery(
		["allPosts", title],
		async ({ pageParam = null }) => QueryService.getPostsCommunity(title, pageParam),
		{
			enabled: !!title,
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
