import dynamic from "next/dynamic"
import Image from "next/image"

import { BiCake } from "react-icons/bi"

import { Rules } from "@/components/submitpost/rules"

const DynamicPostForm = dynamic(() => import("@/components/submitpost/postForm").then((mod) => mod.PostForm), {
	ssr: false
})
const SubReddit = () => {
	// request to get the community
	const test = {
		name: "test",
		img: "https://play-lh.googleusercontent.com/nlptFyxNsb8J0g8ZLux6016kunduV4jCxIrOJ7EEy-IobSN1RCDXAJ6DTGP81z7rr5Zq"
	}
	return (
		<div className="container">
			<div className="flex justify-end">
				<DynamicPostForm data={test} />
				<div className="hidden lg:block mt-3 ml-3">
					<div className="bg-white rounded mb-3">
						<div className="h-[34px] w-full bg-[#0079D3] rounded-t"></div>
						<div className="p-3">
							<div className="mt-2 flex items-center">
								<Image
									src="https://play-lh.googleusercontent.com/nlptFyxNsb8J0g8ZLux6016kunduV4jCxIrOJ7EEy-IobSN1RCDXAJ6DTGP81z7rr5Zq"
									alt="test"
									height={54}
									width={54}
								/>
								<p className="ml-2">testingsomestufffffff</p>
							</div>
							<div className="mt-2">Welcome to testingsomestufffffff</div>
							<p className="my-2">1 Members</p>
							<hr />
							<div className="flex items-center mt-2">
								<BiCake className="w-5 h-5" />
								<p className="ml-2">Created Aug 1, 2022</p>
							</div>
						</div>
					</div>
					<Rules />
				</div>
			</div>
		</div>
	)
}

export default SubReddit
