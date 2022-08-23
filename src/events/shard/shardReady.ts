import chalk from 'chalk';
import { Events } from 'discord.js';

import BaseEvent from '../../structures/event';
import Logger from '../../structures/logger';

const Event = Events.ShardReady;

export default class extends BaseEvent<typeof Event> {
	public constructor() {
		super({
			name: Event,
			description: 'Emitted when a shard turns ready.',
		});
	}

	public run(
		id: Parameters<BaseEvent<typeof Event>['run']>[0],
		unavailableGuilds: Parameters<BaseEvent<typeof Event>['run']>[1],
	): void {
		Logger.info(
			chalk.green(`Shard ${chalk.blue(id)} is ready!`),
			chalk.yellow(
				'Unavailable Guilds:',
				unavailableGuilds
					? chalk.bgRed([...unavailableGuilds].join(', '))
					: chalk.bgGreen('None'),
			),
		);
	}
}
