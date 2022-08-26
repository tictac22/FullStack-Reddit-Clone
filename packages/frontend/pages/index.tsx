import { FormPost } from "@/components/FormPost"
import { Aside } from "@/components/aside"
import { HomeQuery } from "@/components/infiniteQueryWrapper/HomeQuery"

const Home = () => {
	return (
		<div className="container">
			<div className="flex">
				<Aside />
				<div className="order-first flex-grow lg:mr-7 flex-auto lg:flex-initial">
					<div className="lg:max-w-[640px]">
						<FormPost />
						<HomeQuery />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
