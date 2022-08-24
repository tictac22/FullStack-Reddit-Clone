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
		<div className="max-w-3xl flex-auto mx-3">
			<Combobox value={selected} onChange={setSelected}>
				<div className="relative">
					<div className="relative w-full cursor-default rounded-lg  text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
						<Combobox.Input
							className="w-full border-solid border-2 rounded-lg border-slate-400 py-2 px-10 text-sm leading-5 text-custom-200 bg-custom-100 focus:ring-0 focus:outline-sky-400"
							onChange={(event) => getCommunities(event)}
							displayValue={(person: { title: string }) => person && person.title}
							placeholder={"Search Reddit"}
						/>
						<Combobox.Button className="absolute inset-y-0 left-2 flex items-center">
							<BsSearch className="h-5 w-5 text-[#70819b]" aria-hidden="true" />
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{communities.length === 0 ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									Nothing found.
								</div>
							) : (
								communities.map((community) => (
									<Combobox.Option
										key={community.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-3 pr-4 ${
												active ? "text-white bg-teal-600" : "text-gray-900"
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
																<div className="w-[24px] h-[24px] bg-cyan-500 rounded-full" />
															)}
															<div className="ml-2">
																<p className="">{community.title}</p>
																<div className="text-gray-400 flex items-center text-xs">
																	Community{" "}
																	<svg
																		className="fill-[#878A8C] w-1 mx-1"
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
