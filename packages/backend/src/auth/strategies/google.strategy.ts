import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, VerifyCallback } from "passport-google-oauth20"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
	constructor() {
		super({
			clientID: process.env.GOOGLE_AUTH_ID,
			clientSecret: process.env.GOOGLE_AUTH_SECRET,
			callbackURL: "http://localhost:5000/auth/google/callback",
			scope: ["profile", "email"]
		})
	}

	async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
		const { name, emails } = profile
		const user = {
			email: emails[0].value,
			name: name.givenName
		}
		done(null, user)
	}
}
