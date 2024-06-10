import { configDotenv } from 'dotenv';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

configDotenv();

const s3Client = new S3Client({
	region: process.env.AWS_REGION!,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY!,
		secretAccessKey: process.env.AWS_SECRET_KEY!,
	},
});

const S3Storage = multerS3({
	s3: s3Client,
	bucket: process.env.AWS_S3_BUCKET_NAME!,
	contentType: multerS3.AUTO_CONTENT_TYPE,
	key: function (_: any, file: any, cb: Function) {
		cb(null, 'uploads/' + Date.now().toString() + '-' + file.originalname);
	},
});

export default S3Storage;
