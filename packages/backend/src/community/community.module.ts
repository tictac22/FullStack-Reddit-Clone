import { Module } from "@nestjs/common";
import { CommunityController } from "./community.controller";
import { CommunityP } from './community.p';
import { CommunityService } from "./community.service";



@Module({
	controllers:[CommunityController,CommunityP],
	providers:[CommunityService]
})
export class CommunityModule {}