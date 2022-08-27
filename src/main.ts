import chalk from 'chalk';
import { GatewayIntentBits } from 'discord.js';

import Client from './structures/client';
import Logger from './structures/logger';
import './extensions/extensions';
import './setup';

export const client = new Client<boolean>({
	intents: [GatewayIntentBits.Guilds],
	ws: { properties: { browser: 'Discord iOS' } },
	shards: 'auto',
});

(async () => {
	try {
		Logger.info(
			chalk.bold(`${process.env['NODE_ENV'].title()} Environment.`),
			chalk.yellow('Preparing to connect to the gateway...'),
		);
		await client.connect();
	} catch (error) {
		Logger.fatal(chalk.red((error as Error).stack || (error as Error).message));
		client.destroy();
		process.exit(1);
	}
})();
