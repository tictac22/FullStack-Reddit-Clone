import Image from "next/image"

import React, { Fragment, memo, useState } from "react"
import { BsSearch } from "react-icons/bs"

import { useAuth } from "@/hooks/useAuth"
import { Combobox, Transition } from "@headlessui/react"

import UserSvg from "@/public/userImage.svg"

import { ComboxOption } from "./selectOption"
import { Community } from "./types"

interface Props {
	community: Community
	setCommunity: React.Dispatch<React.SetStateAction<Community>>
	disabled?: boolean
}
export const SelectComminity: React.FC<Props> = memo(({ community, setCommunity, disabled }) => {
	const [query, setQuery] = useState("")
	const {
		user: { SubscribedSubReddits = [], username }
	} = useAuth()
	const filteredCommunity = SubscribedSubReddits
		? query === ""
			? SubscribedSubReddits
			: SubscribedSubReddits?.filter((item) =>
					item.subReddit.title
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  )
		: []
	return (
		<div className="">
			<Combobox value={community} onChange={setCommunity} disabled={disabled}>
				{({ open }) => (
					<div className="relative z-30 mt-1 mb-2">
						<div className="relative z-30 max-w-[300px] cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
							<div className="flex items-center ml-2">
								{community === username ? (
									<>
										<Image
											src={UserSvg}
											className="w-[30px] h-[30px] bg-[#EDEFF1] rounded-full"
											alt="user"
											width={30}
											height={30}
										/>
										<Combobox.Input
											className="w-full border-none py-2 pl-3 pr-2 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0"
											displayValue={(person) => `u/${person}`}
											onChange={(event) => setQuery(event.target.value)}
											onBlur={(event) => {
												if (!event.target.value) setCommunity("")
											}}
										/>
									</>
								) : community?.subReddit ? (
									<>
										<Image
											src={community?.subReddit.image}
											height={30}
											width={30}
											className="rounded-full object-cover"
											alt={community?.subReddit.title}
										/>
										<Combobox.Input
											className="w-full border-none py-2 pl-3 pr-2 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0"
											displayValue={(person) => `r/${person.subReddit?.title}`}
											onChange={(event) => setQuery(event.target.value)}
											onBlur={(event) => {
												if (!event.target.value) setCommunity("")
											}}
										/>
									</>
								) : disabled ? (
									<>
										{community.image ? (
											<Image
												src={community.image}
												height={30}
												width={30}
												className="rounded-full object-cover"
												alt={community.subRedditTitle}
											/>
										) : (
											<div className="w-[22px] h-[22px] border-dashed border border-[#878A8C] rounded-full"></div>
										)}
										<div className="py-2 pl-3 pr-2">{community.subRedditTitle}</div>
									</>
								) : (
									<>
										<div className="w-[22px] h-[22px] border-dashed border border-[#878A8C] rounded-full"></div>
										<div className="py-2 pl-3 pr-2">Select a community</div>
									</>
								)}
							</div>
							<Combobox.Button className="absolute w-full inset-y-0 right-0  items-center pr-2 flex justify-end cursor-default">
								<BsSearch className="h-5 w-5 text-gray-400 cursor-pointer" aria-hidden="true" />
							</Combobox.Button>
						</div>
						<Transition
							as={Fragment}
							show={open}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							afterLeave={() => setQuery("")}
						>
							<Combobox.Options
								static
								className="absolute mt-1 max-h-60 max-w-[300px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
							>
								{filteredCommunity?.length === 0 && query !== "" ? (
									<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
										Nothing found.
									</div>
								) : (
									<div>
										<Combobox.Option
											className={({ active }) =>
												`relative cursor-default select-none py-2 pl-3 pr-4 p-3 border-b border-solid border-gray-400 ${
													active ? "bg-teal-600 text-white" : "text-gray-900"
												}`
											}
											value={username}
										>
											<p className="tracking-wider">Your Profile</p>
											<div className="mt-2 flex items-center">
												<Image
													src={UserSvg}
													className="w-[33px] h-[33px] bg-[#EDEFF1] rounded"
													alt="user"
													width={33}
													height={33}
												/>
												<div className="ml-2 font-bold">u/{username}</div>
											</div>
										</Combobox.Option>
										<div className="p-3 tracking-wider">Your Communities</div>
										{filteredCommunity?.map((community) => (
											<ComboxOption key={community.subRedditId} community={community} />
										))}
									</div>
								)}
							</Combobox.Options>
						</Transition>
					</div>
				)}
			</Combobox>
		</div>
	)
})
