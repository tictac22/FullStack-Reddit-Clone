import { Like, User, Vote } from "@/utils/types"
import produce from "immer"
import create from "zustand"

import { $api } from "./axios"

interface State {
	user: User | null
	isAuthenticated: boolean | null
	logIn: () => Promise<void>
	setUser: (user: User) => void
	isLogin: (login: boolean) => void
	setVote: (vote: Vote[]) => void
	setLike: (like: Like[]) => void
}

export const useZustandStore = create<State>((set) => ({
	user: null,
	isAuthenticated: null,
	logIn: async () => {
		const response = await $api("auth/refresh")
		localStorage.setItem("token", response.data.accessToken)
		set(
			produce((state) => {
				state.user = response.data.user
				state.isAuthenticated = true

				return state
			})
		)
	},
	setUser: (user: User | null) =>
		set(
			produce((state) => {
				state.user = user
				return state
			})
		),
	setVote: (Vote: Vote[]) =>
		set(
			produce((state) => {
				state.user.Vote = Vote
				return state
			})
		),
	setLike: (Like: Like[]) =>
		set(
			produce((state) => {
				state.user.Likes = Like
				return state
			})
		),
	isLogin: (login: boolean) =>
		set((state) => {
			state.isAuthenticated = login
			return state
		})
}))
