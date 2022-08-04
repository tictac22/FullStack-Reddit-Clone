export const convertDate = (dateString: string) => {
	const date = new Date(dateString)

	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()

	const formatedDate = new Date(Date.UTC(year, month, day))
	return formatedDate.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	})
}

export const capitalizeFirstLetter = (string: string) => {
	if (!string) return ""
	return string.charAt(0).toUpperCase() + string.slice(1)
}
