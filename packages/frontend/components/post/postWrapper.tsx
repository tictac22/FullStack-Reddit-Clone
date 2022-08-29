import { Post as PostT } from "@/utils/types"
import { useZustandStore } from "@/utils/zustand"

import { Post } from "."

type Props = PostT & {
	path?: string
}
export const PostWrapper = (data: Props) => {
	const Vote = useZustandStore((state) => state.user?.Vote)
	return <Post {...data} vote={Vote?.filter((item) => item.postId === data?.id)[0]} path={data.path} />
}
