import { AppProps } from "next/app"
import Head from "next/head"
import { Header } from "../components/header"
import "./styles.css"

const CustomApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>Welcome to frontend!</title>
			</Head>
			<Header />
			<main className="bg-slate-400 py-4">
				<div className="max-w-screen-lg m-auto px-3">
					<Component {...pageProps} />
				</div>
			</main>
		</>
	)
}

export default CustomApp
