import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-jwt"

@Injectable()
export class JwtRtStrategy extends PassportStrategy(Strategy, "jwtRt") {
	constructor() {
		super({
			jwtFromRequest: cookieExtractor,
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_REFRESH
		})
	}

	async validate(payload: any) {
		return { ...payload }
	}
}

const cookieExtractor = function (req) {
	let token = null
	if (req && req.cookies) {
		token = req.cookies["refreshToken"]
	}
	return token
}
