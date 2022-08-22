import Link from "next/link"

import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { Post as PostT } from "@/utils/types"

import { Post } from "./post"
import { PostLoader } from "./skeletons/post"

interface Props {
	data: {
		pages: {
			posts: PostT[]
			nextPage: number
		}[]
	}
	fetchNextPage: () => void
	isFetchingNextPage: boolean
	hasNextPage: boolean
}
export const InfiniteQueryWrapper: React.FC<Props> = ({ data, fetchNextPage, isFetchingNextPage, hasNextPage }) => {
	const { ref, inView } = useInView()
	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
		//eslint-disable-next-line
	}, [inView])
	return (
		<>
			{data.pages.map((page) => (
				<React.Fragment key={page.nextPage}>
					{page.posts.map((post) => (
						<Link
							href={`/r/${post.subReddit.title}/comments/${post.id}`}
							key={post.id}
							className="cursor-pointer"
						>
							<a>
								<Post {...post} />
							</a>
						</Link>
					))}
				</React.Fragment>
			))}
			{hasNextPage && <div ref={ref}></div>}
			{isFetchingNextPage && <PostLoader />}
		</>
	)
}
