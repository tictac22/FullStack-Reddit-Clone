import { useEffect } from "react"

import styles from "../../css/spinner.module.css"

const Success = () => {
	useEffect(() => {
		setTimeout(() => {
			window.close()
		}, 1000)
	}, [])
	return (
		<div className="flex flex-auto items-center justify-center dark:bg-black">
			<div className={styles.spinner}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Success
