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
		<main className="flex-auto  flex justify-center sm:justify-start">
			<div className="min-h-[430px] w-[154px] relative hidden sm:block">
				<Image src={authSrc} layout="fill" priority alt="register" />
			</div>
			<div className="flex flex-col justify-center p-2 sm:p-6">
				{router.pathname === "/account/register" ? <RegisterDescription /> : <LoginDescription />}
				<div
					onClick={authModal("google")}
					className=" justify-center sm:justify-start my-3 flex items-center border border-solid border-[#0079d3] rounded text-[#0079d3] uppercase pl-1 py-2 cursor-pointer group hover:bg-[#3394dc] hover:text-white transition-all"
				>
					<div className="h-[24px] w-[24px] sm:h-[46px] sm:w-[46px]  flex justify-center rounded-md  group-hover:bg-white">
						<Image src={google.src} alt="google" width={20} height={20} />
					</div>
					<p className="ml-2">Continue with google</p>
				</div>
				<div
					onClick={authModal("twitter")}
					className="justify-center sm:justify-start my-3 flex items-center  border border-solid border-[#0079d3] rounded text-[#0079d3] uppercase pl-1 py-2 cursor-pointer group hover:bg-[#3394dc] hover:text-white transition-all"
				>
					<div className="h-[24px] w-[24px] sm:h-[46px] sm:w-[46px]  flex items-center justify-center rounded-md  group-hover:bg-white">
						<AiOutlineTwitter className="w-6 h-6 fill-[#50abf1]" />
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
