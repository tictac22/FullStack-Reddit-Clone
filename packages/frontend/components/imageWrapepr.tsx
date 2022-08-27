import Image from "next/image"

type Props = {
	width: number
	heigth: number
	image?: string
	title: string
}
export const ImageWrapper = ({ width, heigth, image, title }: Props) => {
	if (!image)
		return (
			<div className={` h-[${heigth}px] w-[${width}px]  rounded-full border border-dashed border-gray-400`}></div>
		)

	return <Image width={width} height={heigth} src={image} alt={title} className="rounded-full " />
}
