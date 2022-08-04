import { useContext } from "react"

import { AuthState } from "@/components/authProvider"

export const useAuth = () => useContext(AuthState)
