import { Module } from "@nestjs/common"

import { AuthModule } from "./auth/auth.module"
import { CommunityModule } from "./community/community.module"
import { PostModule } from "./post/post.module"
import { UserModule } from "./user/user.module"

@Module({
	imports: [AuthModule, PostModule, CommunityModule, UserModule]
})
export class AppModule {}
