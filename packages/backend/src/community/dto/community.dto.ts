import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class CommunityDto {
	@IsNotEmpty()
	@IsString()
	@Length(1, 21)
	title: string
}

export class CommunityServiceDto extends CommunityDto {
	@IsNotEmpty()
	@IsNumber()
	id: number
}

export class CommunityImageDto {
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	subRedditId: number
}

export class CommunitySubscriptionDto {
	@IsNotEmpty()
	@IsNumber()
	subRedditId: number
}
