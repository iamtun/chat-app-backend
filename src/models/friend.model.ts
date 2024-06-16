import mongoose from 'mongoose';
import { createModel, createSchema } from '.';

const schemaProps = {
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	receiver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	content: {
		type: String,
		default: 'Tôi muốn kết bạn với bạn',
	},
};

const friendModel = createModel('friends', createSchema(schemaProps));
export default friendModel;
