import { PostService } from "@/utils/services"
import { useQuery } from "@tanstack/react-query"

export const usePost = (postId: number) => {
	const { data, error, isLoading } = useQuery(["post", postId], () => PostService.getPost(postId), {
		enabled: !!postId
	})
	return {
		data,
		error,
		isLoading
	}
}
