import chalk from 'chalk';
import { Events } from 'discord.js';

import BaseEvent from '../../structures/event';
import Logger from '../../structures/logger';

const Event = Events.ShardDisconnect;

export default class extends BaseEvent<typeof Event> {
	public constructor() {
		super({
			name: Event,
			description:
				"Emitted when a shard's WebSocket disconnects and will no longer reconnect.",
		});
	}

	public run(
		event: Parameters<BaseEvent<typeof Event>['run']>[0],
		id: Parameters<BaseEvent<typeof Event>['run']>[1],
	): void {
		Logger.info(
			chalk.red(`Shard ${chalk.blue(id)} has disconnected.`),
			chalk.cyan('Close Event', JSON.stringify(event)),
		);
	}
}
