import { QueryService } from "@/utils/queryService"
import { useInfiniteQuery } from "@tanstack/react-query"

export const UseGetAllPost = (isAuthenicated: boolean | null) => {
	const convertAuthenticated = isAuthenicated === null ? false : true

	const { data, error, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery(
		["allPosts", isAuthenicated],
		async ({ pageParam = 0 }) => {
			return QueryService.getAllPosts(isAuthenicated, pageParam)
		},
		{
			enabled: convertAuthenticated,
			getNextPageParam: (lastPage) => {
				return lastPage.isNextPage && lastPage.nextPage
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
