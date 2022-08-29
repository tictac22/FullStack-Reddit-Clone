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
		const isAuth = cb()
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
				className="max-h-56 w-full border border-solid border-[#f6f8f7] p-3 focus:border-black dark:border-dark-200 dark:bg-dark-100"
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
						className="btn-primary my-3 ml-auto flex w-3 items-end justify-center"
						onClick={() => sendComment(isAuth)}
					>
						Comment
					</button>
				)}
			</WithAuthMethods>
		</form>
	)
}
