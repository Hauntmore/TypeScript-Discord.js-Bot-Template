import chalk from 'chalk';
import { Events } from 'discord.js';

import BaseEvent from '../structures/event';
import Logger from '../structures/logger';

const Event = Events.Invalidated;

export default class extends BaseEvent<typeof Event> {
	public constructor() {
		super({
			name: Event,
			description:
				"Emitted when the client's session becomes invalidated. You are expected to handle closing the process gracefully and preventing a boot loop if you are listening to this event.",
		});
	}

	public run(): void {
		Logger.fatal(chalk.red('Gracefully closing this Node.js session.'));
		process.exit(1);
	}
}
