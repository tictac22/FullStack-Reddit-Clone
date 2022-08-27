import { useRouter } from "next/router"

import { useEffect, useState } from "react"

export const ProgressBar = () => {
	const router = useRouter()
	const [isLoading, setLoading] = useState(false)
	useEffect(() => {
		router.events.on("routeChangeStart", () => setLoading(true))
		router.events.on("routeChangeComplete", () => setLoading(false))
		router.events.on("routeChangeError", () => setLoading(false))

		return () => {
			router.events.off("routeChangeStart", () => setLoading(true))
			router.events.off("routeChangeComplete", () => setLoading(false))
			router.events.off("routeChangeError", () => setLoading(false))
		}
	}, [])
	return (
		<>
			{isLoading && (
				<div className="absolute top-0 left-0 bg-[#a7caed]  w-full h-2 overflow-hidden">
					<div className="w-auto h-2 bg-[#1976d2]   absolute animate-progress1 origin-left transition-transform"></div>
					<div className="w-auto h-2 bg-[#1976d2]   absolute animate-progress2 origin-left transition-transform"></div>
				</div>
			)}
		</>
	)
}
