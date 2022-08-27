import React from "react"

import { Buttons } from "./buttons"
import { Logo } from "./logo"
import { ProgressBar } from "./progressBar"
import { SearchBar } from "./searchbar"
import { UserProfile } from "./userProfile"

export const Header: React.FC = () => {
	return (
		<header className="bg-white flex items-center px-3 justify-between relative z-50 h-[80px]">
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
