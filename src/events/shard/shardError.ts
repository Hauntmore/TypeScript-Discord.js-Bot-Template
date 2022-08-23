import chalk from 'chalk';
import { Events } from 'discord.js';

import BaseEvent from '../../structures/event';
import Logger from '../../structures/logger';

const Event = Events.ShardError;

export default class extends BaseEvent<typeof Event> {
	public constructor() {
		super({
			name: Event,
			description:
				"Emitted whenever a shard's WebSocket encounters a connection error.",
		});
	}

	public run(
		error: Parameters<BaseEvent<typeof Event>['run']>[0],
		shardId: Parameters<BaseEvent<typeof Event>['run']>[1],
	): void {
		Logger.error(
			chalk.red(`Shard ${chalk.blue(shardId)} has encountered an error.`),
			chalk.bgRed(error.stack || error.message),
		);
	}
}
