import { useRouter } from "next/router"

import React, { Fragment, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

import { $api } from "@/utils/axios"
import { Dialog, Transition } from "@headlessui/react"

interface Props {
	isOpen: boolean
	handleModal: () => void
}
export const CommunityPopup: React.FC<Props> = ({ isOpen, handleModal }) => {
	const [inputValue, setInput] = useState("")
	const [error, setError] = useState("")
	const router = useRouter()
	const createCommunity = async () => {
		if (inputValue.length === 0) {
			setError("A community name is required")
			return
		}
		try {
			await $api("community/create", {
				method: "POST",
				data: {
					title: inputValue
				}
			})
			router.push(`/r/${inputValue}`)
		} catch (error) {
			setError(`Community r/${inputValue} is already taken`)
			setInput("")
		}
	}
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={handleModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded bg-white p-4 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className=" mb-4 flex border-b border-solid border-[#EDEFF1] pb-4 text-lg font-medium leading-6 text-gray-900"
								>
									Create a community
									<AiOutlineClose onClick={handleModal} className="ml-auto cursor-pointer" />
								</Dialog.Title>
								<div className="mt-2">
									<p className="font-bold">Name</p>
								</div>
								<div className="relative mt-3 mb-2">
									<label
										htmlFor="name"
										className="absolute top-1/2 left-4  -translate-y-2/4 text-gray-500"
									>
										r/
									</label>
									<input
										value={inputValue}
										onChange={(e) =>
											setInput(e.target.value.length > 21 ? inputValue : e.target.value)
										}
										name="name"
										className=" w-full rounded border border-solid border-[#EDEFF1] py-2 px-4 pl-8 "
									/>
								</div>
								<p className="text-base text-[#7c7c7c]">
									{21 - +inputValue.length} Characters remaining
								</p>
								{error && <p className="text-base text-red-500">{error}</p>}
								<div className="mt-4 -ml-4 -mr-4 -mb-4 flex items-center justify-end bg-[#EDEFF1] p-4">
									<button onClick={handleModal} className="btn-primary px-4 py-1">
										Cancel
									</button>
									<button
										onClick={createCommunity}
										className={`btn-secondary ml-2 px-4 py-1 ${
											inputValue.length >= 21 && "cursor-not-allowed opacity-50"
										}`}
										disabled={inputValue.length >= 21}
									>
										Create Community
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}
