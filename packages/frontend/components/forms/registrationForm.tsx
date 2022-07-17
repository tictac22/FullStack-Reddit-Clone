import React, { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { FormProvider, useForm } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"

import { FormInput } from "./formInput"
import { PasswordErrorHelper } from "./passwordErrorHelper"
import { schemaRegistration } from "./schema"
import { EPasswordErrorTexts, HookRegistrationFormValues } from "./types"

const passwordErrorsText = [
	EPasswordErrorTexts.Low,
	EPasswordErrorTexts.Up,
	EPasswordErrorTexts.Number,
	EPasswordErrorTexts.Min
]
export const RegistrationForm: React.FC = () => {
	const methods = useForm<HookRegistrationFormValues>({
		resolver: yupResolver(schemaRegistration),
		criteriaMode: "all",
		mode: "all"
	})
	const { handleSubmit, setValue } = methods

	const [isPasswordTyped, setIsPasswordTyped] = useState(false)
	//eslint-disable-next-line
	const onSubmit = (data) => console.log(data)

	const handleCaptcha = (value) => {
		setValue("token", value)
	}

	return (
		<FormProvider {...methods}>
			<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
				<FormInput name="email" type="text" />
				<FormInput name="name" type="text" />
				<FormInput setIsPasswordTyped={setIsPasswordTyped} name="password" type="password" />

				<div className="mt-2">
					{passwordErrorsText.map((item) => (
						<PasswordErrorHelper key={item} isPasswordTyped={isPasswordTyped} text={item} />
					))}
				</div>
				<FormInput name="passwordConfirm" type="password" />
				<div className="mt-3">
					<ReCAPTCHA
						sitekey={process.env.NX_CAPTCHA_SITE}
						onChange={handleCaptcha}
						className="scale-75 sm:scale-100"
					/>
				</div>

				<button
					type="submit"
					className="px-[10px] py-[5px] bg-[#0079d3] text-white rounded mt-3 hover:bg-[#2279bc] transition-colors"
				>
					SIGN UP
				</button>
			</form>
		</FormProvider>
	)
}
