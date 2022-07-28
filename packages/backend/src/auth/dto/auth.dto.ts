import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthSignUpDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	@IsString()
	@Length(8)
	password: string;

	@IsNotEmpty()
	@IsString()
	username: string;
}

export class AuthSignInDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	@IsString()
	@Length(8)
	password: string;
}