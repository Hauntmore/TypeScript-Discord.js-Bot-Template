import chalk from 'chalk';
import { Events } from 'discord.js';

import BaseEvent from '../structures/event';
import Logger from '../structures/logger';

const Event = Events.Error;

export default class extends BaseEvent<typeof Event> {
	public constructor() {
		super({
			name: Event,
			description: 'Emitted when the client encounters an error.',
		});
	}

	public run(error: Parameters<BaseEvent<typeof Event>['run']>[0]): void {
		Logger.error(chalk.red(error.stack || error.message));
	}
}
