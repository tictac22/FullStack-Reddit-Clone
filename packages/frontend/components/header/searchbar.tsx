import Image from "next/image"
import { useRouter } from "next/router"

import React, { Fragment, useState } from "react"
import { BsSearch } from "react-icons/bs"

import { $api } from "@/utils/axios"
import { Community } from "@/utils/types"
import { Combobox, Transition } from "@headlessui/react"

export const SearchBar: React.FC = () => {
	const [selected, setSelected] = useState<Community>()
	const [communities, setCommunities] = useState<Community[]>([])
	const [timer, setTimer] = useState(null)
	const getCommunities = (e: React.ChangeEvent<HTMLInputElement>) => {
		const text = e.target.value
		if (!text) return
		if (timer) {
			clearTimeout(timer)
		}
		setTimer(
			setTimeout(async () => {
				const response = await $api("communityP/bytitle", {
					method: "POST",
					data: {
						title: text.trim()
					}
				})
				setCommunities(response.data)
			}, 500)
		)
	}
	const router = useRouter()
	const handleSelectedA = (community: Community, path: string) => {
		setSelected(community)
		router.push(path)
	}
	return (
		<div className="mx-3 max-w-3xl flex-auto">
			<Combobox value={selected} onChange={setSelected}>
				<div className="relative">
					<div className="relative w-full cursor-default rounded-lg text-left  focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300  sm:text-sm">
						<Combobox.Input
							className="w-full rounded-lg border-2 border-solid border-slate-400 bg-custom-100 py-2 px-10 text-sm leading-5 text-custom-200 focus:outline-sky-400 focus:ring-0 dark:border-[#343536] dark:bg-[#272729] dark:text-white dark:placeholder:text-white  dark:focus:outline-white"
							onChange={(event) => getCommunities(event)}
							displayValue={(person: { title: string }) => person && person.title}
							placeholder={"Search Reddit"}
						/>
						<Combobox.Button className="absolute inset-y-0 left-2 flex items-center">
							<BsSearch className="h-5 w-5 text-[#818384]  " aria-hidden="true" />
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#272729] sm:text-sm">
							{communities.length === 0 ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-white">
									Nothing found.
								</div>
							) : (
								communities.map((community) => (
									<Combobox.Option
										key={community.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-3 pr-4 ${
												active ? "bg-teal-600 text-white dark:bg-[#343536]" : "text-gray-900"
											}`
										}
										value={community}
									>
										{({ selected, active }) => (
											<div onClick={() => handleSelectedA(community, `/r/${community.title}`)}>
												<>
													<span
														className={`block truncate ${
															selected ? "font-medium" : "font-normal"
														}`}
													>
														<div className="flex items-center">
															{community.image ? (
																<Image
																	src={community.image}
																	alt={community.title}
																	width={24}
																	height={24}
																	className="rounded-full"
																/>
															) : (
																<div className="h-[24px] w-[24px] rounded-full bg-cyan-500" />
															)}
															<div className="ml-2">
																<p className="dark:text-white">{community.title}</p>
																<div className="flex items-center text-xs text-gray-400">
																	Community{" "}
																	<svg
																		className="mx-1 w-1 fill-[#878A8C]"
																		xmlns="http://www.w3.org/2000/svg"
																		viewBox="0 0 8 8"
																	>
																		<g fill="inherit" stroke="none">
																			<circle r="4" cy="4" cx="4"></circle>
																		</g>
																	</svg>{" "}
																	{community.subscribers} members
																</div>
															</div>
														</div>
													</span>
													{selected ? (
														<span
															className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																active ? "text-white" : "text-teal-600"
															}`}
														></span>
													) : null}
												</>
											</div>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	)
}
