import Image from "next/image"
import Link from "next/link"

import { useRef, useState } from "react"
import { AiFillLike } from "react-icons/ai"

import { useAuth } from "@/hooks/useAuth"
import { useLikeComment } from "@/hooks/useSibscribe"
import { $api } from "@/utils/axios"
import { timeAgo } from "@/utils/functions"
import { Comment as CommentT } from "@/utils/types"

import UserSvg from "@/public/userImage.svg"

export const Comment: React.FC<CommentT> = ({ user, text, createdAt, like, id }) => {
	const { user: userCtx, isAuthenticated, setUser } = useAuth()
	const [isSubscribed, setIsSubscribed, likeData] = useLikeComment(userCtx, id)
	const [isLiking, setIsLiking] = useState(false)

	const handleSubscribe = async () => {
		if (!isAuthenticated) return
		if (isLiking) return
		setIsLiking(true)

		const response = await $api("/post/rate", {
			method: "PATCH",
			data: {
				rateId: likeData?.id,
				commentId: id
			}
		})
		if (likeData?.id) {
			const newLikes = userCtx.Likes.filter((like) => like.id !== likeData.id)
			setUser((prev) => ({
				...prev,
				Likes: newLikes
			}))
		} else {
			setUser((prev) => ({
				...prev,
				Likes: [...prev.Likes, ...(response.data.likes || [])]
			}))
		}

		const content = Number(ref.current.innerHTML)
		ref.current.innerHTML = `${content + (isSubscribed ? -1 : 1)}`

		setIsSubscribed(!isSubscribed)
		setIsLiking(false)
	}

	const ref = useRef<HTMLDivElement>()
	return (
		<div className="my-3">
			<div className="flex items-center">
				<Image src={UserSvg} alt="user" width={36} height={36} className=" bg-[#EDEFF1] rounded-full" />
				<Link href={`/user/${user.username}`}>
					<a className="hover:underline ml-2">{user.username}</a>
				</Link>
				<div className="ml-2">{timeAgo(createdAt)}</div>
			</div>
			<div className="ml-[45px]">
				<p>{text}</p>
				<div className="flex items-center mt-2">
					<p className="mr-2" ref={ref}>
						{like}
					</p>
					<AiFillLike
						className={`${
							isSubscribed && "fill-[red] hover:fill-[#c90909]"
						} cursor-pointer hover:fill-[#2d2b2b]`}
						onClick={handleSubscribe}
					/>
				</div>
			</div>
		</div>
	)
}
