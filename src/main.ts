import chalk from 'chalk';
import { GatewayIntentBits } from 'discord.js';
import './setup';

import Client from './structures/client';

export const client = new Client<boolean>({
	intents: [GatewayIntentBits.Guilds],
});

(async () => {
	try {
		console.log(chalk.yellow('Preparing to connect to the gateway...'));
		await client.connect();
	} catch (error) {
		console.error(
			chalk.red((error as Error).stack || (error as Error).message),
		);
		client.destroy();
		process.exit(1);
	}
})();
