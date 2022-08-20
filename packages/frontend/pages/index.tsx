import Link from "next/link"

import { FormPost } from "@/components/FormPost"
import { Aside } from "@/components/aside"
import { Post } from "@/components/post"
import { PostLoader } from "@/components/skeletons/post"
import { UseGetAllPost } from "@/hooks/react-query"

const Home = () => {
	const { data, isLoading } = UseGetAllPost()
	return (
		<div className="container">
			<div className="flex">
				<Aside />
				<div className="order-first flex-grow mr-7">
					<div className="max-w-[640px]">
						<FormPost />
						{isLoading
							? [...Array(5)].map((item, index) => <PostLoader key={index} />)
							: data.map((post) => (
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
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
