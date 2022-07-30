import { BadRequestException, Logger, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import * as cookieParser from "cookie-parser"
import * as session from "express-session"

import { AppModule } from "./app.module"

const port = process.env.BACKEND_PORT || 3333

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
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
	await app.listen(port)
	Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
// -D @types/express-session
