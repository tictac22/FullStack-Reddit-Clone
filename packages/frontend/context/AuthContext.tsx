import React, { useContext, useEffect, useState } from "react"

import { $api } from "@/utils/axios"

type User = {
	id: number
	username: string
	email: string
}
interface State {
	user: User
	isAuthenticated: boolean
	logIn: () => Promise<void>
}

const AuthState = React.createContext<State | null>(null)

export const useAuth = () => useContext(AuthState)

export const AuthContext = ({ children }) => {
	const [user, setUser] = useState<User | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

	const logIn = async () => {
		try {
			const response = await $api("auth/refresh")
			sessionStorage.setItem("token", response.data.accessToken)
			setUser(response.data.user)
			setIsAuthenticated(true)
		} catch (error) {
			setIsAuthenticated(false)
			setUser(null)
		}
	}

	useEffect(() => {
		logIn()
	}, [])

	const authValue = {
		user,
		isAuthenticated,
		logIn
	}

	return <AuthState.Provider value={authValue}>{children}</AuthState.Provider>
}
