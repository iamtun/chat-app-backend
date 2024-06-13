export interface IUserCreated {
	firebase_id: string;
	full_name: string;
	avatar: string;
	login_provider: string;
}

export interface IUserSaveInCache extends IUserCreated {
	_id: string;
	dob: string;
	friend_ids: Array<string>;
	locked_at: string | null;
	role: string;
}
