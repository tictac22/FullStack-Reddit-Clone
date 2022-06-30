// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")
/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	nx: {
		svgr: false
	},
	experimental: {
		outputFileTracingRoot: path.join(__dirname, "../../")
	}
}

module.exports = withNx(nextConfig)
