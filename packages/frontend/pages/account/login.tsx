import Link from "next/link"

import { LogInForm } from "@/components/forms/LogInForm"
import { FormLayout } from "@/components/forms/formLayout"

const LogIn = () => {
	return (
		<FormLayout>
			<div className="text-xs flex justify-end">
				New to Reddit?{" "}
				<Link href={"/account/register"}>
					<button className="text-cyan-400 ml-1">SIGN UP</button>
				</Link>
			</div>
			<LogInForm />
		</FormLayout>
	)
}
export default LogIn
