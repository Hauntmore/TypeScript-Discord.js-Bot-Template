import chalk from 'chalk';
import { Events } from 'discord.js';

import BaseEvent from '../structures/event';

const Event = Events.ClientReady;

export default class extends BaseEvent<typeof Event> {
	public constructor() {
		super({
			name: Events.ClientReady,
			description: 'Emitted when the client becomes ready to start working.',
			once: true,
		});
	}

	public run(client: Parameters<BaseEvent<typeof Event>['run']>[0]): void {
		console.log(chalk.green(`Logged in as ${client.user.tag}!`));
	}
}
