import React, { useEffect } from "react"

import { Buttons } from "./buttons"
import { Logo } from "./logo"
import { ProgressBar } from "./progressBar"
import { SearchBar } from "./searchbar"
import { UserProfile } from "./userProfile"

export const Header: React.FC = () => {
	useEffect(() => {
		const defaultColorScheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
		const theme = localStorage.getItem("theme") || defaultColorScheme
		localStorage.setItem("theme", theme)
		document.documentElement.setAttribute("data-theme", theme)
	}, [])
	return (
		<header className="relative z-50 flex h-[80px] items-center justify-between border-b border-solid border-[#EDEFF1] bg-white px-3 dark:border-[#343536] dark:bg-[#1a1a1a]">
			<ProgressBar />
			<Logo />
			<SearchBar />
			<div className="flex items-center">
				<Buttons />
				<UserProfile />
			</div>
		</header>
	)
}
