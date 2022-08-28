import { UserService } from "@/utils/services"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

export const useGetUser = () => {
	const { username } = useRouter().query as { username: string }
	const { data, error } = useQuery(["user", username], () => UserService.getUser(username), {
		retry: false,
		enabled: !!username
	})
	return {
		data,
		error
	}
}
