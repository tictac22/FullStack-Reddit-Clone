import { NextPage } from "next"
import { useRouter } from "next/router"

import { useEffect } from "react"

import { useZustandStore } from "@/utils/zustand"

export const WithAuth = (Component: NextPage) => {
	const AuthenticatedComponent = () => {
		const isAuthenticated = useZustandStore((state) => state.isAuthenticated)
		const router = useRouter()

		useEffect(() => {
			if (!isAuthenticated && isAuthenticated !== null) {
				router.replace("/account/login")
			}
		}, [isAuthenticated, router])
		return <Component />
	}
	return AuthenticatedComponent
}
