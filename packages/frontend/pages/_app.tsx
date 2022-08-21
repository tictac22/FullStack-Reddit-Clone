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
			<div className="flex flex-col w-full min-h-full relative">
				<Component {...pageProps} {...appProps} />
			</div>
		)
	}

	return (
		<div className="flex flex-col w-full min-h-full relative">
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>Reddit</title>
				</Head>
				<Header />
				<main className="bg-[#dbe0e6] flex-auto">
					<Component {...pageProps} {...appProps} />
				</main>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</div>
	)
}

export default CustomApp
