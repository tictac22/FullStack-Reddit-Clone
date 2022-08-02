import { useEffect, useRef } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { HookRegistrationFormValues, IFormInput } from "./types"

export const FormInput: React.FC<IFormInput> = ({ name, type, setIsPasswordTyped }) => {
	const {
		register,
		control,
		formState: { errors }
	} = useFormContext<HookRegistrationFormValues>()
	const ref = useRef<HTMLInputElement>()

	useEffect(() => {
		const input = ref.current.firstChild as HTMLElement
		input.addEventListener("change", (event: InputEvent) => {
			const target = event.target as HTMLInputElement
			const inputSibling = input.nextElementSibling as HTMLElement
			if (target) {
				inputSibling.style.bottom = "36px"
			} else {
				inputSibling.style.bottom = "16px"
			}
		})
		input.addEventListener("blur", (event: InputEvent) => {
			const target = event.target as HTMLInputElement
			const inputSibling = input.nextElementSibling as HTMLElement
			if (!target) {
				inputSibling.style.bottom = "16px"
			}
		})
		input.addEventListener("focus", (event: InputEvent) => {
			const inputSibling = input.nextElementSibling as HTMLElement
			inputSibling.style.bottom = "36px"
		})
	}, [])
	return (
		<Controller
			name={name}
			control={control}
			defaultValue=""
			render={({ field }) => (
				<>
					<div className="relative group transition-all my-3" ref={ref}>
						<input
							{...field}
							{...register(name)}
							id={name}
							type={type}
							className={`input peer transition-all w-full bg-[#fcfcfb] border border-solid ${
								errors[name] ? "border-red-500" : "border-[#000000]/5"
							} rounded pt-[22px] px-[12px] pb-[10px] focus:outline-none  focus:border-cyan-400`}
							onChange={(e) => {
								field.onChange(e)
								setIsPasswordTyped && setIsPasswordTyped(true)
							}}
						/>
						<label
							htmlFor={name}
							className={`label absolute transition-all left-3 bottom-4 text-[10px] ${
								errors[name] ? "text-red-500" : "text-[#a5a4a4]"
							} uppercase tracking-wider group-hover:bottom-9 peer-focus:bottom-9`}
						>
							{name}
						</label>
					</div>
					{name !== "password" && (
						<p className="-mt-[12px] ml-3 text-xs text-red-500">{errors?.[name]?.message}</p>
					)}
				</>
			)}
		></Controller>
	)
}
/*



*/
