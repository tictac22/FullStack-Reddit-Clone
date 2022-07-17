export type HookRegistrationFormValues = {
	email: string
	password: string
	passwordConfirm: string
	name: string
	token: string
}
export type HookLoginFormValues = {
	email: string
	password: string
}
export const enum EPasswordErrorTexts {
	Low = "1 lowercase letter",
	Up = "1 uppercase letter",
	Number = "1 number",
	Min = "Minimum of 8 characters"
}

export interface IFormInput {
	name: "email" | "password" | "passwordConfirm" | "name" | "token"
	type: string
	setIsPasswordTyped?: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IPasswordErrorHelper {
	isPasswordTyped: boolean
	text: string
}
