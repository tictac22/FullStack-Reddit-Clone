import React, { useCallback, useEffect, useState } from "react"

import { $api } from "@/utils/axios"
import { User } from "@/utils/types"

interface State {
	user: User
	logIn: () => Promise<void>
	setUser: React.Dispatch<React.SetStateAction<User>>
	isAuthenticated: boolean
}

export const AuthState = React.createContext<State | null>(null)

export const AuthContext = ({ children }) => {
	const [user, setUser] = useState<User | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState(null)
	const logIn = useCallback(async () => {
		try {
			const response = await $api("auth/refresh")
			localStorage.setItem("token", response.data.accessToken)
			setUser(response.data.user)
			setIsAuthenticated(true)
		} catch (error) {
			setUser(null)
			setIsAuthenticated(false)
		}
	}, [])

	useEffect(() => {
		logIn()
	}, [logIn])
	return <AuthState.Provider value={{ user, logIn, setUser, isAuthenticated }}>{children}</AuthState.Provider>
}
