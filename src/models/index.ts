import mongoose, { Schema } from 'mongoose';

export const createSchema = (props: any) => {
	return new Schema(
		{ ...props },
		{
			timestamps: {
				createdAt: 'created_at',
				updatedAt: 'updated_at',
			},
			versionKey: false,
		},
	);
};

export const createModel = (collectionName: string, schema: Schema) => {
	return mongoose.model(collectionName, schema);
};
