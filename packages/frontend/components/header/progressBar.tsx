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
				<div className="absolute top-0 left-0 h-1  w-full overflow-hidden bg-[#a7caed]">
					<div className="absolute h-1 w-auto   origin-left animate-progress1 bg-[#1976d2] transition-transform"></div>
					<div className="absolute h-1 w-auto   origin-left animate-progress2 bg-[#1976d2] transition-transform"></div>
				</div>
			)}
		</>
	)
}
