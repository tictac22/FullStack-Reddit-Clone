import { NextPage } from "next"
import { useRouter } from "next/router"

import { useEffect } from "react"

import { useAuth } from "@/hooks/useAuth"

export const WithAuth = (Component: NextPage) => {
	const AuthenticatedComponent = () => {
		const { isAuthenticated } = useAuth()
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
