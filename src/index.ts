import chalk from 'chalk';
import { ShardingManager } from 'discord.js';
import './setup';

import Logger from './structures/logger';

(async () => {
	try {
		const manager = new ShardingManager('./dist/src/main.js');

		manager.on('shardCreate', (shard) => {
			shard
				.on('death', (process) =>
					Logger.fatal(
						chalk.redBright('The following process has exited:'),
						chalk.red(JSON.stringify(process)),
					),
				)
				.on('disconnect', () =>
					Logger.info('The <Client>#shardDisconnect event has emitted.'),
				)
				.on('message', async (message) => {
					Logger.info(message);
				})
				.on('ready', () =>
					Logger.info('The <Client>#shardReady event has emitted.'),
				)
				.on('reconnecting', () =>
					Logger.info('The <Client>#shardReconnecting event has emitted.'),
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
