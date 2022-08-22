import chalk from 'chalk';
import { GatewayIntentBits } from 'discord.js';

import Client from './structures/client';
import Logger from './structures/logger';

export const client = new Client<boolean>({
	intents: [GatewayIntentBits.Guilds],
	ws: { properties: { browser: 'Discord iOS' } },
});

process.on('unhandledRejection', (reason, promise) =>
	Logger.error(
		chalk.red(
			(reason as Error).stack || (reason as Error).message,
			JSON.stringify(promise),
		),
	),
);

process.on('uncaughtExceptionMonitor', (error, origin) =>
	Logger.error(chalk.red(error.stack || error.message, origin)),
);

process.on('uncaughtException', (error, origin) =>
	Logger.error(chalk.red(error.stack || error.message, origin)),
);

(async () => {
	try {
		Logger.info(chalk.yellow('Preparing to connect to the gateway...'));
		await client.connect();
	} catch (error) {
		Logger.fatal(chalk.red((error as Error).stack || (error as Error).message));
		client.destroy();
		process.exit(1);
	}
})();
