import Image from "next/image"

import { Combobox } from "@headlessui/react"

export const ComboxOption = ({ community }) => {
	return (
		<Combobox.Option
			className={({ active }) =>
				`relative cursor-default select-none py-2 pl-3 pr-4 ${
					active ? "bg-teal-600 text-white" : "text-gray-900"
				}`
			}
			value={community}
		>
			{({ selected, active }) => (
				<>
					<span className={`flex items-center truncate ${selected ? "font-medium" : "font-normal"}`}>
						{community.subReddit.image ? (
							<Image
								src={community.subReddit.image}
								height={30}
								width={30}
								alt={community.subReddit.title}
								className="rounded-full"
							/>
						) : (
							<div className="h-[30px] w-[30px] rounded-full bg-cyan-400"></div>
						)}
						<div className="ml-3">
							<p className="ml-1">r/{community.subReddit.title}</p>
							<div className="ml-1">
								<p className="text-gray-400">
									{community.subReddit.subscribers}
									<span className="ml-1">members</span>
								</p>
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
			)}
		</Combobox.Option>
	)
}
