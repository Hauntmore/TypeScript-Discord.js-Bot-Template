import chalk from 'chalk';
import { Events } from 'discord.js';

import BaseEvent from '../../structures/event';
import Logger from '../../structures/logger';

const Event = Events.ShardResume;

export default class extends BaseEvent<typeof Event> {
	public constructor() {
		super({
			name: Event,
			description: 'Emitted when a shard resumes successfully.',
		});
	}

	public run(
		id: Parameters<BaseEvent<typeof Event>['run']>[0],
		replayedEvents: Parameters<BaseEvent<typeof Event>['run']>[1],
	): void {
		Logger.info(
			chalk.yellowBright(
				`Shard ${chalk.blue(id)} is attempting to reconnect/re-identify.`,
			),
			'Replayed Events',
			chalk.grey(replayedEvents),
		);
	}
}
