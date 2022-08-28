import { Comment as CommentT } from "@/utils/types"
import { useZustandStore } from "@/utils/zustand"
import { Comment } from "./comment"

type Props = {
	data: CommentT[]
}
export const CommentList = ({ data }: Props) => {
	const Likes = useZustandStore((state) => state.user?.Likes)
	return (
		<>
			{data.map((item) => (
				<Comment key={item.id} {...item} likeData={Likes?.filter((like) => like.commentId === item.id)[0]} />
			))}
		</>
	)
}
