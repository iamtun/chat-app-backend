﻿import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		full_name: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		dob: {
			type: Date,
			default: null,
		},
		firebase_id: {
			type: String,
			required: true,
			index: {
				unique: true,
			},
		},
		friend_ids: {
			type: Array<mongoose.Schema.Types.ObjectId>,
			ref: 'users',
			default: [],
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
		versionKey: false,
	},
);

const userModel = mongoose.model('users', userSchema);
export default userModel;
