import Link from "next/link"

import { FormPost } from "@/components/FormPost"
import { Aside } from "@/components/aside"
import { Post } from "@/components/post"
import { PostLoader } from "@/components/skeletons/post"
import { UseGetAllPost } from "@/hooks/react-query"
import { useZustandStore } from "@/utils/zustand"

const Home = () => {
	const isAuthenticated = useZustandStore((state) => state.isAuthenticated)
	const { data, isLoading } = UseGetAllPost(isAuthenticated)

	return (
		<div className="container">
			<div className="flex">
				<Aside />
				<div className="order-first flex-grow lg:mr-7 flex-auto lg:flex-initial">
					<div className="lg:max-w-[640px]">
						<FormPost />
						{isLoading ? (
							[...Array(5)].map((item, index) => <PostLoader key={index} />)
						) : data.postType === "USER" && data.data.length > 0 ? (
							data.data.map((community) =>
								community.posts.map((post) => (
									<Link
										href={`/r/${community.id}/comments/${post.id}`}
										key={post.id}
										className="cursor-pointer"
									>
										<a>
											<Post {...post} />
										</a>
									</Link>
								))
							)
						) : data.data.length === 0 ? (
							<div className="max-w-[640px] lg:w-[640px] w-full mt-5">
								<p className="bg-white p-3 text-center rounded-md">
									Currently you don&apos;t subscribe on any subReddit go to ....
								</p>
							</div>
						) : (
							data.data.map((post) => (
								<Link
									href={`/r/${post.subReddit.title}/comments/${post.id}`}
									key={post.id}
									className="cursor-pointer"
								>
									<a>
										<Post {...post} />
									</a>
								</Link>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
