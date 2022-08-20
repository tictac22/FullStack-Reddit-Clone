import { QueryService } from "@/utils/queryService"
import { useQuery } from "@tanstack/react-query"

export const usePopularCommunities = () => {
	const { data, error, isLoading } = useQuery(["communities"], () => QueryService.getPopularCommunities(), {})
	return {
		data,
		error,
		isLoading
	}
}
