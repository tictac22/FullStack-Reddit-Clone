export const RegisterDescription = () => {
	return (
		<>
			<h1 className="font-bold">Sign up</h1>
			<p className="max-w-[280px] mt-3 text-xs sm:text-base">
				By continuing, you are setting up a Reddit account and agree to our{" "}
				<a
					className="text-cyan-300"
					href="https://www.redditinc.com/policies/user-agreement"
					rel="noreferrer"
					target="_blank"
				>
					{" "}
					User Agreement
				</a>{" "}
				and{" "}
				<a
					className="text-cyan-300"
					href="https://www.reddit.com/policies/privacy-policy"
					target="_blank"
					rel="noreferrer"
				>
					Privacy Policy
				</a>
				.
			</p>
		</>
	)
}

export const LoginDescription = () => {
	return (
		<>
			<h1 className="font-bold">Log in</h1>
			<p className="max-w-[280px] mt-3 text-xs sm:text-base">
				By continuing, you agree to our{" "}
				<a
					className="text-cyan-300"
					href="https://www.redditinc.com/policies/user-agreement"
					rel="noreferrer"
					target="_blank"
				>
					{" "}
					User Agreement
				</a>{" "}
				and{" "}
				<a
					className="text-cyan-300"
					href="https://www.reddit.com/policies/privacy-policy"
					target="_blank"
					rel="noreferrer"
				>
					Privacy Policy
				</a>
				.
			</p>
		</>
	)
}
