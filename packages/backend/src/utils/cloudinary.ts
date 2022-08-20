import { v2 as cloudinaryy } from "cloudinary"

cloudinaryy.config({
	api_key: process.env.CLOUDINARY_api_key,
	api_secret: process.env.CLOUDINARY_api_secret,
	cloud_name: process.env.CLOUDINARY_cloud_name
})

export const cloudinary = cloudinaryy.uploader
