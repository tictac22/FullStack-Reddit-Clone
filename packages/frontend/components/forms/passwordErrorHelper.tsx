import { useFormContext } from "react-hook-form"
import { AiOutlineCheck } from "react-icons/ai"
import { GoStop } from "react-icons/go"

import { EPasswordErrorTexts, IPasswordErrorHelper } from "./types"

export const PasswordErrorHelper: React.FC<IPasswordErrorHelper> = ({ isPasswordTyped, text }) => {
	const {
		formState: { errors }
	} = useFormContext()
	return (
		<div className="flex items-center">
			{isPasswordTyped &&
			!(text === EPasswordErrorTexts.Min
				? errors.password?.types.min === text
				: errors.password?.types?.matches?.includes(text) || errors.password?.types.matches === text) ? (
				<AiOutlineCheck className=" fill-lime-400 mr-2" />
			) : (
				<GoStop className=" fill-red-400 mr-2" />
			)}
			<p>{text}</p>
		</div>
	)
}
