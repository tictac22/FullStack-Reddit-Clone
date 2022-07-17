import Image from "next/image"

import { BiCake } from "react-icons/bi"

import { FormPost } from "@/components/FormPost"

import reddit from "@/public/communityexamples/reddit2.png"

const SubReddit = () => {
	return (
		<>
			<div className="h-[146px]">
				<div className="h-1/2 bg-cyan-600"></div>
				<div className="flex items-center justify-center bg-white">
					<div className="container flex -mt-[14px] py-0">
						<div className="border-4 border-solid border-white rounded-full relative w-[66px] h-[66px]">
							<Image src={reddit.src} alt="image" layout="fill" className="rounded-full" />
						</div>
						<div className="flex py-[10px] px-[16px] mt-3">
							<div className="mr-2">
								<p className="bold text-xl">baking</p>
								<p className="text-gray-400 text-[12px]">r/baking</p>
							</div>
							<button className="btn-secondary ml-4 self-start px-8 py-0">Join</button>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="flex">
					<div className="flex-auto lg:mr-6">
						<FormPost />
					</div>
					<div className="w-80 bg-white rounded-t hidden lg:block">
						<div className="bg-cyan-600 rounded-t p-3">
							<h1 className="text-white">About Community</h1>
						</div>
						<div className="px-3">
							<div className="flex my-3">
								<p>103,942 Members</p>
							</div>
							<hr />
							<div className="flex items-center my-3">
								<BiCake className="w-4 h-4 mr-3" />
								<p>Created Mar 25, 2022</p>
							</div>
							<button className="btn-secondary w-full my-3">Create Post</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SubReddit
