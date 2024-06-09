import mongoose from 'mongoose';

import { configDotenv } from 'dotenv';

configDotenv();

class Database {
	private static instance: Database;
	private connection: mongoose.Connection | null = null;

	private constructor() {
		this.connect();
	}

	public static getInstance(): Database {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	private connect() {
		const uri = process.env.MONGO_DB_URL!; // Replace with your actual connection string
		mongoose.connect(uri, {
			user: process.env.MONGO_DB_USER!,
			pass: process.env.MONGO_DB_PASS!,
		});

		this.connection = mongoose.connection;
		this.connection.on('connected', () => {
			console.info('Database connection successful');
		});

		this.connection.on('error', (err) => {
			console.error('Database connection error:', err);
		});
	}

	public getConnection(): mongoose.Connection | null {
		return this.connection;
	}
}

export default Database;
