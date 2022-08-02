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
