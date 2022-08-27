import { NextPage } from "next"
import dynamic from "next/dynamic"

import { WithAuth } from "@/components/authentication/withAuth"
import { Rules } from "@/components/submitpost/rules"

const DynamicPostForm = dynamic(() => import("@/components/submitpost").then((mod) => mod.PostForm), {
	ssr: false
})

const Sumbit: NextPage = () => {
	return (
		<div className="container">
			<div className="flex justify-end">
				<DynamicPostForm />
				<div className="mt-3 ml-3 hidden w-[320px] lg:block">
					<Rules />
				</div>
			</div>
		</div>
	)
}

export default WithAuth(Sumbit)
