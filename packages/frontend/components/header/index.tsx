import React from "react"
import { Button } from "./button"
import { Logo } from "./logo"
import { SearchBar } from "./searchbar"
import { UserProfile } from "./userProfile"

export const Header: React.FC = () => {
	return (
		<div className="bg-white flex items-center h-20 px-3 justify-between">
			<Logo />
			<SearchBar />
			<div className="flex items-center">
				<Button text="Log In" textColor="cyan-500" bg="bg-white" hover="hover:bg-custom-100" />
				<Button text="Sign Up" textColor="white" bg="bg-cyan-500" hover="hover:bg-cyan-600" />
				<UserProfile />
			</div>
		</div>
	)
}
