import { AppProps } from "next/app"
import Head from "next/head"

import { useEffect } from "react"

import { Header } from "@/components/header"
import { useZustandStore } from "@/utils/zustand"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import "../css/styles.css"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

const noLayout = ["/account/register", "/account/login", "/account/success"]
const CustomApp = ({ Component, pageProps, ...appProps }: AppProps) => {
	const logIn = useZustandStore((state) => state.logIn)

	useEffect(() => {
		logIn()
	}, [logIn])

	if (noLayout.includes(appProps.router.pathname)) {
		return (
			<div className="relative flex min-h-full w-full flex-col">
				<Component {...pageProps} {...appProps} />
			</div>
		)
	}

	return (
		<div className="relative flex min-h-full w-full flex-col">
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>Reddit</title>
				</Head>
				<Header />
				<main className="flex-auto bg-[#dbe0e6]">
					<Component {...pageProps} {...appProps} />
				</main>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</div>
	)
}

export default CustomApp
