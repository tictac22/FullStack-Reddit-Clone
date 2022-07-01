import { AppProps } from "next/app"
import Head from "next/head"

import { Header } from "@/components/header"
import "./styles.css"

const CustomApp = ({ Component, pageProps }: AppProps) => {
	return (
		<div className="flex flex-col w-full min-h-full relative">
			<Head>
				<title>Welcome to frontend!</title>
			</Head>
			<Header />
			<main className="bg-[#dbe0e6] py-4 flex-auto">
				<div className="max-w-screen-lg m-auto px-3">
					<Component {...pageProps} />
				</div>
			</main>
		</div>
	)
}

export default CustomApp
