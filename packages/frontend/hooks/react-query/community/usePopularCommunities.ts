import { CommunityService } from "@/utils/services"
import { useQuery } from "@tanstack/react-query"

export const usePopularCommunities = () => {
	const { data, error, isLoading } = useQuery(["communities"], () => CommunityService.getPopularCommunities(), {})
	return {
		data,
		error,
		isLoading
	}
}
