import { UserInfo } from "@/components/helpersComponents/userInfo"
import { UserQuery } from "@/components/infiniteQueryWrapper/userQuery"
import { PostInfoLoader } from "@/components/skeletons/postInfo"
import { useGetUser } from "@/hooks/react-query/index"
const UserName = () => {
	const { data } = useGetUser()
	return (
		<div className="container">
			<div className="flex">
				<div>
					<UserQuery />
				</div>
				<div className="mt-2">
					{data ? <UserInfo username={data.username} createdAt={data.createdAt} /> : <PostInfoLoader />}
				</div>
			</div>
		</div>
	)
}

export default UserName
