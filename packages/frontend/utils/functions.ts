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

export const timeAgo = (input) => {
	const date = input instanceof Date ? input : new Date(input)
	const formatter = new Intl.RelativeTimeFormat("en")
	const ranges = {
		years: 3600 * 24 * 365,
		months: 3600 * 24 * 30,
		weeks: 3600 * 24 * 7,
		days: 3600 * 24,
		hours: 3600,
		minutes: 60,
		seconds: 1
	}
	const secondsElapsed = (date.getTime() - Date.now()) / 1000
	for (const key in ranges) {
		if (ranges[key] < Math.abs(secondsElapsed)) {
			const delta = secondsElapsed / ranges[key]
			return formatter.format(Math.round(delta), key)
		}
	}
}

//eslint-disable-next-line
export const objectsEqual = (o1: Object, o2: Object): boolean => {
	if (o1 == null || o2 == null) return false
	return typeof o1 === "object" && Object.keys(o1).length > 0
		? Object.keys(o1).length === Object.keys(o2).length &&
				Object.keys(o1).every((p) => objectsEqual(o1[p as keyof typeof o1], o2[p as keyof typeof o2]))
		: o1 === o2
}
