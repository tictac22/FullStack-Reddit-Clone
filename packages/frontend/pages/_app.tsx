import { AppProps } from "next/app"
import Head from "next/head"

import { Header } from "@/components/header"

import "./styles.css"

const noLayout = ["/account/register", "/account/login"]
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
			<Head>
				<title>Welcome to frontend!</title>
			</Head>
			<Header />
			<main className="bg-[#dbe0e6] py-4 flex-auto">
				<div className="max-w-screen-lg m-auto px-3">
					<Component {...pageProps} {...appProps} />
				</div>
			</main>
		</div>
	)
}

export default CustomApp
