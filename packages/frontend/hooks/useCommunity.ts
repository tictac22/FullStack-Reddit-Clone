import { QueryService } from "@/utils/queryService"
import { useQuery } from "@tanstack/react-query"

export const useCommunity = (title: string) => {
	const { data, error } = useQuery(["community", title], () => QueryService.getCommunity(title), {
		retry: false,
		refetchOnWindowFocus: false,
		enabled: !!title
	})
	return {
		data,
		error
	}
}
