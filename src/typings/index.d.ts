import { Snowflake } from 'discord.js';

type NodeEnv = 'development' | 'production';

declare global {
	declare namespace NodeJS {
		export interface ProcessEnv {
			DISCORD_TOKEN: string;
			MONGODB_URL: string;
			CLIENT_ID: Snowflake;
			NODE_ENV: NodeEnv;
		}
	}

	export interface String {
		public readonly title(): string;
	}
}
