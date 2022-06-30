import { Aside } from "../components/aside"
import { FormPost } from "../components/postform"

const Home = () => {
	return (
		<div className="flex">
			<Aside />
			<div className="order-first flex-grow mr-7">
				<FormPost />
			</div>
		</div>
	)
}

export default Home
