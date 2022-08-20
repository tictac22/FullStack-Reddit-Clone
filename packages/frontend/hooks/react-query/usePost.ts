import { QueryService } from "@/utils/queryService"
import { useQuery } from "@tanstack/react-query"

export const usePost = (postId: number) => {
	const { data, error, isLoading } = useQuery(["post", postId], () => QueryService.getPost(postId), {
		enabled: !!postId
	})
	return {
		data,
		error,
		isLoading
	}
}
