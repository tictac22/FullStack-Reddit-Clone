import { useFormContext } from "react-hook-form"
import { AiOutlineCheck } from "react-icons/ai"
import { GoStop } from "react-icons/go"

import { EPasswordErrorTexts, IPasswordErrorHelper } from "./types"

export const PasswordErrorHelper: React.FC<IPasswordErrorHelper> = ({ isPasswordTyped, text }) => {
	const {
		formState: { errors }
	} = useFormContext()
	return (
		<div className="flex items-center dark:text-white">
			{isPasswordTyped &&
			!(text === EPasswordErrorTexts.Min
				? errors.password?.types.min === text
				: errors.password?.types?.matches?.includes(text) || errors.password?.types.matches === text) ? (
				<AiOutlineCheck className=" mr-2 fill-lime-400" />
			) : (
				<GoStop className=" mr-2 fill-red-400" />
			)}
			<p>{text}</p>
		</div>
	)
}
