import mongoose from 'mongoose';
import { createModel, createSchema } from '.';

const schemaProps = {
	url: {
		type: String,
	},
	type: {
		type: String,
		enum: ['image', 'video', 'docs', 'unknown'],
	},
	conversation_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'conversations',
	},
};

const fileModel = createModel('files', createSchema(schemaProps));
export default fileModel;
