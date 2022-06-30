import { Combobox, Transition } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import { BsSearch } from "react-icons/bs"
const people = [
	{ id: 1, name: "Wade Cooper" },
	{ id: 2, name: "Arlene Mccoy" },
	{ id: 3, name: "Devon Webb" },
	{ id: 4, name: "Tom Cook" },
	{ id: 5, name: "Tanya Fox" },
	{ id: 6, name: "Hellen Schmidt" }
]
export const SearchBar: React.FC = () => {
	const [selected, setSelected] = useState("")
	const [query, setQuery] = useState("")

	const filteredPeople =
		query === ""
			? people
			: people.filter((person) =>
					person.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
			  )

	return (
		<div className="sm:ml-3 max-w-3xl w-[800px]">
			<Combobox value={selected} onChange={setSelected}>
				<div className="relative ">
					<div className="relative w-full cursor-default rounded-lg  text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
						<Combobox.Input
							className="w-full border-solid border-2 rounded-lg border-slate-400 py-2 px-10 text-sm leading-5 text-custom-200 bg-custom-100 focus:ring-0 focus:outline-sky-400"
							displayValue={(person: { name: string }) => person.name}
							onChange={(event) => setQuery(event.target.value)}
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
										key={person.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? "text-white bg-teal-600" : "text-gray-900"
											}`
										}
										value={person}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? "font-medium" : "font-normal"
													}`}
												>
													{person.name}
												</span>
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
			</Combobox>
		</div>
	)
}
