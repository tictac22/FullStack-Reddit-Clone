import Image from "next/image"
import { useRouter } from "next/router"

import { AiOutlineTwitter } from "react-icons/ai"

import { $api, API_URL } from "@/utils/axios"

import authSrc from "@/public/auth.png"
import google from "@/public/brands/google.svg"

import { LoginDescription, RegisterDescription } from "./descriptions"

export const FormLayout = ({ children }) => {
	const router = useRouter()

	const authModal = (social: string) => {
		return () => {
			let timer = null
			const popup = window.open(`${API_URL}/auth/${social}`, "_blank", "width=500,height=500")
			timer = setInterval(async () => {
				if (popup.closed) {
					const response = await $api("auth/refresh")
					if (response.data) {
						clearInterval(timer)
						router.push("/")
					}
				}
			}, 500)
		}
	}
	return (
		<main className="flex  flex-auto justify-center sm:justify-start">
			<div className="relative hidden min-h-[430px] w-[154px] sm:block">
				<Image src={authSrc} layout="fill" priority alt="register" />
			</div>
			<div className="flex flex-col justify-center p-2 sm:p-6">
				{router.pathname === "/account/register" ? <RegisterDescription /> : <LoginDescription />}
				<div
					onClick={authModal("google")}
					className=" group my-3 flex cursor-pointer items-center justify-center rounded border border-solid border-[#0079d3] py-2 pl-1 uppercase text-[#0079d3] transition-all hover:bg-[#3394dc] hover:text-white sm:justify-start"
				>
					<div className="flex h-[24px] w-[24px] justify-center  rounded-md group-hover:bg-white sm:h-[46px]  sm:w-[46px]">
						<Image src={google.src} alt="google" width={20} height={20} />
					</div>
					<p className="ml-2">Continue with google</p>
				</div>
				<div
					onClick={authModal("twitter")}
					className="group my-3 flex cursor-pointer items-center  justify-center rounded border border-solid border-[#0079d3] py-2 pl-1 uppercase text-[#0079d3] transition-all hover:bg-[#3394dc] hover:text-white sm:justify-start"
				>
					<div className="flex h-[24px] w-[24px] items-center  justify-center rounded-md group-hover:bg-white sm:h-[46px]  sm:w-[46px]">
						<AiOutlineTwitter className="h-6 w-6 fill-[#50abf1]" />
					</div>
					<p className="ml-2">Continue with twitter</p>
				</div>
				<div className="my-6 flex items-center justify-between">
					<span className="w-2/5 border-t border-solid border-t-[#edeff1]"></span>
					<span className="uppercase text-[#878a8c]">or</span>
					<span className="w-2/5 border-t border-solid border-t-[#edeff1]"></span>
				</div>
				{children}
			</div>
		</main>
	)
}
