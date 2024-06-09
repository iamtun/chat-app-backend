import admin from 'firebase-admin';
import { configDotenv } from 'dotenv';

configDotenv();

const credential = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS!);

admin.initializeApp({
	credential: admin.credential.cert(credential),
});

export default admin;
