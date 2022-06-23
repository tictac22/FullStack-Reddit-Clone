import { Communities } from "../components/communities"
import { FormPost } from "../components/postform"

const Home = () => {
	return (
		<div className="flex">
			<Communities />
			<div className="order-first flex-grow mr-7">
				<FormPost />
			</div>
		</div>
	)
}

export default Home
