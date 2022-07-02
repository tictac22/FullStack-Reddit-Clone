import React from "react"

import { Logo } from "./logo"
import { SearchBar } from "./searchbar"
import { UserProfile } from "./userProfile"

export const Header: React.FC = () => {
	return (
		<header className="bg-white flex items-center h-20 px-3 justify-between relative z-50">
			<Logo />
			<SearchBar />
			<div className="flex items-center">
				<button className="hidden lg:block  btn-primary">Log In</button>
				<button className="hidden lg:block btn-secondary ml-4">Sign Up</button>
				<UserProfile />
			</div>
		</header>
	)
}
