import Link from "next/link"

import { useZustandStore } from "@/utils/zustand"

export const Buttons = () => {
	const isAuthenticated = useZustandStore((state) => state.isAuthenticated)
	return (
		<>
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
		</>
	)
}
