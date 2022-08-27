import Link from "next/link"

export const SubRedditError = () => {
	return (
		<div className="container h-[calc(100vh_-_80px)] flex items-center justify-center flex-col">
			<div className="w-[100px] h-[100px] bg-[#a8a8a8] rounded-full"></div>
			<p className="my-4 font-bold">Sorry, there aren’t any communities on Reddit with that name.</p>
			<p className="my-4 font-bold">This community may have been banned or the community name is incorrect.</p>
			<Link href={"/"}>
				<button className="btn-secondary">GO HOME</button>
			</Link>
		</div>
	)
}
