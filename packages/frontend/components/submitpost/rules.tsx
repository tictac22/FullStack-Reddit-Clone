import Image from "next/image"

import postingImage from "@/public/posting.svg"

const rules = [
	"Remember the human",
	"Behave like you would in real life",
	"Look for the original source of content",
	"Search for duplicates before posting",
	"Read the community’s rules"
]

export const Rules = () => {
	return (
		<>
			<div className=" p-3 bg-white rounded">
				<div className="flex items-center font-medium border-b border-solid border-[#eeeff1] pb-2">
					<Image src={postingImage} alt="posting" height={40} width={40} />
					<p className="ml-2">Posting to Reddit</p>
				</div>
				{rules.map((item, index) => (
					<div key={item} className="font-medium border-b border-solid border-[#eeeff1] py-2 px-1">
						{index + 1}. {item}
					</div>
				))}
			</div>
			<div className="my-2 max-w-xs text-xs text-[#7c7c7c] leading-4	">
				Please be mindful of reddit&apos;s&ensp;
				<a
					target={"_blank"}
					rel="noreferrer"
					className="text-[#0079D3]"
					href="https://www.reddit.com/help/contentpolicy"
				>
					content policy&ensp;
				</a>
				and practice good&ensp;
				<a
					target={"_blank"}
					rel="noreferrer"
					className="text-[#0079D3]"
					href="https://www.reddit.com/wiki/reddiquette"
				>
					reddiquette
				</a>
				.
			</div>
		</>
	)
}
