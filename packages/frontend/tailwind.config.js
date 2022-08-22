/*eslint-disable @typescript-eslint/no-var-requires*/
const { join } = require("path")

module.exports = {
	important: true,
	content: [join(__dirname, "pages/**/*.tsx"), join(__dirname, "components/**/*.tsx")],

	theme: {
		extend: {
			colors: {
				custom: {
					100: "#f6fafd",
					200: "#70819b"
				}
			}
		}
	}
}
