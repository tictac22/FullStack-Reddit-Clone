import Link from "next/link"

import React, { Fragment, useState } from "react"
import { BsBoxArrowRight, BsPersonCircle } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
import { HiOutlineChevronDown } from "react-icons/hi"

import { $api } from "@/utils/axios"
import { useZustandStore } from "@/utils/zustand"
import { Menu, Switch, Transition } from "@headlessui/react"

export const UserProfile: React.FC = () => {
	const isAuthenticated = useZustandStore((state) => state.isAuthenticated)
	const logout = async () => {
		await $api("auth/logout", {
			method: "GET"
		})
		location.reload()
	}
	return (
		<div className="text-right lg:ml-10 ">
			<Menu as="div" className="relative inline-block text-left">
				<Menu.Button className=" flex cursor-pointer items-center border-2 border-solid border-white p-2 hover:border-custom-100">
					<BsPersonCircle className="h-6 w-6 text-[#E2E8F0]" />
					<HiOutlineChevronDown className="ml-2 -mr-1 h-5 w-5  text-[#E2E8F0] " aria-hidden="true" />
				</Menu.Button>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-1 py-1 ">
							<Menu.Item>
								{({ active }) => (
									<div
										className={`${
											active ? "bg-slate-400 text-white" : "text-gray-900"
										} group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm`}
									>
										<div className="flex flex-1 items-center justify-between">
											<p>Profile</p>
										</div>
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										className={`${
											active ? "bg-slate-400 text-white" : "text-gray-900"
										} group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm`}
									>
										<div className="flex flex-1 items-center justify-between">
											<p>Dark Mode:</p>
											<Toggle />
										</div>
									</div>
								)}
							</Menu.Item>

							<Menu.Item>
								{({ active }) => (
									<div
										className={`${
											active ? "bg-slate-400 text-white" : "text-gray-900"
										} group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm`}
									>
										{isAuthenticated ? (
											<div className="flex flex-1 items-center" onClick={logout}>
												<FiLogOut />
												<p className="ml-3">Logout</p>
											</div>
										) : (
											<Link href={"/account/login"}>
												<div className="flex flex-1 items-center">
													<BsBoxArrowRight />
													<p className="ml-3">Sign up or Log in</p>
												</div>
											</Link>
										)}
									</div>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	)
}

const Toggle = () => {
	const [enabled, setEnabled] = useState(false)

	return (
		<div className="h-[20px]">
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className={`${enabled ? "bg-cyan-900" : "bg-cyan-400"}
			relative inline-flex h-[20px] w-[57px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				<span className="sr-only">Use setting</span>
				<span
					aria-hidden="true"
					className={`${enabled ? "translate-x-9" : "translate-x-0"}
			  pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			</Switch>
		</div>
	)
}
