import { QueryService } from "@/utils/queryService"
import { useQuery } from "@tanstack/react-query"

export const UseGetAllPost = (isAuthenicated: boolean) => {
	const { data, error, isLoading } = useQuery(
		["allPosts", isAuthenicated],
		() => QueryService.getAllPosts(isAuthenicated),
		{
			enabled: !!isAuthenicated
		}
	)
	return {
		data,
		error,
		isLoading
	}
}
