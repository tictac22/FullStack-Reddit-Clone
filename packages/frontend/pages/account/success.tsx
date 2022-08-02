import { useEffect } from "react"

import styles from "../../css/spinner.module.css"

const Success = () => {
	useEffect(() => {
		setTimeout(() => {
			window.close()
		}, 1000)
	}, [])
	return (
		<div className="flex-auto flex items-center justify-center">
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
