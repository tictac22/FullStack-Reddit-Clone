import { useState } from "react"

import { $api } from "@/utils/axios"

interface Props {
	postId: number
}
export const CommentForm: React.FC<Props> = ({ postId }) => {
	const [comment, setComment] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	const sendComment = async () => {
		if (!comment) return
		setIsSubmitting(true)
		await $api("post/comment", {
			method: "POST",
			data: {
				postId,
				comment
			}
		})
		location.reload()
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
			<button
				disabled={isSubmitting}
				type="button"
				className="my-3 btn-primary ml-auto w-3 flex justify-center items-end"
				onClick={sendComment}
			>
				Comment
			</button>
		</form>
	)
}
