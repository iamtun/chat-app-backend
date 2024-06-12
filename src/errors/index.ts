class UserNotFoundError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'user_not_found';
	}
}

class NoTokenProvidedError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'no_token_provided';
	}
}

class TokenExpiredError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'token_expired';
	}
}

class TokenInvalidError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'token_invalid';
	}
}

class NoFileUploadedError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'no_file_uploaded';
	}
}

export {
	UserNotFoundError,
	NoTokenProvidedError,
	TokenExpiredError,
	TokenInvalidError,
	NoFileUploadedError,
};
