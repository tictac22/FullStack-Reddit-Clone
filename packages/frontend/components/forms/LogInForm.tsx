import router from "next/router"

import { FormProvider, useForm } from "react-hook-form"
import { AiOutlineLoading } from "react-icons/ai"

import { $api } from "@/utils/axios"
import { useZustandStore } from "@/utils/zustand"
import { yupResolver } from "@hookform/resolvers/yup"

import { FormInput } from "./formInput"
import { schemaLogin } from "./schema"
import { HookLoginFormValues } from "./types"

export const LogInForm = () => {
	const { setUser, isLogin } = useZustandStore((state) => ({ setUser: state.setUser, isLogin: state.isLogin }))
	const methods = useForm<HookLoginFormValues>({
		resolver: yupResolver(schemaLogin),
		criteriaMode: "all",
		mode: "all"
	})
	const {
		formState: { isSubmitting },
		handleSubmit,
		setError
	} = methods

	const onSubmit = async (data) => {
		try {
			const response = await $api("auth/signin", {
				method: "POST",
				data: {
					...data
				}
			})
			setUser(response.data.user)
			isLogin(true)

			router.push("/")
		} catch (error) {
			const errors = error.response.data.message
			setError("email", { message: errors })
			setError("password", { message: errors })
		}
	}

	return (
		<FormProvider {...methods}>
			<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
				<FormInput name="email" type="text" />
				<FormInput name="password" type="password" />
				<button
					type="submit"
					className="px-[10px] py-[5px] bg-[#0079d3] text-white rounded mt-3 hover:bg-[#2279bc] transition-colors"
				>
					<p className="flex justify-center">
						{isSubmitting ? <AiOutlineLoading className="animate-spin" /> : "SIGN UP"}
					</p>
				</button>
			</form>
		</FormProvider>
	)
}
