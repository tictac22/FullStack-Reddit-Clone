import { FormProvider, useForm } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"

import { FormInput } from "./formInput"
import { schemaLogin } from "./schema"
import { HookLoginFormValues } from "./types"

export const LogInForm = () => {
	const methods = useForm<HookLoginFormValues>({
		resolver: yupResolver(schemaLogin),
		criteriaMode: "all",
		mode: "all"
	})
	//eslint-disable-next-line
	const onSubmit = (data) => console.log(data)

	return (
		<FormProvider {...methods}>
			<form className="flex flex-col" onSubmit={methods.handleSubmit(onSubmit)}>
				<FormInput name="email" type="text" />
				<FormInput name="password" type="password" />
				<button
					type="submit"
					className="px-[10px] py-[5px] bg-[#0079d3] text-white rounded mt-3 hover:bg-[#2279bc] transition-colors"
				>
					LOG IN
				</button>
			</form>
		</FormProvider>
	)
}
