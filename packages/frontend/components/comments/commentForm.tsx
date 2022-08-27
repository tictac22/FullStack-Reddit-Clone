import { useState } from "react"

import { $api } from "@/utils/axios"
import { useQueryClient } from "@tanstack/react-query"

import { WithAuthMethods } from "../authentication/withAuthMethods"

interface Props {
	postId: number
}
export const CommentForm: React.FC<Props> = ({ postId }) => {
	const [comment, setComment] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const queryClient = useQueryClient()
	const sendComment = async (cb: () => void) => {
		const isAuth = await cb()
		if (isAuth === null) return

		if (!comment) return
		setIsSubmitting(true)
		const response = await $api("post/comment", {
			method: "POST",
			data: {
				postId,
				comment
			}
		})
		queryClient.setQueryData(["post", postId], (prev) => ({
			...prev,
			comments: [response.data, ...prev.comments]
		}))
		setIsSubmitting(false)
	}

	return (
		<form>
			<textarea
				className="w-full max-h-56 p-3 focus:border-black border border-solid border-[#f6f8f7]"
				placeholder="What are your thoughts?"
				maxLength={200}
				value={comment}
				onChange={(e) => setComment(e.target.value)}
			/>
			<WithAuthMethods>
				{({ isAuth }) => (
					<button
						disabled={isSubmitting}
						type="button"
						className="my-3 btn-primary ml-auto w-3 flex justify-center items-end"
						onClick={() => sendComment(isAuth)}
					>
						Comment
					</button>
				)}
			</WithAuthMethods>
		</form>
	)
}
