import { AppProps } from "next/app"
import Head from "next/head"

import { Header } from "@/components/header"
import { AuthContext } from "context/AuthContext"

import "../css/styles.css"

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
				<Head>
					<title>Welcome to frontend!</title>
				</Head>
				<Header />
				<main className="bg-[#dbe0e6] flex-auto">
					<Component {...pageProps} {...appProps} />
				</main>
			</AuthContext>
		</div>
	)
}

export default CustomApp
