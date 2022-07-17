import { FormPost } from "@/components/FormPost"
import { Aside } from "@/components/aside"

const Home = () => {
	return (
		<div className="container">
			<div className="flex">
				<Aside />
				<div className="order-first flex-grow mr-7">
					<FormPost />
				</div>
			</div>
		</div>
	)
}

export default Home
