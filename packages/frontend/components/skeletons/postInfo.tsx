import ContentLoader from "react-content-loader"

export const PostInfoLoader = (props) => {
	return (
		<div className="h-[241px] w-[320px] bg-white">
			<ContentLoader
				speed={2}
				width={312}
				height={241}
				viewBox="0 0 312 241"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
				{...props}
			>
				<rect x="12" y="60" rx="0" ry="0" width="284" height="160" />
			</ContentLoader>
		</div>
	)
}
