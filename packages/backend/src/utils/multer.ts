import { v4 as uuidv4 } from "uuid"

import multer = require("multer")

export const multerStorage = multer.diskStorage({
	filename: async (req, file, cb) => {
		const name = req.body.subRedditId + "." + uuidv4() + "." + file.mimetype.split("/")[1]

		cb(null, name)
	}
})
