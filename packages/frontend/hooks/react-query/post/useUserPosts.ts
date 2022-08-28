import { PostService } from "@/utils/services"
import { useInfiniteQuery } from "@tanstack/react-query"

export const usePostsUser = (username: string) => {
	const { data, error, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery(
		["user", username],
		async ({ pageParam = null }) => PostService.getPostsUser(username, pageParam),
		{
			enabled: !!username,
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
