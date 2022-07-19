import { Logger, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module"

const port = process.env.PORT || 3333

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true
		})
	)
	await app.listen(port)
	Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
