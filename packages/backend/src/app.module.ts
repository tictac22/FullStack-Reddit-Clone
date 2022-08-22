import { Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"
import * as path from "path"

import { AuthModule } from "./auth/auth.module"
import { CommunityModule } from "./community/community.module"
import { PostModule } from "./post/post.module"

@Module({
	imports: [
		AuthModule,
		PostModule,
		CommunityModule,
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, "uploads")
		})
	]
})
export class AppModule {}
