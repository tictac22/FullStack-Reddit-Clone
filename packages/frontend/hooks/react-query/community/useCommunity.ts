import { CommunityService } from "@/utils/services"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

export const useCommunityInfo = () => {
	const { title } = useRouter().query as { title: string }

	const { data, error } = useQuery(["community", title], () => CommunityService.getCommunity(title), {
		retry: false,
		enabled: !!title
	})
	return {
		data,
		error
	}
}
