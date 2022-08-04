import { AppProps } from "next/app"
import Head from "next/head"

import { AuthContext } from "@/components/authProvider"
import { Header } from "@/components/header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "../css/styles.css"

const queryClient = new QueryClient()

const noLayout = ["/account/register", "/account/login", "/account/success"]
const CustomApp = ({ Component, pageProps, ...appProps }: AppProps) => {
	if (noLayout.includes(appProps.router.pathname)) {
		return (
			<div className="flex flex-col w-full min-h-full relative">
				<Component {...pageProps} {...appProps} />
			</div>
		)
	}
	return (
		<div className="flex flex-col w-full min-h-full relative">
			<AuthContext>
				<QueryClientProvider client={queryClient}>
					<Head>
						<title>Welcome to frontend!</title>
					</Head>
					<Header />
					<main className="bg-[#dbe0e6] flex-auto">
						<Component {...pageProps} {...appProps} />
					</main>
				</QueryClientProvider>
			</AuthContext>
		</div>
	)
}

export default CustomApp
