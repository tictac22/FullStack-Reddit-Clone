import { UserService } from "@/utils/services"
import { useQuery } from "@tanstack/react-query"

export const useGetUserReddits = () => {
	const { data, error } = useQuery(["user-reddits"], () => UserService.getUserReddits(), {})
	return {
		data,
		error
	}
}
