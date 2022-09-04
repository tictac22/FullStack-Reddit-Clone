import { BadRequestException, Logger, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import * as cookieParser from "cookie-parser"
import * as session from "express-session"

import { AppModule } from "./app.module"

const port = process.env.PORT || 3333

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors({
		credentials: true,
		origin: [
			"http://localhost:3000",
			"https://full-stack-reddit-clone-omcbkm24i-tictac22.vercel.app",
			"https://full-stack-reddit-clone-k6vu7w8j4-tictac22.vercel.app"
		]
	})
	app.use(
		session({
			secret: "my-secret",
			resave: false,
			saveUninitialized: false
		})
	)
	app.use(cookieParser())
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			exceptionFactory: (errors) => {
				const errorsMessages = {}
				errors.forEach((error) => {
					errorsMessages[error.property] = error.constraints[Object.keys(error.constraints)[0]]
				})
				return new BadRequestException(errorsMessages)
			}
		})
	)
	await app.listen(port, "0.0.0.0")
	Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
