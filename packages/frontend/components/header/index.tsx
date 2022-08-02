import Link from "next/link"

import React from "react"

import { useAuth } from "context/AuthContext"

import { Logo } from "./logo"
import { SearchBar } from "./searchbar"
import { UserProfile } from "./userProfile"

export const Header: React.FC = () => {
	const { isAuthenticated } = useAuth()
	return (
		<header className="bg-white flex items-center h-20 px-3 justify-between relative z-50">
			<Logo />
			<SearchBar />
			<div className="flex items-center">
				{!isAuthenticated && (
					<>
						<Link href={"/account/login"}>
							<button className="hidden lg:block  btn-primary">Log In</button>
						</Link>
						<Link href={"/account/register"}>
							<button className="hidden lg:block btn-secondary ml-4">Sign Up</button>
						</Link>
					</>
				)}
				<UserProfile />
			</div>
		</header>
	)
}
