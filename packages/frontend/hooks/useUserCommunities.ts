import { QueryService } from "@/utils/queryService"
import { useQuery } from "@tanstack/react-query"

export const useUserCommunities = () => {
	const { data, error } = useQuery(["community"], () => QueryService.getUserCommunity(), {
		retry: false,
		refetchOnWindowFocus: false
	})
	return {
		data,
		error
	}
}
