import { QueryService } from "@/utils/queryService"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useCommunity = (title: string) => {
	const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
		["community", title],
		async ({ pageParam = null }) => {
			const response = QueryService.getCommunity(title, pageParam)
			return response
		},
		// 		{
		// 			enabled: convertAuthenticated,
		// 			getNextPageParam: (lastPage) => {
		// 				return lastPage.cursor && lastPage.cursor
		// 			}
		// 		}, {
		{
			retry: false,
			refetchOnWindowFocus: false,
			enabled: !!title,
			getNextPageParam: (lastPage) => {
				return lastPage?.cursor && lastPage.cursor
			}
		}
	)
	return {
		data,
		error,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage
	}
}
// import { QueryService } from "@/utils/queryService"
// import { useInfiniteQuery } from "@tanstack/react-query"

// export const UseGetAllPost = (isAuthenicated: boolean | null) => {
// 	const convertAuthenticated = isAuthenicated === null ? false : true

// 	const { data, error, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery(
// 		["allPosts", isAuthenicated],
// 		async ({ pageParam = 0 }) => QueryService.getAllPosts(isAuthenicated, pageParam),
// 		{
// 			enabled: convertAuthenticated,
// 			getNextPageParam: (lastPage) => {
// 				return lastPage.cursor && lastPage.cursor
// 			}
// 		}
// 	)
// 	return {
// 		data,
// 		error,
// 		isLoading,
// 		isFetchingNextPage,
// 		fetchNextPage,
// 		hasNextPage
// 	}
// }
