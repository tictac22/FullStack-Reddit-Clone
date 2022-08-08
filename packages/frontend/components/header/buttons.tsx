import Link from "next/link"

import { useAuth } from "@/hooks/useAuth"

export const Buttons = () => {
	const { user } = useAuth()

	return (
		<>
			{!user?.isAuthenticated && (
				<>
					<Link href={"/account/login"}>
						<button className="hidden lg:block  btn-primary">Log In</button>
					</Link>
					<Link href={"/account/register"}>
						<button className="hidden lg:block btn-secondary ml-4">Sign Up</button>
					</Link>
				</>
			)}
		</>
	)
}
