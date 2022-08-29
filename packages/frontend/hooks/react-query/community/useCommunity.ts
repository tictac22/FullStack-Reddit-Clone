import { CommunityService } from "@/utils/services"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

export const useCommunityInfo = () => {
	const { subreddit } = useRouter().query as { subreddit: string }

	const { data, error } = useQuery(["community", subreddit], () => CommunityService.getCommunity(subreddit), {
		retry: false,
		enabled: !!subreddit
	})
	return {
		data,
		error
	}
}
