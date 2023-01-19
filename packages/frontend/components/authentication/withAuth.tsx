import { useZustandStore } from "@/utils/zustand"
import { NextPage } from "next"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"

export const WithAuth = (Component: NextPage) => {
	const AuthenticatedComponent = () => {
		const isAuthenticated = useZustandStore((state) => state.isAuthenticated)
		const router = useRouter()
		const [isLoading, setLoading] = useState(true)
		useEffect(() => {
			if (!isAuthenticated && isAuthenticated !== null) {
				router.replace("/account/login")
			} else {
				setLoading(false)
			}
		}, [isAuthenticated, router])
		return !isLoading && <Component />
	}
	return AuthenticatedComponent
}
