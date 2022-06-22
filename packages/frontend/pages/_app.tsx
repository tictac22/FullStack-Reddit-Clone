import { AppProps } from "next/app"
import Head from "next/head"
import "./styles.css"

const CustomApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>Welcome to frontend!</title>
			</Head>
			<main className="bg-slate-400">
				<Component {...pageProps} />
			</main>
		</>
	)
}

export default CustomApp
