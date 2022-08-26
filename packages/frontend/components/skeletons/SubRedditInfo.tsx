import ContentLoader from "react-content-loader"

type Props = {
	height?: number
}
export const SubRedditInfoLoader = ({ height }: Props) => {
	return (
		<div className={`w-[320px] "h-[121px]" bg-white`} style={{ height: `${height ? height + "px" : "inherit"}` }}>
			<ContentLoader
				speed={2}
				width={320}
				height={121}
				viewBox="0 0 320 121"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<rect x="12" y="12" rx="0" ry="0" width="296" height="24" />
				<rect x="12" y="62" rx="0" ry="0" width="296" height="24" />
			</ContentLoader>
		</div>
	)
}
