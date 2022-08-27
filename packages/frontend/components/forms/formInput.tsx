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
	}, [])
	return (
		<Controller
			name={name}
			control={control}
			defaultValue=""
			render={({ field }) => (
				<>
					<div className="group relative my-3 transition-all" ref={ref}>
						<input
							{...field}
							{...register(name)}
							id={name}
							type={type}
							className={`input peer w-full border border-solid bg-[#fcfcfb] transition-all ${
								errors[name] ? "border-red-500" : "border-[#000000]/5"
							} rounded px-[12px] pt-[22px] pb-[10px] focus:border-cyan-400  focus:outline-none`}
							onChange={(e) => {
								field.onChange(e)
								setIsPasswordTyped && setIsPasswordTyped(true)
							}}
						/>
						<label
							htmlFor={name}
							className={`label absolute left-3 bottom-[16px] text-[10px] transition-all ${
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
