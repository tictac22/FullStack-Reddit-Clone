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
				<button className="btn-primary">Log In</button>
				<button className="btn-secondary ml-4">Sign Up</button>
				<UserProfile />
			</div>
		</header>
	)
}

/*<Button text="Log In" textColor="cyan-500" bg="bg-white" hover="hover:bg-custom-100" />
<Button text="Sign Up" textColor="white" bg="bg-cyan-500" hover="hover:bg-cyan-600" />*/
