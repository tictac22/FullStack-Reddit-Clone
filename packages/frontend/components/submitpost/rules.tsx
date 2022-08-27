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
			<div className=" rounded bg-white p-3">
				<div className="flex items-center border-b border-solid border-[#eeeff1] pb-2 font-medium">
					<Image src={postingImage} alt="posting" height={40} width={40} />
					<p className="ml-2">Posting to Reddit</p>
				</div>
				{rules.map((item, index) => (
					<div key={item} className="border-b border-solid border-[#eeeff1] py-2 px-1 font-medium">
						{index + 1}. {item}
					</div>
				))}
			</div>
			<div className="my-2 max-w-xs text-xs leading-4 text-[#7c7c7c]	">
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
