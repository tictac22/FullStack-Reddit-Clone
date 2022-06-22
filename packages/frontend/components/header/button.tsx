import React from "react"

interface Props {
	text: string
	textColor: string
	bg: string
	hover: string
}
export const Button: React.FC<Props> = ({ text, textColor, bg, hover }) => {
	return (
		<a
			className={`hidden lg:block whitespace-nowrap ml-5 cursor-pointer hover:ease-out duration-200 ${hover} ${bg} px-10 py-1 text-${textColor} border-solid border-2 rounded-xl  border-cyan-500`}
		>
			{text}
		</a>
	)
}
