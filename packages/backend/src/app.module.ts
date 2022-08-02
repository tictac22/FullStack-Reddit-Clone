import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CommunityModule } from "./community/community.module";
import { PostModule } from "./post/post.module";

import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
	  imports: [AuthModule,PostModule,CommunityModule,
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, "uploads"),
	  	}),
	],

})
export class AppModule { }