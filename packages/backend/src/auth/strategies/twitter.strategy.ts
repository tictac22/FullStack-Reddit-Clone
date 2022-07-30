
import { PassportStrategy } from '@nestjs/passport';

import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-twitter';


// process.env.TWITTER_AUTH_ID,
//:process.env.TWITTER_AUTH_SECRET

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {

  constructor() {
    super({
		consumerKey:process.env.TWITTER_AUTH_ID,
		consumerSecret:process.env.TWITTER_AUTH_SECRET,
		callbackURL: 'http://localhost:5000/auth/twitter/callback',
		passReqToCallback: true,
  		includeEmail: true,
  		skipExtendedUserProfile: false,
    });
  }

  async validate (req,accessToken: string, refreshToken: string, profile: any, cb): Promise<any> {
    const { displayName, emails } = profile
	const user = {
		email: emails[0].value,
		name: displayName,
	}
    return cb(null, user);
  }
}