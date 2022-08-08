import { QueryService } from "@/utils/queryService"
import { useQuery } from "@tanstack/react-query"

export const usePopularCommunities = () => {
	const { data, error } = useQuery(["communities"], () => QueryService.getPopularCommunities(), {
		retry: false
	})
	return {
		data,
		error
	}
}
