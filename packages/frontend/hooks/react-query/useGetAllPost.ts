import { QueryService } from "@/utils/queryService"
import { useQuery } from "@tanstack/react-query"

export const UseGetAllPost = () => {
	const { data, error, isLoading } = useQuery(["allPosts"], () => QueryService.getAllPosts(), {})
	return {
		data,
		error,
		isLoading
	}
}
