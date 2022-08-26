import { Post as PostT } from "@/utils/types"
import { useZustandStore } from "@/utils/zustand"

import { Post } from "."

export const PostWrapper = (data: PostT) => {
	const Vote = useZustandStore((state) => state.user?.Vote)

	return <Post {...data} vote={Vote?.filter((item) => item.postId === data?.id)[0]} />
}
