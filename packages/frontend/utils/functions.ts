import { API_URL } from "./axios"

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

export const getFullImagePath = (image: string, folder: string) => {
	return `${API_URL}/${folder}/${image}`
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
