import chalk from 'chalk';
import { Events } from 'discord.js';

import BaseEvent from '../../structures/event';
import Logger from '../../structures/logger';

const Event = Events.ShardReconnecting;

export default class extends BaseEvent<typeof Event> {
	public constructor() {
		super({
			name: Event,
			description:
				'Emitted when a shard is attempting to reconnect or re-identify.',
		});
	}

	public run(...id: Parameters<BaseEvent<typeof Event>['run']>): void {
		Logger.info(
			chalk.yellow(
				`Shard ${chalk.blue(id)} is attempting to reconnect/re-identify.`,
			),
		);
	}
}
