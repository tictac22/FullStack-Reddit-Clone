import Image from "next/image"

import { Fragment, useState } from "react"
import { BsSearch } from "react-icons/bs"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

import { Combobox, Transition } from "@headlessui/react"

import defaultSvg from "@/public/default.svg"

import { CommunityOptions } from "./types"

const people = [
	{
		name: "u/user",
		img: "/default.svg"
	},
	{
		name: "r/reddit",
		img: "/communityexamples/reddit.png"
	},
	{
		name: "r/something",
		img: "/communityexamples/reddit2.png"
	}
]

interface Props {
	community: { name: string; img: boolean | string }

	setCommunity: ({ name: string, img: boolean }) => void
	disabled: boolean
}
export const SelectComminity: React.FC<Props> = ({ community, setCommunity, disabled }) => {
	const [query, setQuery] = useState("")
	const filteredPeople =
		query === ""
			? people
			: people.filter((person) =>
					person.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
			  )
	return (
		<div className="mb-3 flex relative z-10">
			<Combobox value={community} onChange={setCommunity} disabled={disabled}>
				{({ open }) => (
					<div className="relative mt-1">
						<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
							{community?.name === CommunityOptions.Choose ? (
								<div className=" absolute top-1/2 -translate-y-2/4 left-2 rounded-full w-[22px] h-[22px] border border-dashed border-[#878A8C]"></div>
							) : community.name === CommunityOptions.Select ? (
								<div className="absolute top-1/2 -translate-y-2/4 left-2 ">
									<BsSearch className="w-[22px] h-[22px] text-[#878A8C]" />
								</div>
							) : (
								<div className="absolute top-1/2 -translate-y-2/4 rounded-full left-2 w-[22px] h-[22px]">
									<Image
										width={22}
										height={22}
										className="w-full rounded-full"
										src={community.img}
										alt={community.name}
									/>
								</div>
							)}
							<Combobox.Input
								className="w-full border-none py-2 pl-9 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0"
								displayValue={(person) => person.name}
								onChange={(event) => {
									setQuery(event.target.value)
								}}
								onFocus={(e) => {
									if (e.relatedTarget?.id?.includes("headlessui-combobox-button")) {
										return
									}
									!open && e.target.nextSibling.click()
									!open && setCommunity({ name: CommunityOptions.Select, img: false })
								}}
								onBlur={(e) => {
									if (e.relatedTarget?.id?.includes("headlessui-combobox-button")) {
										return
									}

									open &&
										community.name === CommunityOptions.Select &&
										setCommunity({ name: CommunityOptions.Choose, img: false })
								}}
							/>
							{!disabled && (
								<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
									<MdOutlineKeyboardArrowDown />
								</Combobox.Button>
							)}
						</div>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							afterLeave={() => setQuery("")}
						>
							<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{filteredPeople.length === 0 && query !== "" ? (
									<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
										Nothing found.
									</div>
								) : (
									filteredPeople.map((person) => (
										<Combobox.Option
											key={person.name}
											className={({ active }) =>
												`relative cursor-pointer select-none py-2 pl-2 pr-4 ${
													active && !person.name.startsWith("u")
														? "bg-teal-600 text-white"
														: "text-gray-900"
												}`
											}
											value={person}
										>
											{({ selected, active }) => (
												<>
													{person.name.startsWith("u") ? (
														<div>
															<div>Your profile</div>
															<div className="flex mb-2">
																<Image
																	src={defaultSvg.src}
																	alt="default"
																	width={22}
																	height={22}
																	className=" fill-slate-300"
																/>
																<p className="font-bold ml-2">{person.name}</p>
															</div>
															<hr />
														</div>
													) : (
														<span
															className={`block truncate flex ${
																selected ? "font-medium" : "font-normal"
															}`}
														>
															{person.img !== false ? (
																<div className="w-[22px] rounded-full h-[22px] mr-3">
																	<Image
																		width={22}
																		height={22}
																		className="w-full rounded-full"
																		src={person.img}
																		alt={person.name}
																	/>
																</div>
															) : (
																<div className="w-[22px] h-[22px] border border-dashed border-[#878A8C]"></div>
															)}
															{person.name}
														</span>
													)}
													{selected ? (
														<span
															className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																active ? "text-white" : "text-teal-600"
															}`}
														></span>
													) : null}
												</>
											)}
										</Combobox.Option>
									))
								)}
							</Combobox.Options>
						</Transition>
					</div>
				)}
			</Combobox>
		</div>
	)
}
//<CheckIcon className="h-5 w-5" aria-hidden="true" />
