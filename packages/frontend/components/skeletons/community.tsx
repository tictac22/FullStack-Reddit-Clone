import ContentLoader from "react-content-loader"

export const CommunityLoader = (props) => {
	return (
		<div className="">
			{["1", "2", "3", "4"].map((item) => (
				<div
					key={item}
					className="flex h-[53px]  w-[337px] items-center justify-center bg-white dark:bg-dark-100"
				>
					<ContentLoader
						speed={2}
						width={320}
						height={53}
						viewBox="0 0 300 40"
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb"
						{...props}
						uniqueKey={item}
					>
						<rect x="2" y="0" rx="14" ry="14" width="300" height="35" />
					</ContentLoader>
				</div>
			))}
		</div>
	)
}
