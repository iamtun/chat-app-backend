import mongoose from 'mongoose';
import { createModel, createSchema } from '.';

const schemaProps = {
	name: {
		type: String,
		default: null,
	},
	avatar: {
		type: String,
		default: null,
	},
	members: {
		type: Array<mongoose.Schema.Types.ObjectId>,
		ref: 'users',
		default: [],
	},
	is_group: {
		type: Boolean,
		default: false,
	},
	last_message: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'messages',
		default: null,
	},
};

const conversationModel = createModel(
	'conversations',
	createSchema(schemaProps),
);
export default conversationModel;
