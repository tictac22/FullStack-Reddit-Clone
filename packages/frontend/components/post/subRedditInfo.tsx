import Image from "next/image"
import Link from "next/link"

type Props = {
	image?: string
	title: string
}
export const SubRedditInfo = ({ image, title }: Props) => {
	return (
		<span className="inline-flex items-center mr-2">
			{image ? (
				<Image src={image} alt={title} width={20} height={20} className="rounded-full" />
			) : (
				<div className="w-[20px] h-[20px] bg-cyan-400 rounded-full"></div>
			)}
			<Link href={`/r/${title}`}>
				<span className="text-black font-bold ml-1 hover:underline">r/{title}</span>
			</Link>
		</span>
	)
}
