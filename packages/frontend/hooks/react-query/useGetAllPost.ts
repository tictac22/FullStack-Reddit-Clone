import { QueryService } from "@/utils/queryService"
import { useQuery } from "@tanstack/react-query"

export const UseGetAllPost = (isAuthenicated: boolean | null) => {
	const convertAuthenticated = isAuthenicated === null ? false : true

	const { data, error, isLoading } = useQuery(
		["allPosts", isAuthenicated],
		() => QueryService.getAllPosts(isAuthenicated),
		{
			enabled: convertAuthenticated
		}
	)
	return {
		data,
		error,
		isLoading
	}
}
