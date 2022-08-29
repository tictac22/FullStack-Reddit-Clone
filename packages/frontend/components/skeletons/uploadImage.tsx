import ContentLoader from "react-content-loader"

export const UploadImageLoader = (props) => (
	<div className="h-[108px] w-[320px] bg-white dark:bg-dark-100">
		<ContentLoader
			speed={2}
			width={320}
			height={108}
			viewBox="0 0 320 108"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
			{...props}
		>
			<rect x="12" y="12" rx="0" ry="0" width="296" height="24" />
			<rect x="12" y="48" rx="0" ry="0" width="296" height="36" />
		</ContentLoader>
	</div>
)
