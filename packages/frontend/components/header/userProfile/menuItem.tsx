import React from "react"

import { Menu } from "@headlessui/react"

type Props = {
	children?: React.ReactNode
}
export const MenuItem = ({ children }: Props) => (
	<Menu.Item>
		{({ active }) => (
			<div
				className={`${
					active ? "bg-slate-400 text-white dark:bg-dark-200" : "text-gray-900 dark:text-white"
				} group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm`}
			>
				{children}
			</div>
		)}
	</Menu.Item>
)
