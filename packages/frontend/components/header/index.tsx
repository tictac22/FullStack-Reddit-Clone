import React from "react"

import { Buttons } from "./buttons"
import { Logo } from "./logo"
import { ProgressBar } from "./progressBar"
import { SearchBar } from "./searchbar"
import { UserProfile } from "./userProfile"

export const Header: React.FC = () => {
	return (
		<header className="relative z-50 flex h-[80px] items-center justify-between bg-white px-3">
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
