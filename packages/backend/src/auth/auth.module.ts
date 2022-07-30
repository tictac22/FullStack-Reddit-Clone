import { Module } from "@nestjs/common";
import { TokenModule } from './../token/token.module';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategy, JwtStrategy, TwitterStrategy } from "./strategies";


@Module({
	imports:[TokenModule],
	controllers: [AuthController],
	providers:[AuthService,JwtStrategy,GoogleStrategy,TwitterStrategy]
})
export class AuthModule {}