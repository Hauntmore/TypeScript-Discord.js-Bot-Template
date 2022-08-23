import { Snowflake } from 'discord.js';

declare global {
	declare namespace NodeJS {
		export interface ProcessEnv {
			DISCORD_TOKEN: string;
			MONGODB_URL: string;
			CLIENT_ID: Snowflake;
		}
	}

	export interface String {
		public readonly title(): string;
	}
}
