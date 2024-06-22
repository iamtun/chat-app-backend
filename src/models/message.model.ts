import mongoose from 'mongoose';
import { createModel, createSchema } from '.';

const schemaProps = {
	content: {
		type: String,
		default: null,
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		default: null,
	},
	files: {
		type: Array<mongoose.Schema.Types.ObjectId>,
		ref: 'files',
		default: [],
	},
	conversation_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'conversations',
	},
	deletedAt: {
		type: Date,
		default: null,
	},
};

const messageModel = createModel('messages', createSchema(schemaProps));
export default messageModel;
