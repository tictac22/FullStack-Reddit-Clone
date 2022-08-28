import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.query.secret !== process.env.REVALIDATE_PAGE) {
		return res.status(401).json({ message: "Invalid token" })
	}
	try {
		await res.unstable_revalidate("/leaderboard")
		return res.json({ revalidated: true })
	} catch (err) {
		return res.status(500).send({ error: "Error revalidating" })
	}
}
