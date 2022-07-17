import { NextPage } from "next"
import Link from "next/link"

import { FormLayout } from "@/components/forms/formLayout"
import { RegistrationForm } from "@/components/forms/registrationForm"

const Register: NextPage = () => {
	return (
		<FormLayout>
			<div className="text-xs flex justify-end">
				Already a redditor?{" "}
				<Link href={"/account/login"}>
					<button className="text-cyan-400 ml-1">LOG IN</button>
				</Link>
			</div>
			<RegistrationForm />
		</FormLayout>
	)
}
export default Register
//.rc-anchor-light.rc-anchor-normal
/*
	<Script
				strategy="afterInteractive"
				id="my-script"
				dangerouslySetInnerHTML={{
					__html: `
					const inputs = document.querySelectorAll("input")
					inputs.forEach((input) => {
						input.addEventListener("input", (event) => {
							if (event.target.value) {
								input.nextElementSibling.classList.add("bottom-9")
							} else {
								input.nextElementSibling.classList.remove("bottom-9")
							}
						})
					})
					`
				}}
			/>

*/
