import chalk from 'chalk';
import { ShardingManager } from 'discord.js';
import './setup';

import Logger from './structures/logger';

process.on('unhandledRejection', (reason: Error, promise) =>
	Logger.error(
		chalk.red(reason.stack || reason.message),
		chalk.magenta(JSON.stringify(promise)),
	),
);

process.on('uncaughtExceptionMonitor', (error, origin) =>
	Logger.error(chalk.red(error.stack || error.message, chalk.bgRed(origin))),
);

process.on('uncaughtException', (error, origin) =>
	Logger.error(chalk.red(error.stack || error.message, chalk.bgRed(origin))),
);

(async () => {
	try {
		const manager = new ShardingManager('./dist/src/main.js');

		manager.on('shardCreate', (shard) => {
			shard
				.on('disconnect', () =>
					Logger.info(
						chalk.grey('The <Client>#shardDisconnect event has emitted.'),
					),
				)
				.on('message', async (message) => {
					Logger.info(chalk.grey(JSON.stringify(message)));
				})
				.on('ready', () =>
					Logger.info(chalk.grey('The <Client>#shardReady event has emitted.')),
				)
				.on('reconnecting', () =>
					Logger.info(
						chalk.grey('The <Client>#shardReconnecting event has emitted.'),
					),
				)
				.on('spawn', (process) =>
					Logger.info(
						chalk.greenBright(
							"A Shard's child process/worker has been created.",
						),
						chalk.green(JSON.stringify(process)),
					),
				)
				.on('error', (error) =>
					Logger.error(chalk.red(error.stack || error.message)),
				);

			Logger.info(chalk.blue(`Launched shard ${chalk.blue(shard.id)}!`));
		});

		Logger.info(chalk.yellow('Preparing to spawn the shards...'));

		await manager.spawn({ timeout: 120000, delay: 2000 });
	} catch (error) {
		Logger.error(chalk.red((error as Error).stack || (error as Error).message));
	}
})();
