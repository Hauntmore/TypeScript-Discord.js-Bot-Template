import chalk from 'chalk';
import { Events } from 'discord.js';

import BaseEvent from '../structures/event';
import Logger from '../structures/logger';

const Event = Events.ClientReady;

export default class extends BaseEvent<typeof Event> {
	public constructor() {
		super({
			name: Event,
			description: 'Emitted when the client becomes ready to start working.',
			once: true,
		});
	}

	public run(client: Parameters<BaseEvent<typeof Event>['run']>[0]): void {
		Logger.info(chalk.green(`Logged in as ${client.user.tag}!`));
	}
}
